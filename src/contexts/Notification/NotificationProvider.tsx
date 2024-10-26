import {
  NotificationContext,
  NotificationContextProps,
} from './NotificationContext';
import { Confirm } from '@/components/Confirm';
import { useState } from 'react';

export type NotificationType = 'alert' | 'confirm' | 'error';

export interface NotificationBaseProps {
  type: NotificationType;
  title?: string;
  content?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  cancelButtonText?: string;
  confirmButtonText?: string;
  dimmed?: boolean;
}

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] =
    useState<NotificationBaseProps | null>(null);

  const handleExit = () => {
    if (notification?.onClose) {
      notification.onClose();
    }
    setNotification(null);
  };

  const handleOpen: NotificationContextProps['addNotification'] = ({
    type,
    title,
    content,
    onClose,
    onConfirm,
    cancelButtonText = '취소',
    confirmButtonText = '확인',
    dimmed = true,
  }) => {
    setNotification({
      type,
      title,
      content,
      onClose,
      onConfirm,
      cancelButtonText: type === 'alert' ? undefined : cancelButtonText,
      confirmButtonText,
      dimmed,
    });
  };

  const contextValue: NotificationContextProps = {
    addNotification: handleOpen,
    notification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {notification && (
        <Confirm
          open={!!notification}
          title={notification.title ?? ''}
          description={notification.content}
          confirmStatus={notification.type === 'error' ? 'error' : 'default'}
          onClose={handleExit}
          onCancel={notification.type !== 'alert' ? handleExit : undefined}
          onConfirm={() => {
            if (notification.onConfirm) {
              notification.onConfirm();
            }
            handleExit();
          }}
          cancelText={
            notification.type !== 'alert'
              ? notification.cancelButtonText
              : undefined
          }
          confirmText={notification.confirmButtonText}
          dimmed={notification.dimmed}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
};
