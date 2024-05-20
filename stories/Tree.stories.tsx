import { Meta, StoryObj } from "@storybook/react";
import Tree from "../components/Tree";

const meta: Meta<typeof Tree> = {
  title: "MathOn/Category",
  component: Tree,
};

export default meta;

type Story = StoryObj<typeof Tree>; // Tree컴포 타입으로 지정

export const Basic: Story = {
  args: {
    bgColor: undefined,
  },
};

export const Blue: Story = {
  args: {
    bgColor: "skyblue",
  },
};

export const Orange: Story = {
  args: {
    bgColor: "orange",
  },
};
