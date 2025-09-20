#!/bin/bash

# Portfolio Deployment Script
echo "🚀 Portfolio Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "🎯 Your portfolio is ready for deployment!"
    echo ""
    echo "Choose your deployment platform:"
    echo "1. Vercel (Recommended) - https://vercel.com"
    echo "2. Netlify - https://netlify.com"
    echo "3. Cloudflare Pages - https://pages.cloudflare.com"
    echo ""
    echo "📁 Build output:"
    echo "   - Client files: build/client/"
    echo "   - Server files: build/server/"
    echo ""
    echo "📖 For detailed instructions, see DEPLOYMENT.md"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
