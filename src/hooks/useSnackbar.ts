import { SnackbarType } from '..';
import { SnackbarContext, SnackbarProviderProps } from '@/contexts/Snackbar';
import { useContext } from 'react';

const useSnackbar = () => {
  const snackbar = useContext(SnackbarContext);

  const info = ({ title = '', content, isClose }: SnackbarProviderProps) => {
    toast({ variant: 'info', title, content, isClose });
  };

  const error = ({ title = '', content, isClose }: SnackbarProviderProps) => {
    toast({ variant: 'error', title, content, isClose });
  };

  const toast = ({
    ...rest
  }: {
    variant: SnackbarType;
    title: string;
    content?: string;
    isClose?: boolean;
  }) => {
    snackbar.addSnackbar({
      ...rest,
    });
  };

  return {
    info,
    error,
  };
};

export { useSnackbar };
