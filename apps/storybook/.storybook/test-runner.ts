import type { TestRunnerConfig } from "@storybook/test-runner";
import { getStoryContext } from "@storybook/test-runner";
import { checkA11y, configureAxe, injectAxe } from "axe-playwright";

const config: TestRunnerConfig = {
	async preVisit(page) {
		await injectAxe(page);
	},
	async postVisit(page, context) {
		let storyContext: Awaited<ReturnType<typeof getStoryContext>>;

		try {
			storyContext = await getStoryContext(page, context);
		} catch (error) {
			if (error instanceof Error && error.message.includes("__getContext is not a function")) {
				return;
			}

			throw error;
		}

		const hasA11yTag = Array.isArray(storyContext.tags) && storyContext.tags.includes("a11y");
		const isA11yEnabled = storyContext.parameters?.a11y?.disable !== true && hasA11yTag;

		// Keep smoke tests broad and make full axe checks explicit per story via `tags: ["a11y"]`.
		if (!isA11yEnabled) {
			return;
		}

		await configureAxe(page, {
			rules: storyContext.parameters?.a11y?.config?.rules,
		});

		const runA11yCheck = async () => {
			await checkA11y(page, "#storybook-root", {
				detailedReport: true,
				detailedReportOptions: {
					html: true,
				},
				axeOptions: storyContext.parameters?.a11y?.options,
			});
		};

		try {
			await runA11yCheck();
		} catch (error) {
			if (error instanceof Error && error.message.includes("Axe is already running")) {
				await page.waitForTimeout(100);
				await runA11yCheck();
				return;
			}

			throw error;
		}
	},
};

export default config;
