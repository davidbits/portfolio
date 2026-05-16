import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeMermaid from "./src/lib/rehypeMermaid.mjs";

const syntaxHighlight = {
	type: "shiki",
	excludeLangs: ["math", "mermaid"],
};

export default defineConfig({
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex, rehypeMermaid],
		syntaxHighlight,
	},
	integrations: [mdx()],
	vite: {
		esbuild: {
			jsx: "automatic",
			jsxImportSource: "react",
		},
		plugins: [tailwindcss()],
	},
});
