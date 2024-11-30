import { SnackbarContext, SnackbarContextProps } from '.';
import { Toast, ToastType } from '@/components';
import styled from '@emotion/styled';
import { useState } from 'react';

export interface SnackbarData {
  uniqueId: number;
  variant: ToastType;
  content?: string;
  isClose?: boolean;
}

export interface SnackbarProviderProps {
  content?: string;
  isClose?: boolean;
}

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarData[]>([]);

  const handleExit = (id: number) => {
    setSnackbars((prev) => [...prev.filter(({ uniqueId }) => uniqueId !== id)]);
  };

  const handleOpen: SnackbarContextProps['addSnackbar'] = ({
    variant,
    content,
    isClose,
  }) => {
    const randomValue = new Uint32Array(1);
    self.crypto.getRandomValues(randomValue);

    setSnackbars((prev) => [
      ...prev,
      {
        uniqueId: randomValue[0],
        variant,
        content,
        isClose,
      },
    ]);
  };

  const contextValue: SnackbarContextProps = {
    addSnackbar: handleOpen,
    snackbars,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      <SnackbarArea>
        {snackbars.map(({ uniqueId, ...rest }) => (
          <Toast
            key={uniqueId}
            uniqueId={uniqueId}
            onExit={handleExit}
            {...rest}
          />
        ))}
      </SnackbarArea>
      {children}
    </SnackbarContext.Provider>
  );
};

const SnackbarArea = styled('div')`
  position: fixed;
  max-width: 600px;
  top: 10px;
  right: 10px;
  z-index: 3000;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  align-items: flex-end;
`;
