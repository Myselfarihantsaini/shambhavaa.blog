#!/usr/bin/env bash
set -e

# Shambhavaa Blog — Safer Deployment Script
echo "🚀 Starting deployment from main..."

# 1. Build on main branch
git checkout main
npm run build

# 2. Preserve build output and CNAME
echo "📋 Preserving build output and CNAME..."
TEMP_EXPORT=$(mktemp -d)
cp -r out/* "$TEMP_EXPORT/"

# Preserve CNAME specifically (it should be in public/ and thus in out/ already, but double check)
if [ -f CNAME ]; then
  cp CNAME "$TEMP_EXPORT/"
fi

# 3. Switch to gh-pages
echo "🔄 Switching to gh-pages branch..."
if git rev-parse --verify gh-pages >/dev/null 2>&1; then
  git checkout gh-pages
else
  git checkout -b gh-pages
fi

# 4. Clean gh-pages branch except .git
echo "🧹 Cleaning branch files..."
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} +

# 5. Move preserved files back
echo "🚚 Deploying preserved files..."
cp -r "$TEMP_EXPORT"/* .
rm -rf "$TEMP_EXPORT"

# 6. Commit only if changes exist
git add -A
if git diff-index --quiet HEAD --; then
  echo "✅ No changes to deploy."
else
  echo "📤 Committing and pushing deployment..."
  git commit -m "Deploy: SEO & GEO Implementation [$(date)]"
  git push origin gh-pages --force
fi

# 7. Return to main
echo "🔙 Returning to main branch..."
git checkout main

echo "✨ Done!"
