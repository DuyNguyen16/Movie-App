import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // This ensures Vite outputs the build to the 'dist' folder
  },
  resolve: {
    alias: {
      '@': '/src', // You can set aliases for easier imports (optional)
    },
  },
});
