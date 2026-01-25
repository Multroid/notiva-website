#!/bin/bash

# Export environment variables from AWS Amplify
# Usage: ./export-env-vars.sh <app-id> <branch-name> [output-file]

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${RED}❌ jq is not installed. Please install it first.${NC}"
    echo "macOS: brew install jq"
    echo "Linux: sudo apt-get install jq"
    exit 1
fi

# Check arguments
if [ $# -lt 2 ]; then
    echo -e "${RED}Usage: $0 <app-id> <branch-name> [output-file]${NC}"
    echo ""
    echo "Example:"
    echo "  $0 d1234567890abc main .env.backup"
    exit 1
fi

APP_ID=$1
BRANCH_NAME=$2
OUTPUT_FILE=${3:-.env.backup}

echo -e "${BLUE}📥 Exporting environment variables from AWS Amplify${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "App ID: ${GREEN}$APP_ID${NC}"
echo -e "Branch: ${GREEN}$BRANCH_NAME${NC}"
echo -e "Output: ${GREEN}$OUTPUT_FILE${NC}"
echo ""

# Fetch branch details
echo -e "${BLUE}🔍 Fetching environment variables...${NC}"

BRANCH_INFO=$(aws amplify get-branch \
    --app-id "$APP_ID" \
    --branch-name "$BRANCH_NAME" \
    --region us-east-1 \
    --output json)

# Extract environment variables
echo "$BRANCH_INFO" | jq -r '.branch.environmentVariables | to_entries[] | "\(.key)=\(.value)"' > "$OUTPUT_FILE"

# Count variables
VAR_COUNT=$(wc -l < "$OUTPUT_FILE" | tr -d ' ')

if [ "$VAR_COUNT" -eq 0 ]; then
    echo -e "${RED}❌ No environment variables found${NC}"
    rm -f "$OUTPUT_FILE"
    exit 1
fi

echo -e "${GREEN}✅ Exported $VAR_COUNT environment variables${NC}"
echo ""
echo -e "${BLUE}📄 Saved to: ${GREEN}$OUTPUT_FILE${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Export complete!${NC}"
