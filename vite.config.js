import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      filter: /\.(js|mjs|json|css|html|map)$/i,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/nte_info_cn.json': {
        target: 'https://serverlist-yh.wmupd.com/notice_test5/zh-CN/Notice/9_2/Notice.json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nte_info_cn\.json/, ''),
      },
      '/nte_info_global.json': {
        target: 'https://plist-yhglo.perfectworld.com/notice_test5/zh-Hans/Notice/0/Notice.json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^.+/, ''),
      },
    },
  },
  build: {
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return 'vendor'
    //       }
    //     },
    //   },
    // },
    minify: true,
    sourcemap: true,
  },
});
