import { NotificationBaseProps, NotificationContext } from '@/contexts';
import { useContext } from 'react';

const useNotification = () => {
  const notification = useContext(NotificationContext);

  const alert = ({ ...rest }: NotificationBaseProps) => {
    notification.addNotification({
      ...rest,
    });
  };

  return {
    alert,
  };
};

export { useNotification };
