# Environment Variable Deployment Scripts

Automated scripts to deploy environment variables to AWS Amplify.

## 📋 Prerequisites

### For Bash Scripts (`.sh`)
- AWS CLI installed and configured
- `jq` installed (for export script)
- Proper AWS credentials with Amplify permissions

### For Node.js Script (`.js`)
- Node.js 18+ installed
- AWS SDK for JavaScript v3

## 🚀 Quick Start

### Option 1: Using Bash Script (Recommended)

1. **Install AWS CLI** (if not already installed):
   ```bash
   # macOS
   brew install awscli
   
   # Linux
   curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
   unzip awscliv2.zip
   sudo ./aws/install
   ```

2. **Configure AWS credentials**:
   ```bash
   aws configure
   # Enter your AWS Access Key ID, Secret Access Key, and region (us-east-1)
   ```

3. **Make scripts executable**:
   ```bash
   chmod +x scripts/deploy-env-vars.sh
   chmod +x scripts/export-env-vars.sh
   ```

4. **Create your production env file**:
   ```bash
   cp .env.production.template .env.production
   # Edit .env.production with your actual values
   ```

5. **Find your Amplify App ID**:
   ```bash
   aws amplify list-apps --query 'apps[*].[name,appId]' --output table
   ```

6. **Deploy environment variables**:
   ```bash
   ./scripts/deploy-env-vars.sh <app-id> <branch-name> .env.production
   
   # Example:
   ./scripts/deploy-env-vars.sh d1234567890abc main .env.production
   ```

### Option 2: Using Node.js Script

1. **Install dependencies**:
   ```bash
   npm install --save-dev @aws-sdk/client-amplify
   ```

2. **Configure AWS credentials** (same as above)

3. **Deploy**:
   ```bash
   node scripts/deploy-env-vars.js <app-id> <branch-name> .env.production
   ```

## 📤 Export Existing Variables

To backup your current Amplify environment variables:

```bash
# Install jq if not already installed
brew install jq  # macOS
# or
sudo apt-get install jq  # Linux

# Export variables
./scripts/export-env-vars.sh <app-id> <branch-name> .env.backup

# Example:
./scripts/export-env-vars.sh d1234567890abc main .env.backup
```

## 📝 Environment File Format

Your `.env` file should follow this format:

```bash
# Comments start with #
KEY_NAME=value
ANOTHER_KEY="value with spaces"
MULTILINE_JSON='[{"key":"value"}]'

# Empty lines are ignored
```

**Important Notes:**
- No spaces around `=` sign
- Values with spaces should be quoted
- Comments and empty lines are skipped
- Special characters in values will be properly escaped

## 🔧 Common Use Cases

### Deploy to Multiple Branches

```bash
# Deploy to staging
./scripts/deploy-env-vars.sh d123abc dev .env.staging

# Deploy to production
./scripts/deploy-env-vars.sh d123abc main .env.production
```

### Update Specific Variables

1. Export current variables:
   ```bash
   ./scripts/export-env-vars.sh d123abc main .env.current
   ```

2. Edit the exported file

3. Deploy updated variables:
   ```bash
   ./scripts/deploy-env-vars.sh d123abc main .env.current
   ```

### Migrate Variables Between Apps

```bash
# Export from old app
./scripts/export-env-vars.sh old-app-id main .env.export

# Deploy to new app
./scripts/deploy-env-vars.sh new-app-id main .env.export
```

## 🔐 Security Best Practices

1. **Never commit `.env` files with real values**
   - `.env.production`, `.env.staging`, etc. are in `.gitignore`
   - Only commit `.env.example` and `.env.*.template` files

2. **Rotate secrets regularly**
   ```bash
   # Generate new NEXTAUTH_SECRET
   openssl rand -base64 32
   
   # Generate new ENCRYPTION_KEY
   openssl rand -base64 32
   ```

3. **Use separate credentials per environment**
   - Production should have different secrets than staging
   - Never use production credentials in development

4. **Limit AWS IAM permissions**
   - Grant only `amplify:UpdateBranch` permission
   - Use separate IAM users for automation

## 🐛 Troubleshooting

### "AWS CLI not found"
```bash
# Install AWS CLI
brew install awscli  # macOS
# or follow AWS CLI installation guide
```

### "jq not found" (export script only)
```bash
# macOS
brew install jq

# Linux
sudo apt-get install jq
```

### "Access Denied" error
- Check AWS credentials: `aws configure list`
- Verify IAM permissions include `amplify:UpdateBranch`
- Ensure App ID and branch name are correct

### "Environment file not found"
- Verify the path to your `.env` file
- Use absolute path if relative path doesn't work

### Variables not updating in app
- After deploying variables, trigger a new build in Amplify Console
- Or push a new commit to trigger automatic deployment
- Changes require a rebuild to take effect

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy Env Vars

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment (staging/production)'
        required: true
        default: 'staging'

jobs:
  deploy-env-vars:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Deploy Environment Variables
        run: |
          chmod +x scripts/deploy-env-vars.sh
          ./scripts/deploy-env-vars.sh ${{ secrets.AMPLIFY_APP_ID }} main .env.${{ github.event.inputs.environment }}
```

## 📚 Additional Resources

- [AWS Amplify CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/amplify/)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

## 🆘 Support

For issues with these scripts:
1. Check the troubleshooting section above
2. Verify AWS credentials and permissions
3. Check Amplify Console for error messages
4. Contact DevOps team on Slack #infrastructure
