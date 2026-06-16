import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NumberTicker } from "@/components/ui/number-ticker";

const meta = {
  title: "UI/NumberTicker",
  component: NumberTicker,
  tags: ["autodocs"],
  args: { value: 2003 },
  // Fonte maior para visualizar a contagem com clareza.
  decorators: [
    (Story) => (
      <div className="text-5xl font-bold text-ink-950">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NumberTicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComStartValue: Story = {
  args: { value: 500, startValue: 100 },
};

export const ComDecimais: Story = {
  args: { value: 99.9, decimalPlaces: 1 },
};
