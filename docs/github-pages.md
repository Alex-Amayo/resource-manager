# GitHub Pages Deployment Guide

This guide explains how to deploy the Resource Manager demo to GitHub Pages.

## Setup

1. The repository is already configured with GitHub Actions for automatic deployment.
2. When changes are pushed to the `main` branch, the demo will automatically be built and deployed.

## Manual Deployment

To manually trigger a deployment:

1. Go to the GitHub repository
2. Navigate to Actions tab
3. Select the "Deploy Demo to GitHub Pages" workflow
4. Click "Run workflow" button

## Testing Locally

To test the GitHub Pages build locally:

```bash
# Run the helper script
./serve-gh-pages.sh

# Or manually with these commands
pnpm build:gh-pages
pnpm dlx serve packages/demo/out -p 8080
```

Then visit http://localhost:8080 to view the GitHub Pages version.

## Configuration

- The GitHub Pages deployment uses the `NEXT_PUBLIC_BASE_PATH` environment variable to handle subpath routing
- Base path is automatically set to `/resource-manager` for GitHub Pages builds
- Assets and links are adjusted to work with this base path

## Notes

- The static export is generated in the `packages/demo/out` directory
- The GitHub Actions workflow automatically handles deployment to GitHub Pages
- Make sure to test locally before pushing changes to ensure everything works as expected
