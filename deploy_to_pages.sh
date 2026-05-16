#!/usr/bin/env bash
set -e

# Ensure we are on the latest main branch
git checkout main
git pull origin main

# Build the static export
npm run build

# Switch to (or create) the gh-pages branch
if git rev-parse --verify gh-pages >/dev/null 2>&1; then
  git checkout gh-pages
else
  git checkout -b gh-pages
fi

# Remove all tracked files
git rm -r . || true
# Copy the newly built static files
cp -r out/* .

# Preserve CNAME if it exists at repository root
if [ -f ../CNAME ]; then
  cp ../CNAME .
fi

# Commit and force‑push
git add -A
git commit -m "Deploy static site from commit 80a6e64"
git push origin gh-pages --force

# Return to main branch
git checkout main
