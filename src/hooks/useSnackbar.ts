import { ToastType } from '..';
import { SnackbarContext, SnackbarProviderProps } from '@/contexts/Snackbar';
import { useContext } from 'react';

const useSnackbar = () => {
  const snackbar = useContext(SnackbarContext);

  const success = ({ content, isClose }: SnackbarProviderProps) => {
    toast({ variant: 'success', content, isClose });
  };

  const warning = ({ content, isClose }: SnackbarProviderProps) => {
    toast({ variant: 'warning', content, isClose });
  };

  const toast = ({
    ...rest
  }: {
    variant: ToastType;
    content?: string;
    isClose?: boolean;
  }) => {
    snackbar.addSnackbar({
      ...rest,
    });
  };

  return {
    success,
    warning,
  };
};

export { useSnackbar };
