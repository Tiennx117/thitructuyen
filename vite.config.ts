import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({mode})=>({
  server: {
    port: 3000
  },
  // esbuild: {
  //   drop: mode !== 'development' ? ['console', 'debugger'] : [],
  // },
  plugins: [
    react(),
    tsconfigPaths(), 
  ]
}))
