import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'components/*': path.resolve(__dirname, './src/components'),
      'config/*': path.resolve(__dirname, './src/config'),
      'providers/*': path.resolve(__dirname, './src/providers'),
    },
  },
  plugins: [react()],
});
