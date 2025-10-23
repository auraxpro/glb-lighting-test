/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Handle GLB/GLTF files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
      },
    });
    
    // Handle HDR files
    config.module.rules.push({
      test: /\.(hdr)$/,
      use: {
        loader: 'url-loader',
      },
    });

    return config;
  },
}

module.exports = nextConfig
