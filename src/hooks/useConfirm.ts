import { ConfirmContext, ConfirmContextProps } from '@/contexts/Confirm';
import { useContext } from 'react';

export const useConfirm = (): ConfirmContextProps => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }

  const { error: originalError, info: originalInfo } = context;

  const error = ({
    title,
    content,
    onConfirm,
  }: {
    title: string;
    content: string;
    onConfirm?: () => void;
  }) => originalError({ title, content, onConfirm });

  const info = ({
    title,
    content,
    onConfirm,
  }: {
    title: string;
    content: string;
    onConfirm?: () => void;
  }) => originalInfo({ title, content, onConfirm });

  return { error, info };
};
