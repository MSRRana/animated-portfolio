#!/bin/bash

# Helper script to create a feature branch and PR
# Usage: ./create-pr.sh "feature-name" "PR title" "PR description"

echo "🚀 Portfolio PR Creation Helper"
echo "================================"
echo ""

# Check if feature name is provided
if [ -z "$1" ]; then
    echo "❌ Error: Feature name required"
    echo ""
    echo "Usage: ./create-pr.sh <feature-name> <PR-title> <PR-description>"
    echo ""
    echo "Example:"
    echo "  ./create-pr.sh add-dark-mode \"Add dark mode\" \"Implements dark mode toggle\""
    exit 1
fi

FEATURE_NAME="$1"
PR_TITLE="${2:-Update portfolio}"
PR_DESCRIPTION="${3:-Portfolio updates}"

# Ensure we're on main and up to date
echo "📥 Updating main branch..."
git checkout main
git pull origin main

# Create feature branch
BRANCH_NAME="feature/$FEATURE_NAME"
echo "🌿 Creating branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"

echo ""
echo "✅ Branch created successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Make your changes"
echo "2. Run: git add ."
echo "3. Run: git commit -m \"Your message\""
echo "4. Run: git push origin $BRANCH_NAME"
echo "5. Run: gh pr create --title \"$PR_TITLE\" --body \"$PR_DESCRIPTION\""
echo ""
echo "Or use the quick command:"
echo "git add . && git commit -m \"Your message\" && git push origin $BRANCH_NAME && gh pr create --title \"$PR_TITLE\" --body \"$PR_DESCRIPTION\""
