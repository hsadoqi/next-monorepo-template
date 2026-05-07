import { mergeConfig } from "vitest/config";
import baseConfig from "./base.js";

export default mergeConfig(baseConfig, {
	test: {
		environment: "jsdom",
		setupFiles: ["@repo/vitest-config/setup-dom"],
	},
});
