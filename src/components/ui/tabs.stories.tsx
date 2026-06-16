import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="visao" className="w-[360px]">
      <TabsList>
        <TabsTrigger value="visao">Visão geral</TabsTrigger>
        <TabsTrigger value="specs">Especificações</TabsTrigger>
        <TabsTrigger value="casos">Casos de uso</TabsTrigger>
      </TabsList>
      <TabsContent value="visao" className="mt-4 text-sm text-ink-500">
        Resumo da solução e principais diferenciais.
      </TabsContent>
      <TabsContent value="specs" className="mt-4 text-sm text-ink-500">
        Detalhes técnicos e requisitos.
      </TabsContent>
      <TabsContent value="casos" className="mt-4 text-sm text-ink-500">
        Cenários reais de aplicação.
      </TabsContent>
    </Tabs>
  ),
};
