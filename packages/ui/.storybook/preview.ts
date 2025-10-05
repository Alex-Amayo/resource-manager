import type { Preview } from "@storybook/react";

import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    playroom: {
      reactElementToJSXStringOptions: {
        sortProps: false,
        showDefaultProps: false,
        filterProps: ['defaultValues'],
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Components', 'ResourceFormGenerator'],
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