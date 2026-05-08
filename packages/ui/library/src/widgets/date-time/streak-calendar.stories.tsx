import type { Meta, StoryObj } from "@storybook/react";
import { StreakCalendar } from "./streak-calendar";

const meta: Meta<typeof StreakCalendar> = {
	title: "Widgets/Time Management/StreakCalendar",
	component: StreakCalendar,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const generateStreakData = (pattern: string) => {
	return Array.from({ length: 42 }, (_, i) => {
		const week = Math.floor(i / 7);
		const _dayOfWeek = i % 7;
		switch (pattern) {
			case "perfect":
				return 1;
			case "mostly":
				return Math.random() > 0.2 ? 1 : 0;
			case "sporadic":
				return Math.random() > 0.7 ? 1 : 0;
			case "improving":
				return week > 2 ? (Math.random() > 0.3 ? 1 : 0) : Math.random() > 0.8 ? 1 : 0;
			default:
				return Math.random() > 0.5 ? 1 : 0;
		}
	});
};

export const Default: Story = {
	args: {
		currentStreak: 12,
	},
};

export const PerfectStreak: Story = {
	args: {
		days: generateStreakData("perfect"),
		currentStreak: 42,
	},
};

export const MostlyConsistent: Story = {
	args: {
		days: generateStreakData("mostly"),
		currentStreak: 38,
	},
};

export const Sporadic: Story = {
	args: {
		days: generateStreakData("sporadic"),
		currentStreak: 3,
	},
};

export const Improving: Story = {
	args: {
		days: generateStreakData("improving"),
		currentStreak: 18,
	},
};

export const NoStreak: Story = {
	args: {
		days: generateStreakData("none"),
		currentStreak: 0,
	},
};
