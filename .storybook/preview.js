import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyle, theme } from '../src/style/index';
import { SnackbarProvider } from '@/contexts/Snackbar';
import { ConfirmProvider } from '@/contexts/Confirm'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: (a, b) => a[0].localeCompare(b[0]),
  },
  viewMode: 'docs',
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <SnackbarProvider>
          <Global styles={GlobalStyle} />
          <Story />
        </SnackbarProvider>
      </ConfirmProvider>
    </ThemeProvider>
  ),
];
