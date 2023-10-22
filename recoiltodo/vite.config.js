import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /* 00. 절대경로 설정하기 */
  resolve: {
    alias: [
      { find: "@components", replacement: "src/components" },
      { find: "@apis", replacement: "src/apis" },
    ],
  },
});
