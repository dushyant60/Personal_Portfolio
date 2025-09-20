# Portfolio Deployment Guide

This guide will help you deploy your personal portfolio website to Vercel or Netlify for free.

## Prerequisites

1. A GitHub account
2. Your portfolio code pushed to a GitHub repository
3. Node.js 18+ installed locally (for testing)

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Prepare Your Repository
1. Push your code to GitHub if you haven't already:
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Remix app
5. Configure the following settings:
   - **Framework Preset**: Remix
   - **Build Command**: `npm run build`
   - **Output Directory**: `build/client`
   - **Install Command**: `npm install`
6. Click "Deploy"

### Step 3: Environment Variables (Optional)
If you want to use the contact form or theme persistence:
1. Go to your project settings in Vercel
2. Add environment variables:
   - `SESSION_SECRET`: Generate a random string
   - `VITE_SITE_URL`: Your Vercel domain (e.g., `https://your-portfolio.vercel.app`)

## Option 2: Deploy to Netlify

### Step 1: Prepare Your Repository
Same as Vercel - push your code to GitHub.

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Connect your GitHub account and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build/client`
5. Click "Deploy site"

### Step 3: Environment Variables (Optional)
1. Go to Site settings > Environment variables
2. Add the same variables as mentioned for Vercel

## Option 3: Keep Using Cloudflare Pages

Your project is now properly configured for Cloudflare Pages:

### Step 1: Deploy to Cloudflare Pages
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Click "Create a project" > "Connect to Git"
3. Connect your GitHub account and select your repository
4. Configure build settings:
   - **Framework preset**: Remix
   - **Build command**: `npm run build:spa`
   - **Build output directory**: `build/client`
   - **Root directory**: `/` (leave empty)
   - **Node.js version**: 18 (or latest)
   - **Deploy command**: Leave empty (Pages handles this automatically)
5. Click "Save and Deploy"

**Important**: 
- Use `npm run build:spa` for static site generation
- The `_redirects` file handles client-side routing
- Assets and 3D models will be properly served

### Step 2: Environment Variables (Optional)
If you want theme persistence or contact form:
1. Go to your project settings
2. Navigate to "Environment variables"
3. Add:
   - `SESSION_SECRET`: Generate a random string
   - `VITE_SITE_URL`: Your Cloudflare Pages domain

### Troubleshooting Cloudflare Pages
If you encounter deployment issues:
1. **Build fails**: Ensure Node.js version is 18+
2. **Wrangler errors**: Use Cloudflare Pages dashboard instead of direct wrangler deploy
3. **KV namespace errors**: The KV binding is optional and can be removed if not needed
4. **Worker name errors**: Use Cloudflare Pages, not Workers (they're different services)

### Important: Cloudflare Pages vs Workers
- **Cloudflare Pages**: For static sites and full-stack apps (like your Remix app)
- **Cloudflare Workers**: For serverless functions only
- **Your portfolio**: Should use Cloudflare Pages, not Workers

## Testing Your Deployment

### Local Testing
Before deploying, test your build locally:
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test the built version
npm run start:static
```

### Post-Deployment Checklist
- [ ] Website loads correctly
- [ ] All images and assets load
- [ ] Navigation works
- [ ] Theme toggle works
- [ ] Contact form works (if configured)
- [ ] Mobile responsiveness
- [ ] Performance is good

## Custom Domain (Optional)

### Vercel
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to Site settings > Domain management
2. Add your custom domain
3. Update DNS records as instructed

## Performance Optimization

Your portfolio already includes:
- ✅ Optimized images and assets
- ✅ Modern CSS with custom properties
- ✅ 3D models with proper loading
- ✅ Responsive design
- ✅ SEO-friendly structur

## Troubleshooting

### Common Issues:
1. **Build fails**: Check Node.js version (needs 18+)
2. **Assets not loading**: Verify build output directory
3. **Theme not persisting**: Check SESSION_SECRET environment variable
4. **Contact form not working**: Configure AWS SES credentials

### Getting Help:
- Check the platform's documentation
- Look at build logs in your deployment dashboard
- Test locally first with `npm run build && npm run start:static`

## Cost

All three platforms offer generous free tiers:
- **Vercel**: 100GB bandwidth, unlimited static sites
- **Netlify**: 100GB bandwidth, 300 build minutes
- **Cloudflare Pages**: Unlimited bandwidth, 500 builds/month

Your portfolio should easily fit within these limits!
