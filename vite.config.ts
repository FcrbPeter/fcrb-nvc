import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { execSync } from 'child_process'

const getCommitHash = () => {
  try {
    return execSync('git rev-parse --short=10 HEAD').toString().trim();
  } catch {
    return 'unknown';
  }
};

const getGitTag = () => {
  try {
    return execSync('git describe --tags --abbrev=0').toString().trim();
  } catch {
    return `v${process.env.npm_package_version || '0.0.0'}`;
  }
};

const getEnvironmentSuffix = () => {
  if (process.env.NODE_ENV === 'production') {
    return '';
  }

  return `-${process.env.NODE_ENV}`;
};

const APP_VERSION = `${getGitTag()}-${getCommitHash()}${getEnvironmentSuffix()}`;

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
