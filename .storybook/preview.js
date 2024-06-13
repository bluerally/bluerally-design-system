import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyle, theme } from '../src/style/index';
import { NotificationProvider, SnackbarProvider } from '../src/contexts';

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
      <NotificationProvider>
        <SnackbarProvider>
          <Global styles={GlobalStyle} />
          <Story />
        </SnackbarProvider>
      </NotificationProvider>
    </ThemeProvider>
  ),
];
