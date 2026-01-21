# GitHub Actions Workflows

## Deploy to GitHub Pages

This workflow automatically deploys your portfolio to GitHub Pages whenever you push to the `main` branch.

### What it does:

1. **Triggers on:**
   - Every push to `main` branch
   - Manual trigger via GitHub Actions UI

2. **Build Job:**
   - Checks out your code
   - Sets up Node.js 20
   - Installs dependencies
   - Builds the project (`npm run build`)
   - Uploads the build artifacts

3. **Deploy Job:**
   - Deploys the built site to GitHub Pages
   - Automatically updates your live site at: https://msrrana.github.io/animated-portfolio/

### How to use:

Simply push your changes to the main branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

GitHub Actions will automatically:
- Build your portfolio
- Deploy to GitHub Pages
- Update your live site (usually takes 1-2 minutes)

### Manual Deployment:

You can also trigger deployment manually:
1. Go to: https://github.com/MSRRana/animated-portfolio/actions
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the `main` branch
5. Click "Run workflow"

### Viewing Deployment Status:

Check deployment status at: https://github.com/MSRRana/animated-portfolio/actions

### Permissions:

The workflow has the following permissions:
- `contents: read` - Read repository contents
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Required for GitHub Pages deployment
