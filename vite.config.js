import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // GitHub Pages 相對路徑支援
  server: {
    host: '0.0.0.0', // 允許外部設備訪問
    port: 3000,
    https: false, // Quest 2 需要 HTTPS 才能使用 WebXR，但開發時可以用 HTTP
    open: true
  },
  build: {
    target: 'es2015', // 確保相容性
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'aframe': ['aframe']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['aframe']
  }
})
