import CustomHmr from "./hotReload.js";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [CustomHmr()],
});
