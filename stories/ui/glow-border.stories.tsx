import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { handleGlowMove, GlowBorderOverlay } from "@/components/ui/glow-border";

const meta = {
  title: "UI/GlowBorder",
  component: GlowBorderOverlay,
  tags: ["autodocs"],
} satisfies Meta<typeof GlowBorderOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

// O brilho segue o cursor: passe o mouse sobre o card.
export const NoCard: Story = {
  render: () => (
    <div
      className="group relative h-48 w-72 rounded-xl border border-ink-200 bg-white p-6"
      onMouseMove={handleGlowMove}
    >
      <GlowBorderOverlay glowColor="#0E66FF" glowSize={220} />
      <p className="text-sm text-ink-500">
        Passe o mouse aqui para ver a borda brilhar na posição do cursor.
      </p>
    </div>
  ),
};
