import { Toast } from '@/components';
import { Button } from '@/components/Button';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'components/Toast',
  component: Toast,
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
    },
  },
};
const CallButton = ({
  variant = 'info',
  buttonText = '누르세요',
  content = '안내 메세지를 입력하는 곳입니다.',
  isClose,
}: {
  variant?: string;
  title?: string;
  content?: string;
  buttonText?: string;
  isClose?: boolean;
}) => {
  const snackbar = useSnackbar();
  return (
    <div
      style={{
        display: 'inline-block',
        marginRight: 10,
      }}
    >
      <Button
        onClick={() => {
          switch (variant) {
            case 'success':
              snackbar.success({ content, isClose });
              break;
            case 'warning':
              snackbar.warning({ content, isClose });
              break;
            default:
              snackbar.success({ content, isClose });
              break;
          }
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};
const Template: Story = ({
  ...rest
}: {
  title?: string;
  content?: string;
  isClose?: boolean;
}) => {
  return (
    <>
      <CallButton {...rest} variant="success" buttonText="Success" />
      <CallButton {...rest} variant="warning" buttonText="Warning" />
    </>
  );
};
export const Default = Template.bind({});
