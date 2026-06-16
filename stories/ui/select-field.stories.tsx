import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { SelectField, type SelectOption } from "@/components/ui/select-field";

const options: SelectOption[] = [
  { value: "ibm", label: "IBM" },
  { value: "veeam", label: "Veeam" },
  { value: "dell", label: "Dell Technologies" },
  { value: "lenovo", label: "Lenovo" },
];

const meta = {
  title: "UI/SelectField",
  component: SelectField,
  tags: ["autodocs"],
  // Componente controlado: encapsulado num wrapper com estado para o preview.
  render: (args) => {
    const ControlledSelect = () => {
      const [value, setValue] = useState(args.value ?? "");
      return (
        <div className="w-[260px]">
          <SelectField {...args} value={value} onChange={setValue} />
        </div>
      );
    };
    return <ControlledSelect />;
  },
  args: {
    value: "",
    options,
    placeholder: "Selecione o fabricante",
    onChange: () => {},
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComValorSelecionado: Story = {
  args: { value: "veeam" },
};

export const Invalido: Story = {
  args: { invalid: true },
};

export const Desabilitado: Story = {
  args: { disabled: true },
};
