import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import typescript2 from 'rollup-plugin-typescript2'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), 
    typescript2({
      check: false,
      include: ['src/modules/messages-list/index.types.ts', 'src/components/*.vue'],
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        }
      },
      exclude: [
        'vite.config.ts'
      ],
    })
  ],
  build: {
    lib: {
      // eslint-disable-next-line no-undef
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      name: 'vue-messages',
      fileName: (format) => (format === 'es' ? 'index.js': 'index.cjs'),
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },

  server: {
    port: 8080,
    host: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/assets/colors.scss";
        `,
      },
    },
  },
})