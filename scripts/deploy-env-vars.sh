#!/bin/bash

# Deploy environment variables to AWS Amplify
# Usage: ./deploy-env-vars.sh <app-id> <branch-name> [env-file]

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    echo "Visit: https://aws.amazon.com/cli/"
    exit 1
fi

# Check arguments
if [ $# -lt 2 ]; then
    echo -e "${RED}Usage: $0 <app-id> <branch-name> [env-file]${NC}"
    echo ""
    echo "Example:"
    echo "  $0 d1234567890abc main .env.production"
    echo ""
    echo "To find your App ID:"
    echo "  aws amplify list-apps --query 'apps[*].[name,appId]' --output table"
    exit 1
fi

APP_ID=$1
BRANCH_NAME=$2
ENV_FILE=${3:-.env.production}

echo -e "${BLUE}🚀 Deploying environment variables to AWS Amplify${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "App ID: ${GREEN}$APP_ID${NC}"
echo -e "Branch: ${GREEN}$BRANCH_NAME${NC}"
echo -e "Env File: ${GREEN}$ENV_FILE${NC}"
echo ""

# Check if env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}❌ Environment file not found: $ENV_FILE${NC}"
    exit 1
fi

# Parse env file and create JSON
echo -e "${BLUE}📝 Parsing environment variables...${NC}"

# Create temporary JSON file
TEMP_JSON=$(mktemp)

# Start JSON object
echo "{" > "$TEMP_JSON"

# Read env file and convert to JSON
FIRST_LINE=true
while IFS='=' read -r key value; do
    # Skip empty lines and comments
    if [[ -z "$key" || "$key" =~ ^#.* ]]; then
        continue
    fi
    
    # Remove quotes from value if present
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
    
    # Add comma for all but first entry
    if [ "$FIRST_LINE" = true ]; then
        FIRST_LINE=false
    else
        echo "," >> "$TEMP_JSON"
    fi
    
    # Add to JSON (escape special characters)
    printf '  "%s": "%s"' "$key" "$value" >> "$TEMP_JSON"
done < "$ENV_FILE"

# Close JSON object
echo "" >> "$TEMP_JSON"
echo "}" >> "$TEMP_JSON"

# Show parsed variables
VAR_COUNT=$(grep -c '"' "$TEMP_JSON" | awk '{print $1/2}')
echo -e "${GREEN}✅ Parsed $VAR_COUNT environment variables${NC}"
echo ""

# Deploy to Amplify
echo -e "${BLUE}📤 Updating Amplify environment variables...${NC}"

aws amplify update-branch \
    --app-id "$APP_ID" \
    --branch-name "$BRANCH_NAME" \
    --environment-variables file://"$TEMP_JSON" \
    --region us-east-1 \
    --output json > /dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Environment variables deployed successfully!${NC}"
    echo ""
    echo -e "${BLUE}🔗 View your app:${NC}"
    echo "https://console.aws.amazon.com/amplify/home?region=us-east-1#/$APP_ID"
else
    echo -e "${RED}❌ Failed to deploy environment variables${NC}"
    rm -f "$TEMP_JSON"
    exit 1
fi

# Cleanup
rm -f "$TEMP_JSON"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Verify variables in Amplify Console"
echo "2. Trigger a new deployment to apply changes"
echo "3. Test your application"
