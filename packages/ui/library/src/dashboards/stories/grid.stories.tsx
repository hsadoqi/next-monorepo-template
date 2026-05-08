import type { Meta, StoryObj } from "@storybook/react";
import Grid from "../grid/grid";

const meta: Meta<typeof Grid> = {
	title: "Dashboard/Grid",
	component: Grid,
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
	render: () => <Grid />,
};
