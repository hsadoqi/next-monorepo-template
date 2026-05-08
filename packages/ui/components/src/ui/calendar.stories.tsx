import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar } from "./calendar";

const meta = {
	title: "UI/Calendar",
	component: Calendar,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	argTypes: {
		mode: {
			control: "select",
			options: ["single", "multiple", "range"],
			description: "Selection mode",
		},
	},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	render: () => {
		const [date, setDate] = useState<Date | undefined>(new Date());
		return <Calendar mode="single" selected={date} onSelect={setDate} />;
	},
};

export const Multiple: Story = {
	render: () => {
		const [dates, setDates] = useState<Date[] | undefined>([new Date()]);
		return <Calendar mode="multiple" selected={dates} onSelect={setDates} />;
	},
};

// ─── With disabled dates ─────────────────────────────────────────────────────

export const WithDisabledDates: Story = {
	render: () => {
		const [date, setDate] = useState<Date | undefined>(new Date());
		return (
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
			/>
		);
	},
};
