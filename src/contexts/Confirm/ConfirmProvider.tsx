import { Confirm } from '@/components';
import React, { createContext, useState } from 'react';

export interface ConfirmContextProps {
  error: (options: {
    title: string;
    content: string;
    onConfirm?: () => void;
  }) => void;
  info: (options: {
    title: string;
    content: string;
    onConfirm?: () => void;
  }) => void;
}

export const ConfirmContext = createContext<ConfirmContextProps | undefined>(
  undefined,
);

export const ConfirmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [confirmState, setConfirmState] = useState({
    open: false,
    title: '',
    content: '',
    onConfirm: () => {},
  });

  const showConfirm = (
    type: string,
    {
      title,
      content,
      onConfirm,
    }: { title: string; content: string; onConfirm?: () => void },
  ) => {
    setConfirmState({
      open: true,
      title,
      content,
      onConfirm: onConfirm || (() => {}),
    });
  };

  const closeConfirm = () => {
    setConfirmState({ ...confirmState, open: false });
  };

  const error = ({
    title,
    content,
    onConfirm,
  }: {
    title: string;
    content: string;
    onConfirm?: () => void;
  }) => showConfirm('error', { title, content, onConfirm });

  const info = ({
    title,
    content,
    onConfirm,
  }: {
    title: string;
    content: string;
    onConfirm?: () => void;
  }) => showConfirm('info', { title, content, onConfirm });

  return (
    <ConfirmContext.Provider value={{ error, info }}>
      {children}
      <Confirm
        open={confirmState.open}
        title={confirmState.title}
        description={confirmState.content}
        onCancel={closeConfirm}
        onConfirm={() => {
          confirmState.onConfirm && confirmState.onConfirm();
          closeConfirm();
        }}
      />
    </ConfirmContext.Provider>
  );
};
