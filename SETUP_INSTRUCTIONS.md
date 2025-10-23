# 🎨 GLB Lighting Test - Setup Instructions

## ✅ Project Status: READY TO USE

Your GLB Lighting Test application is now fully set up and ready for deployment!

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Your Assets
- **GLB Model**: Place your 4-piece GLB model at `/public/models/4-piece.glb`
- **HDR Environment**: Place your HDR file at `/public/hdri/studio_small_09_1k.hdr`

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see your lighting test!

### 4. Build for Production
```bash
npm run build
```

## 🎛️ Features Implemented

### ✅ Core Functionality
- [x] GLB model loading with fallback geometry
- [x] Real-time lighting controls via Leva
- [x] OrbitControls for camera manipulation
- [x] Settings export as JSON
- [x] Multiple background types (HDRI, Color, Studio)

### ✅ Lighting Controls
- [x] HDRI Intensity (0-3)
- [x] Directional Light Intensity (0-5) 
- [x] Directional Light Angle (0-360°)
- [x] Ambient Light Color & Intensity
- [x] Environment Rotation (0-360°)

### ✅ Material Controls
- [x] Roughness (0-1)
- [x] Metalness (0-1)
- [x] Real-time material updates

### ✅ Scene Controls
- [x] Background type switching
- [x] Shadow controls
- [x] Shadow opacity

### ✅ Export System
- [x] JSON export with metadata
- [x] Browser download functionality
- [x] Console logging for easy copying

## 📁 File Structure

```
glb-lighting-test/
├── public/
│   ├── models/
│   │   └── 4-piece.glb          # Your GLB model goes here
│   └── hdri/
│       └── studio_small_09_1k.hdr # Your HDR environment goes here
├── src/
│   ├── app/
│   │   ├── page.tsx             # Main application
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Styling
│   └── components/
│       ├── Scene.tsx            # Three.js scene
│       └── ControlsPanel.tsx    # Leva controls
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
└── vercel.json                 # Vercel deployment config
```

## 🚀 Deployment to Vercel

### Option 1: GitHub + Vercel (Recommended)
1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/glb-lighting-test.git
   git push -u origin main
   ```

2. Connect to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy with default settings

### Option 2: Vercel CLI
```bash
npm i -g vercel
vercel
```

## 🎯 Usage Instructions for Charles

1. **Open the Application**: Navigate to your deployed URL
2. **Upload Assets**: Place your GLB model and HDR files in the correct directories
3. **Adjust Lighting**: Use the Leva control panel to modify lighting settings
4. **Test Materials**: Adjust roughness and metalness values
5. **Export Settings**: Click "Export Settings" when you find the perfect configuration
6. **Use in Production**: Import the exported JSON settings into your main configurator

## 🛠️ Customization

### Adding New Controls
Edit `src/components/ControlsPanel.tsx` to add new Leva controls.

### Modifying the Scene
Edit `src/components/Scene.tsx` to adjust lighting setup or add new features.

### Styling Changes
Edit `src/app/globals.css` for visual customizations.

## 🐛 Troubleshooting

### Model Not Loading
- Ensure GLB file is at `/public/models/4-piece.glb`
- Check browser console for errors
- Verify file format (GLB recommended over GLTF)

### Controls Not Working
- Check browser console for JavaScript errors
- Ensure all dependencies are installed
- Try refreshing the page

### Build Errors
- Run `npm run build` to check for TypeScript errors
- Ensure all imports are correct
- Check Node.js version (18+ recommended)

## 📊 Performance Tips

1. **Optimize GLB Files**: Use tools like gltf-pipeline to compress models
2. **Use 1K HDR Files**: For faster loading in testing environment
3. **Monitor Bundle Size**: Run `npm run build` to check build size

## 🎉 Success!

Your GLB Lighting Test is now ready! Charles can:
- Test different lighting configurations in real-time
- Export perfect settings for production use
- Iterate quickly on material and lighting combinations

**Next Steps:**
1. Deploy to Vercel
2. Share the URL with Charles
3. Add your GLB model and HDR files
4. Start testing lighting configurations!

---

**Need Help?** Check the README.md and DEPLOYMENT.md files for detailed information.
