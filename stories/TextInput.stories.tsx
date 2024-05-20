import { Meta, StoryObj } from "@storybook/react";
import TextInput from "../components/TextInput";

const meta: Meta<typeof TextInput> = {
  title: "MathOn/TextInput",
  component: TextInput,
};

export default meta;

type Story = StoryObj<typeof TextInput>; // Tree컴포 타입으로 지정

export const Basic: Story = {
  args: {},
};
