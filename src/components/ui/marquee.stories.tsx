import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Marquee } from "./marquee";

const meta: Meta<typeof Marquee> = {
  title: "UI/Marquee",
  component: Marquee,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    reverse: { control: "boolean" },
    pauseOnHover: { control: "boolean" },
    duration: { control: "text" },
  },
  args: { duration: "20s", pauseOnHover: true },
};

export default meta;
type Story = StoryObj<typeof Marquee>;

const Item = ({ label }: { label: string }) => (
  <span className="rounded-lg border border-ink-200 bg-white px-6 py-3 text-sm font-medium text-ink-900">
    {label}
  </span>
);

export const Default: Story = {
  render: (args) => (
    <div className="py-8">
      <Marquee {...args}>
        {["IBM", "AWS", "Dell", "Veeam", "Lenovo", "Microsoft"].map((n) => (
          <Item key={n} label={n} />
        ))}
      </Marquee>
    </div>
  ),
};

export const Reverso: Story = {
  args: { reverse: true },
  render: Default.render,
};
