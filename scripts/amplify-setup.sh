#!/bin/bash

# Complete Amplify Setup Script
# This script helps you set up the Amplify app and deploy environment variables

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       Notiva Website - AWS Amplify Complete Setup         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Check if app exists
echo -e "${BLUE}📋 Step 1: Checking for existing Amplify apps...${NC}"
APPS=$(aws amplify list-apps --query 'apps[*].[name,appId]' --output text 2>/dev/null)

if [ -z "$APPS" ]; then
    echo -e "${YELLOW}⚠️  No Amplify apps found. You need to create one first.${NC}"
    echo ""
    echo -e "${BLUE}Please follow these steps:${NC}"
    echo ""
    echo "1. Open AWS Amplify Console:"
    echo -e "   ${GREEN}https://console.aws.amazon.com/amplify/${NC}"
    echo ""
    echo "2. Click 'New app' → 'Host web app'"
    echo ""
    echo "3. Select 'GitHub' and authorize"
    echo ""
    echo "4. Select repository: ${GREEN}Multroid/notiva-website${NC}"
    echo "   Branch: ${GREEN}main${NC} (or ${GREEN}dev${NC} for staging)"
    echo ""
    echo "5. Leave build settings as default (amplify.yml detected)"
    echo ""
    echo "6. Click 'Save and deploy'"
    echo ""
    echo "7. Wait for app creation, then run this script again"
    echo ""
    exit 0
else
    echo -e "${GREEN}✅ Found Amplify apps:${NC}"
    echo "$APPS" | while read line; do
        echo "   - $line"
    done
    echo ""
fi

# Step 2: Select app
echo -e "${BLUE}📋 Step 2: Select your app${NC}"
echo "Enter the App ID for notiva-website:"
read -p "> " APP_ID

if [ -z "$APP_ID" ]; then
    echo -e "${RED}❌ App ID is required${NC}"
    exit 1
fi

# Verify app exists
APP_INFO=$(aws amplify get-app --app-id "$APP_ID" 2>/dev/null)
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ App not found with ID: $APP_ID${NC}"
    exit 1
fi

APP_NAME=$(echo "$APP_INFO" | grep -o '"name": "[^"]*"' | cut -d'"' -f4)
echo -e "${GREEN}✅ Found app: $APP_NAME${NC}"
echo ""

# Step 3: Select branch
echo -e "${BLUE}📋 Step 3: Select branch${NC}"
BRANCHES=$(aws amplify list-branches --app-id "$APP_ID" --query 'branches[*].branchName' --output text)

if [ -z "$BRANCHES" ]; then
    echo -e "${RED}❌ No branches found. Please connect a branch in Amplify Console first.${NC}"
    exit 1
fi

echo "Available branches:"
echo "$BRANCHES" | tr '\t' '\n' | while read branch; do
    echo "   - $branch"
done
echo ""
echo "Enter branch name (e.g., main, dev):"
read -p "> " BRANCH_NAME

if [ -z "$BRANCH_NAME" ]; then
    echo -e "${RED}❌ Branch name is required${NC}"
    exit 1
fi

# Step 4: Check for env file
echo ""
echo -e "${BLUE}📋 Step 4: Preparing environment variables${NC}"

if [ ! -f ".env.production" ]; then
    echo -e "${RED}❌ .env.production file not found${NC}"
    echo "Please create .env.production with your environment variables"
    exit 1
fi

# Parse env file into JSON
echo -e "${BLUE}📝 Parsing .env.production...${NC}"
TEMP_JSON=$(mktemp)
echo "{" > "$TEMP_JSON"

FIRST_LINE=true
while IFS='=' read -r key value; do
    # Skip empty lines and comments
    if [[ -z "$key" || "$key" =~ ^#.* || "$key" =~ ^[[:space:]]*$ ]]; then
        continue
    fi
    
    # Remove leading/trailing whitespace
    key=$(echo "$key" | xargs)
    value=$(echo "$value" | xargs)
    
    # Remove quotes from value if present
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
    
    # Escape special characters in value
    value=$(echo "$value" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g')
    
    # Add comma for all but first entry
    if [ "$FIRST_LINE" = true ]; then
        FIRST_LINE=false
    else
        echo "," >> "$TEMP_JSON"
    fi
    
    # Add to JSON
    printf '  "%s": "%s"' "$key" "$value" >> "$TEMP_JSON"
done < .env.production

echo "" >> "$TEMP_JSON"
echo "}" >> "$TEMP_JSON"

VAR_COUNT=$(grep -c '"' "$TEMP_JSON" | awk '{print $1/2}')
echo -e "${GREEN}✅ Parsed $VAR_COUNT environment variables${NC}"
echo ""

# Step 5: Deploy variables
echo -e "${BLUE}📤 Step 5: Deploying environment variables to Amplify...${NC}"

aws amplify update-branch \
    --app-id "$APP_ID" \
    --branch-name "$BRANCH_NAME" \
    --environment-variables file://"$TEMP_JSON" \
    --output json > /dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Environment variables deployed successfully!${NC}"
else
    echo -e "${RED}❌ Failed to deploy environment variables${NC}"
    rm -f "$TEMP_JSON"
    exit 1
fi

rm -f "$TEMP_JSON"

# Step 6: Trigger deployment
echo ""
echo -e "${BLUE}📋 Step 6: Would you like to trigger a new deployment? (y/n)${NC}"
read -p "> " DEPLOY

if [ "$DEPLOY" = "y" ] || [ "$DEPLOY" = "Y" ]; then
    echo -e "${BLUE}🚀 Starting deployment...${NC}"
    
    JOB_ID=$(aws amplify start-job \
        --app-id "$APP_ID" \
        --branch-name "$BRANCH_NAME" \
        --job-type RELEASE \
        --query 'jobSummary.jobId' \
        --output text)
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Deployment started! Job ID: $JOB_ID${NC}"
        echo ""
        echo -e "${BLUE}🔗 Monitor deployment:${NC}"
        echo "https://console.aws.amazon.com/amplify/home?region=eu-west-1#/$APP_ID/$BRANCH_NAME/$JOB_ID"
    fi
fi

# Summary
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    Setup Complete! 🎉                      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}✅ App ID:${NC} $APP_ID"
echo -e "${GREEN}✅ Branch:${NC} $BRANCH_NAME"
echo -e "${GREEN}✅ Variables:${NC} $VAR_COUNT deployed"
echo ""
echo -e "${BLUE}🔗 Quick Links:${NC}"
echo "   App Console: https://console.aws.amazon.com/amplify/home?region=eu-west-1#/$APP_ID"
echo "   Deployments: https://console.aws.amazon.com/amplify/home?region=eu-west-1#/$APP_ID/$BRANCH_NAME"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "   1. Verify variables in Amplify Console"
echo "   2. Monitor the deployment"
echo "   3. Configure custom domain (if not already done)"
echo "   4. Test the deployed website"
echo ""
