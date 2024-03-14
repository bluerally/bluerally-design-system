import { Story } from '@storybook/react';
import React from 'react';
import { Button } from '@/components/Button';
import { Snackbar } from '@/components';
import { useSnackbar } from '@/hooks/useSnackbar';

export default {
  title: 'components/Snackbar',
  component: Snackbar,
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
  title = '타이틀',
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
          if (variant === 'info') {
            snackbar.info({ title, content, isClose });
          } else if (variant === 'success') {
            snackbar.success({ title, content, isClose });
          } else if (variant === 'warning') {
            snackbar.warning({ title, content, isClose });
          } else if (variant === 'error') {
            snackbar.error({ title, content, isClose });
          } else {
            snackbar.info({ title, content, isClose });
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
      <CallButton {...rest} variant="info" buttonText="Info" />
      <CallButton {...rest} variant="success" buttonText="Success" />
      <CallButton {...rest} variant="warning" buttonText="Warning" />
      <CallButton {...rest} variant="error" buttonText="Error" />
    </>
  );
};

export const Default = Template.bind({});
