import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - generates stats.html after build
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: './dist/stats.html',
    }),
  ],
  base: process.env.GITHUB_ACTIONS ? '/animated-portfolio/' : '/',
  build: {
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    // Enable minification
    minify: 'esbuild', // Use esbuild for faster builds
  },
})
