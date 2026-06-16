import type { Preview } from '@storybook/nextjs-vite'
// Tokens do design system + diretivas do Tailwind, para os componentes
// renderizarem com os estilos reais (cores brand/ink, utilitárias, etc.).
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;