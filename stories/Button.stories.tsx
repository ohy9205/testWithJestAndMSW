import { Meta, StoryObj } from "@storybook/react";
import Button from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "MathOn/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>; // Tree컴포 타입으로 지정

export const Basic: Story = {
  args: {
    text: "text",
    onClick: () => {},
  },
};
