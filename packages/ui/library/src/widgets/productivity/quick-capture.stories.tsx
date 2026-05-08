import type { Meta, StoryObj } from "@storybook/react";
import { QuickCapture } from "./quick-capture";

const meta: Meta<typeof QuickCapture> = {
	title: "Widgets/Input/QuickCapture",
	component: QuickCapture,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <QuickCapture />,
};

export const Interactive: Story = {
	render: () => <QuickCapture />,
};

export const WithPlaceholder: Story = {
	render: () => (
		<div className="space-y-2">
			<p className="text-sm text-gray-600">Quick Capture with custom placeholder:</p>
			<QuickCapture />
		</div>
	),
};

export const MultiLine: Story = {
	render: () => (
		<div className="space-y-2">
			<p className="text-sm text-gray-600">Perfect for capturing quick notes and tasks:</p>
			<QuickCapture />
		</div>
	),
};
