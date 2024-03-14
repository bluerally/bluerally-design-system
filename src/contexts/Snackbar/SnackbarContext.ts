import { SnackbarType } from '@/components';
import { createContext } from 'react';
import { SnackbarData } from '.';

export interface SnackbarContextProps {
  addSnackbar: ({
    variant,
    title,
    content,
    isClose,
  }: {
    variant: SnackbarType;
    title: string;
    content?: string;
    isClose?: boolean;
  }) => void;
  snackbars: SnackbarData[];
}

export const SnackbarContext = createContext<SnackbarContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addSnackbar: () => {},
  snackbars: [],
});
