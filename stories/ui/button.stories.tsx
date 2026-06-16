import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "dark"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Fale com um especialista",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Ver catálogo" },
  // Variante translúcida, pensada para seções dark.
  parameters: { backgrounds: { default: "dark" } },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ação secundária" },
};

export const Dark: Story = {
  args: { variant: "dark", children: "Contraste em fundo claro" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">
        Pequeno
      </Button>
      <Button {...args} size="md">
        Médio
      </Button>
      <Button {...args} size="lg">
        Grande
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, children: "Indisponível" },
};
