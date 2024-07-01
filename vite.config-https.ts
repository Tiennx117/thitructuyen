import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import basicSsl from '@vitejs/plugin-basic-ssl'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3002
  },
  plugins: [
    react(),
    tsconfigPaths(), 
    basicSsl()]
})
