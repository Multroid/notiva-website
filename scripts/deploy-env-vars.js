#!/usr/bin/env node

/**
 * Deploy environment variables to AWS Amplify using AWS SDK
 * Usage: node deploy-env-vars.js <app-id> <branch-name> [env-file]
 */

const fs = require('fs');
const path = require('path');
const { AmplifyClient, UpdateBranchCommand, GetBranchCommand } = require('@aws-sdk/client-amplify');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
};

// Parse command line arguments. Flags are split out first so that a trailing
// --replace is never mistaken for the env-file positional.
const argv = process.argv.slice(2);
const flags = argv.filter((a) => a.startsWith('--'));
const positional = argv.filter((a) => !a.startsWith('--'));

if (positional.length < 2) {
  console.error(`${colors.red}Usage: node deploy-env-vars.js <app-id> <branch-name> [env-file] [--replace]${colors.reset}`);
  console.log('');
  console.log('Example:');
  console.log('  node deploy-env-vars.js d1234567890abc main .env.production');
  console.log('');
  console.log('By default the file is MERGED over the variables already on the branch.');
  console.log('--replace deletes anything the file does not contain (rarely what you want).');
  process.exit(1);
}

const [appId, branchName, envFile = '.env.production'] = positional;

/* Amplify apps are region-scoped, so the wrong region reports a perfectly
   healthy app as "not found". This used to be hardcoded to us-east-1 while the
   Notiva app lives in eu-central-1, which is exactly that failure. Overridable
   via AWS_REGION for anyone running against a different account. */
const REGION = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'eu-central-1';

/**
 * Parse .env file into key-value object
 */
function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Environment file not found: ${filePath}`);
  }

  const envVars = {};
  const content = fs.readFileSync(filePath, 'utf-8');
  
  content.split('\n').forEach(line => {
    // Skip empty lines and comments
    if (!line.trim() || line.trim().startsWith('#')) {
      return;
    }

    // Parse KEY=VALUE
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      
      // Remove quotes if present
      value = value.replace(/^["'](.*)["']$/, '$1');
      
      envVars[key] = value;
    }
  });

  return envVars;
}

/**
 * Deploy environment variables to Amplify
 */
async function deployEnvVars() {
  console.log(`${colors.blue}🚀 Deploying environment variables to AWS Amplify${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`App ID: ${colors.green}${appId}${colors.reset}`);
  console.log(`Branch: ${colors.green}${branchName}${colors.reset}`);
  console.log(`Env File: ${colors.green}${envFile}${colors.reset}`);
  console.log(`Region:   ${colors.green}${REGION}${colors.reset}`);
  console.log('');

  try {
    // Parse environment file
    console.log(`${colors.blue}📝 Parsing environment variables...${colors.reset}`);
    const environmentVariables = parseEnvFile(envFile);
    const varCount = Object.keys(environmentVariables).length;
    console.log(`${colors.green}✅ Parsed ${varCount} environment variables${colors.reset}`);
    console.log('');

    // Initialize Amplify client
    const client = new AmplifyClient({ region: REGION });

    /* UpdateBranch REPLACES environmentVariables wholesale — it is not a patch.
       Since .env.production is only ever a subset of what a branch carries
       (Sentry keys, VAPID push keys, ENCRYPTION_KEY and friends are set in the
       console and deliberately not committed), pushing it raw silently deletes
       everything it omits and breaks production.

       So: read what is live, overlay the local file, push the union. Pass
       --replace to get the old destructive behaviour deliberately. */
    const replace = flags.includes('--replace');

    console.log(`${colors.blue}🔍 Reading variables already on ${branchName}...${colors.reset}`);
    const { branch } = await client.send(new GetBranchCommand({ appId, branchName }));
    const live = branch.environmentVariables || {};

    const localKeys = Object.keys(environmentVariables);
    const preserved = Object.keys(live).filter((k) => !localKeys.includes(k));
    const added = localKeys.filter((k) => !(k in live));
    const changed = localKeys.filter((k) => k in live && live[k] !== environmentVariables[k]);

    const merged = replace ? environmentVariables : { ...live, ...environmentVariables };

    console.log(`${colors.green}   ${Object.keys(live).length} already set${colors.reset}`);
    if (added.length) console.log(`${colors.green}   + ${added.length} new: ${added.join(', ')}${colors.reset}`);
    if (changed.length) console.log(`${colors.blue}   ~ ${changed.length} changed: ${changed.join(', ')}${colors.reset}`);
    if (preserved.length) {
      if (replace) {
        console.log(`${colors.red}   - ${preserved.length} WILL BE DELETED: ${preserved.join(', ')}${colors.reset}`);
      } else {
        console.log(`${colors.green}   = ${preserved.length} kept untouched: ${preserved.join(', ')}${colors.reset}`);
      }
    }
    console.log('');

    if (replace && preserved.length) {
      console.log(`${colors.red}⚠️  --replace given: the ${preserved.length} variables above will be removed.${colors.reset}`);
      console.log(`${colors.red}   Ctrl-C within 5 seconds to abort.${colors.reset}`);
      await new Promise((r) => setTimeout(r, 5000));
    }

    console.log(`${colors.blue}📤 Updating Amplify environment variables...${colors.reset}`);

    await client.send(
      new UpdateBranchCommand({ appId, branchName, environmentVariables: merged })
    );

    console.log(
      `${colors.green}✅ ${Object.keys(merged).length} environment variables now set on ${branchName}${colors.reset}`
    );
    console.log('');
    console.log(`${colors.blue}🔗 View your app:${colors.reset}`);
    console.log(`https://console.aws.amazon.com/amplify/home?region=${REGION}#/${appId}`);
    console.log('');
    console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}🎉 Deployment complete!${colors.reset}`);
    console.log('');
    console.log(`${colors.blue}Next steps:${colors.reset}`);
    console.log('1. Verify variables in Amplify Console');
    console.log('2. Trigger a new deployment to apply changes');
    console.log('3. Test your application');

  } catch (error) {
    console.error(`${colors.red}❌ Error: ${error.message}${colors.reset}`);

    /* "App not found" is almost always the wrong region rather than a wrong id,
       and the raw message gives no hint of that. Say so. */
    if (/not\s*found/i.test(error.message)) {
      console.error('');
      console.error(`${colors.blue}This was looked up in region ${REGION}.${colors.reset}`);
      console.error('Amplify apps are region-scoped, so an app in another region reports as missing.');
      console.error('List what exists where:');
      console.error(`  aws amplify list-apps --region ${REGION} --query 'apps[].{name:name,id:appId}' --output table`);
      console.error('Or target another region:');
      console.error(`  AWS_REGION=<region> npm run deploy:env ${appId} ${branchName} ${envFile}`);
    }

    process.exit(1);
  }
}

// Run the deployment
deployEnvVars();
