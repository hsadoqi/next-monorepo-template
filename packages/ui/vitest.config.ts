import baseConfig from "@repo/vitest-config/base";
import { mergeConfig } from "vitest/config";

export default mergeConfig(baseConfig, {
	test: {
		environment: "node",
	},
});
