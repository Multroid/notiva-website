#!/usr/bin/env node

/**
 * Deploy environment variables to AWS Amplify using AWS SDK
 * Usage: node deploy-env-vars.js <app-id> <branch-name> [env-file]
 */

const fs = require('fs');
const path = require('path');
const { AmplifyClient, UpdateBranchCommand } = require('@aws-sdk/client-amplify');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
};

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error(`${colors.red}Usage: node deploy-env-vars.js <app-id> <branch-name> [env-file]${colors.reset}`);
  console.log('');
  console.log('Example:');
  console.log('  node deploy-env-vars.js d1234567890abc main .env.production');
  process.exit(1);
}

const [appId, branchName, envFile = '.env.production'] = args;

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
  console.log('');

  try {
    // Parse environment file
    console.log(`${colors.blue}📝 Parsing environment variables...${colors.reset}`);
    const environmentVariables = parseEnvFile(envFile);
    const varCount = Object.keys(environmentVariables).length;
    console.log(`${colors.green}✅ Parsed ${varCount} environment variables${colors.reset}`);
    console.log('');

    // Initialize Amplify client
    const client = new AmplifyClient({ region: 'us-east-1' });

    // Update branch with new environment variables
    console.log(`${colors.blue}📤 Updating Amplify environment variables...${colors.reset}`);
    
    const command = new UpdateBranchCommand({
      appId,
      branchName,
      environmentVariables,
    });

    await client.send(command);

    console.log(`${colors.green}✅ Environment variables deployed successfully!${colors.reset}`);
    console.log('');
    console.log(`${colors.blue}🔗 View your app:${colors.reset}`);
    console.log(`https://console.aws.amazon.com/amplify/home?region=us-east-1#/${appId}`);
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
    process.exit(1);
  }
}

// Run the deployment
deployEnvVars();
