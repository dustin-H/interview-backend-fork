import { defineConfig } from "tsup";

const tsupConfig = defineConfig({
  entry: ["trpc-export/index.ts"],
  outDir: "trpc-export/types",
  format: ["esm"],
  clean: true,
  dts: true,
  tsconfig: "tsconfig.json",
});

export default tsupConfig;
