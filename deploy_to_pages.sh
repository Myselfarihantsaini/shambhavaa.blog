#!/usr/bin/env bash
set -e

# Shambhavaa Blog — Safer Deployment Script
# 1. Builds static site
# 2. Preserves build output in memory/temp
# 3. Switches to gh-pages branch
# 4. Cleans and deploys preserved files

echo "🚀 Starting deployment process..."

# Ensure we are on main
git checkout main

# Build the site
echo "📦 Building static site..."
npm run build

# Create a temporary directory and copy the build output
echo "📋 Preserving build output..."
TEMP_EXPORT=$(mktemp -d)
cp -r out/* "$TEMP_EXPORT/"

# Switch to gh-pages
echo "🔄 Switching to gh-pages branch..."
if git rev-parse --verify gh-pages >/dev/null 2>&1; then
  git checkout gh-pages
else
  git checkout -b gh-pages
fi

# Clean current directory (except .git)
echo "🧹 Cleaning gh-pages branch..."
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} +

# Copy files back from temp
echo "🚚 Moving build files into place..."
cp -r "$TEMP_EXPORT"/* .
rm -rf "$TEMP_EXPORT"

# Add CNAME if it's missing (next-sitemap might not handle it)
if [ ! -f CNAME ]; then
  echo "shambhavaa.blog" > CNAME
fi

# Commit and Push
echo "📤 Committing and pushing to GitHub..."
git add -A
git commit -m "Deploy: SEO & GEO Implementation [$(date)]" || echo "No changes to commit"
git push origin gh-pages --force

# Return to main
echo "🔙 Returning to main branch..."
git checkout main

echo "✨ Deployment complete!"
