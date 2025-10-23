# 🚀 Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Your GLB model and HDR files ready

### Step-by-Step Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: GLB Lighting Test"
   git branch -M main
   git remote add origin https://github.com/yourusername/glb-lighting-test.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your `glb-lighting-test` repository

3. **Configure Build Settings**
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
   - **Node.js Version**: 18.x

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be available at: `https://glb-lighting-test-[random].vercel.app`

5. **Add Your Assets**
   - Upload your GLB model to `/public/models/4-piece.glb`
   - Upload your HDR file to `/public/hdri/studio_small_09_1k.hdr`
   - Commit and push changes to trigger automatic redeployment

### Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Alternative Deployment Options

### Netlify
1. Build the project: `npm run build`
2. Upload the `.next` folder to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Self-Hosted
1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Configure reverse proxy (nginx/Apache)
4. Set up SSL certificate

## Environment Variables

If you need to configure any environment variables:

1. In Vercel dashboard, go to "Settings" → "Environment Variables"
2. Add variables like:
   - `NEXT_PUBLIC_MODEL_PATH` (if you want configurable model path)
   - `NEXT_PUBLIC_HDRI_PATH` (if you want configurable HDRI path)

## Performance Optimization

### Asset Optimization
- Compress GLB files using [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline)
- Use 1K HDR files for faster loading
- Enable Vercel's automatic image optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Check for unused dependencies
npx depcheck
```

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (use 18.x)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **3D Scene Not Loading**
   - Ensure WebGL is supported in target browsers
   - Check browser console for errors
   - Verify asset paths are correct

3. **Large Bundle Size**
   - Use dynamic imports for Three.js components
   - Optimize GLB models before deployment
   - Consider code splitting

### Debug Mode
Add these environment variables for debugging:
```
NEXT_PUBLIC_DEBUG=true
NODE_ENV=development
```

## Monitoring

### Performance Monitoring
- Use Vercel Analytics for performance insights
- Monitor Core Web Vitals
- Check loading times for 3D assets

### Error Tracking
Consider adding error tracking:
- Sentry
- LogRocket
- Vercel's built-in error tracking

## Security

### Asset Security
- GLB and HDR files are publicly accessible
- Consider authentication if models are sensitive
- Use environment variables for sensitive configuration

### CORS Configuration
If loading assets from external sources, configure CORS in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
        ],
      },
    ]
  },
}
```

## Scaling

### CDN Configuration
- Vercel automatically provides CDN
- For custom CDN, configure asset paths in environment variables

### Multiple Environments
Set up staging and production environments:
1. Create separate branches (staging, production)
2. Configure different Vercel projects
3. Use environment-specific configurations

---

🎉 **Your GLB Lighting Test is now live!**

Share the URL with Charles to start testing lighting configurations.
