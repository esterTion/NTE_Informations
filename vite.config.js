import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
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
    },
  },
})
