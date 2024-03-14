import { useContext } from 'react';

import { SnackbarContext, SnackbarProviderProps } from '@/contexts/Snackbar';

import { SnackbarType } from '..';

const useSnackbar = () => {
  const snackbar = useContext(SnackbarContext);

  const info = ({ title = '', content, isClose }: SnackbarProviderProps) => {
    toast({ variant: 'info', title, content, isClose });
  };

  const success = ({ title = '', content, isClose }: SnackbarProviderProps) => {
    toast({ variant: 'success', title, content, isClose });
  };

  const warning = ({ title = '', content, isClose }: SnackbarProviderProps) => {
    toast({ variant: 'warning', title, content, isClose });
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
    success,
    warning,
    error,
  };
};

export { useSnackbar };
