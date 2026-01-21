#!/bin/bash

# Script to easily add resume PDF to portfolio
# Usage: ./add-resume.sh /path/to/your/resume.pdf

echo "🎯 Portfolio Resume Setup Script"
echo "================================="
echo ""

# Check if file path is provided
if [ -z "$1" ]; then
    echo "❌ Error: No file path provided"
    echo ""
    echo "Usage: ./add-resume.sh /path/to/your/resume.pdf"
    echo ""
    echo "Example:"
    echo "  ./add-resume.sh ~/Downloads/MyResume.pdf"
    exit 1
fi

RESUME_PATH="$1"

# Check if file exists
if [ ! -f "$RESUME_PATH" ]; then
    echo "❌ Error: File not found: $RESUME_PATH"
    exit 1
fi

# Check if it's a PDF
if [[ ! "$RESUME_PATH" =~ \.pdf$ ]]; then
    echo "⚠️  Warning: File doesn't appear to be a PDF"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Copy the file
echo "📋 Copying resume to public/assets/resume.pdf..."
cp "$RESUME_PATH" public/assets/resume.pdf

if [ $? -eq 0 ]; then
    echo "✅ Resume added successfully!"
    echo ""
    echo "📊 File info:"
    ls -lh public/assets/resume.pdf
    echo ""
    echo "🚀 Next steps:"
    echo "1. Test locally: npm run dev"
    echo "2. Commit & deploy:"
    echo "   git add public/assets/resume.pdf"
    echo "   git commit -m 'Add resume PDF'"
    echo "   git push origin main"
    echo ""
    echo "✨ Your resume will be live at:"
    echo "   https://msrrana.github.io/animated-portfolio/"
else
    echo "❌ Failed to copy resume"
    exit 1
fi
