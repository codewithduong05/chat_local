import { defineConfig ,loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, ".."), "");

  return defineConfig({
    plugins: [react({
        babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    })],
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
    },
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
  });
};
