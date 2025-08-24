#!/bin/bash

# DulpPoints Deployment Script
# This script helps deploy the application to different platforms

echo "🚀 DulpPoints Deployment Script"
echo "================================"

# Check if build exists
if [ ! -d "build" ]; then
    echo "❌ Build directory not found. Building the application..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed. Please fix the errors and try again."
        exit 1
    fi
fi

echo "✅ Build directory found."

# Function to deploy to Firebase
deploy_firebase() {
    echo "🔥 Deploying to Firebase Hosting..."
    
    if ! command -v firebase &> /dev/null; then
        echo "❌ Firebase CLI not found. Installing..."
        npm install -g firebase-tools
    fi
    
    firebase login
    firebase init hosting --public build --single-page-application true
    firebase deploy
}

# Function to deploy to Vercel
deploy_vercel() {
    echo "⚡ Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo "❌ Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    vercel --prod
}

# Function to deploy to Netlify
deploy_netlify() {
    echo "🌐 Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        echo "❌ Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    netlify deploy --prod --dir=build
}

# Main deployment menu
echo ""
echo "Choose deployment platform:"
echo "1) Firebase Hosting"
echo "2) Vercel"
echo "3) Netlify"
echo "4) Manual deployment"
echo "5) Exit"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        deploy_firebase
        ;;
    2)
        deploy_vercel
        ;;
    3)
        deploy_netlify
        ;;
    4)
        echo "📁 Manual deployment instructions:"
        echo "1. Your build files are in the 'build' directory"
        echo "2. Upload the contents of 'build' to your hosting provider"
        echo "3. Configure your hosting provider for single-page application routing"
        echo "4. Set up environment variables if needed"
        echo ""
        echo "Build directory: $(pwd)/build"
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment completed!"
echo "🌐 Your app should be live shortly."
echo ""
echo "📚 For more information, check the README.md file."