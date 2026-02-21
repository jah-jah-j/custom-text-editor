import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker';

export default defineConfig({
  base: '/custom-text-editor/',
    plugins: [
        checker({
            typescript: true,
        }),
        react()
    ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
