import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Server, ShieldCheck, Cloud } from "lucide-react";
import { BentoGrid, BentoCard } from "./bento-grid";

const meta: Meta<typeof BentoGrid> = {
  title: "UI/BentoGrid",
  component: BentoGrid,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BentoGrid>;

const bg = (
  <div className="absolute inset-0 bg-gradient-to-br from-ink-50 to-white" />
);

export const Default: Story = {
  render: () => (
    <div className="p-8">
      <BentoGrid className="auto-rows-[16rem]">
        <BentoCard
          name="Infraestrutura"
          className="col-span-3 lg:col-span-1"
          background={bg}
          Icon={Server}
          description="Servidores e redes resilientes para missão crítica."
          href="#"
          cta="Saiba mais"
        />
        <BentoCard
          name="Segurança"
          className="col-span-3 lg:col-span-1"
          background={bg}
          Icon={ShieldCheck}
          description="Proteção de dados, endpoints e conformidade."
          href="#"
          cta="Saiba mais"
        />
        <BentoCard
          name="Cloud"
          className="col-span-3 lg:col-span-1"
          background={bg}
          Icon={Cloud}
          description="Migração, sustentação e FinOps em nuvem híbrida."
          href="#"
          cta="Saiba mais"
        />
      </BentoGrid>
    </div>
  ),
};
