# GLB Lighting Test

Interactive lighting test application for GLB models with real-time controls built with Next.js, Three.js, and React Three Fiber.

## 🚀 Features

- **Real-time Lighting Controls**: Adjust HDRI intensity, directional light angle, ambient light color, and environment rotation
- **Material Properties**: Control roughness and metalness in real-time
- **Multiple Backgrounds**: Switch between HDRI, solid color, or studio preset backgrounds
- **Interactive Camera**: OrbitControls for rotation, zoom, and pan
- **Settings Export**: Export perfect lighting settings as JSON for production use
- **Responsive UI**: Leva control panel with organized folders

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd glb-lighting-test
```

2. Install dependencies:
```bash
npm install
```

3. Add your assets:
   - Place your GLB model at `/public/models/4-piece.glb`
   - Place your HDR environment at `/public/hdri/studio_small_09_1k.hdr`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Usage

1. **Load Your Model**: Place your GLB file in `/public/models/4-piece.glb`
2. **Adjust Lighting**: Use the Leva control panel to modify lighting settings
3. **Test Materials**: Adjust roughness and metalness values
4. **Change Background**: Switch between HDRI, color, or studio backgrounds
5. **Export Settings**: Click "Export Settings" to download your configuration as JSON

## 🏗️ Project Structure

```
glb-lighting-test/
├── public/
│   ├── models/          # Place your GLB models here
│   └── hdri/           # Place your HDR environments here
├── src/
│   ├── app/
│   │   ├── page.tsx    # Main application page
│   │   ├── layout.tsx  # Root layout
│   │   └── globals.css # Global styles
│   └── components/
│       ├── Scene.tsx   # Three.js scene with lighting
│       └── ControlsPanel.tsx # Leva controls
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with these settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Manual Build

```bash
npm run build
npm start
```

## 🎛️ Controls

### Environment & Lighting
- **HDRI Intensity**: Controls environment lighting strength (0-3)
- **Environment Rotation**: Rotates the HDRI environment (0-360°)
- **Directional Light Intensity**: Main light source strength (0-5)
- **Directional Light Angle**: Position of the main light (0-360°)
- **Ambient Light Color**: Color of ambient lighting
- **Ambient Light Intensity**: Ambient light strength (0-2)

### Material Properties
- **Roughness**: Surface roughness (0-1, 0=mirror, 1=matte)
- **Metalness**: Metallic properties (0-1, 0=dielectric, 1=metallic)

### Background & Scene
- **Background Type**: Choose between HDRI, solid color, or studio preset
- **Background Color**: Custom background color
- **Enable Shadows**: Toggle contact shadows
- **Shadow Opacity**: Shadow transparency (0-1)

## 📤 Exporting Settings

When you find the perfect lighting setup:

1. Click "Export Settings" button
2. A JSON file will be downloaded with all current settings
3. Settings are also logged to the browser console
4. Use these settings in your production configurator

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D Engine**: Three.js + React Three Fiber
- **UI Controls**: Leva
- **Language**: TypeScript
- **Styling**: CSS Modules + Global CSS

## 📝 Notes

- If no GLB model is found, the app will display fallback geometry (cube, cylinder, sphere)
- The app is optimized for modern browsers with WebGL support
- All lighting settings are reactive and update in real-time
- Settings export includes metadata for easy integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own lighting tests!
