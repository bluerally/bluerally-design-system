import { SnackbarData } from '.';
import { ToastType } from '@/components';
import { createContext } from 'react';

export interface SnackbarContextProps {
  addSnackbar: ({
    variant,
    content,
    isClose,
  }: {
    variant: ToastType;
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
