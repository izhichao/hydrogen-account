import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import components from 'unplugin-vue-components/vite';
import { VarletUIResolver } from 'unplugin-vue-components/resolvers';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    components({
      resolvers: [VarletUIResolver()]
    })
  ],
  server: {
    host: '0.0.0.0'
  },
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '*': path.resolve('')
    }
  }
});
