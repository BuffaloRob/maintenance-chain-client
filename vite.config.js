import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load .env from the project root, keeping the CRA-era REACT_APP_ names.
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'REACT_APP_']);

  // Keep existing `process.env.REACT_APP_*` references in src working.
  // (process.env.NODE_ENV is replaced by Vite automatically.)
  const processEnvDefines = Object.fromEntries(
    Object.entries(env)
      .filter(([key]) => key.startsWith('REACT_APP_'))
      .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
  );

  return {
    plugins: [react()],
    envPrefix: ['VITE_', 'REACT_APP_'],
    define: processEnvDefines,
    // Source files use JSX inside .js files (CRA convention).
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: { '.js': 'jsx' },
      },
    },
    server: {
      port: 3005,
      strictPort: true,
    },
    preview: {
      port: 3005,
    },
    build: {
      outDir: 'build',
    },
  };
});
