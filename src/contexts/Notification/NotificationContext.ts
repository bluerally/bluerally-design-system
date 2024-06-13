import { NotificationBaseProps } from './NotificationProvider';
import { createContext } from 'react';

export interface NotificationContextProps {
  addNotification: ({
    type,
    title,
    content,
    onClose,
    onConfirm,
    cancelButtonText,
    confirmButtonText,
  }: NotificationBaseProps) => void;
  notification: NotificationBaseProps | null;
}

export const NotificationContext = createContext<NotificationContextProps>({
  addNotification: () => {},
  notification: null,
});
