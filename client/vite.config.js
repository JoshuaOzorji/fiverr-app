import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [react()],

	build: {
		rollupOptions: {
			output: {
				// ... other output options
			},
		},
	},

	esbuild: {
		jsxFactory: "React.createElement",
		jsxFragment: "React.Fragment",
	},

	// Use the custom Babel configuration
	// This tells Vite to use Babel for transpiling JavaScript files
	optimizeDeps: {
		include: ["@babel/preset-react"],
	},
});
