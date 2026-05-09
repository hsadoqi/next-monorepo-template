import type { Meta, StoryObj } from "@storybook/react";
import { TextEditorToolbar } from "./text-editor-toolbar";

const meta: Meta<typeof TextEditorToolbar> = {
	title: "Editor/TextEditorToolbar",
	component: TextEditorToolbar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
