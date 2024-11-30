import { Button } from '@/components';
import {
  Confirm as ConfirmComponent,
  ConfirmProps,
} from '@/components/Confirm/Confirm';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

export default {
  title: 'components/Confirm',
  component: ConfirmComponent,
  argTypes: {},
};

const Template: Story<ConfirmProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConfirmComponent
        open={open}
        title="게시물 삭제"
        description="게시물을 정말 삭제하시겠습니까?"
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
      <div
        style={{
          height: '100vh',
        }}
      >
        <Button
          onClick={() => setOpen((prev) => !prev)}
          style={{
            marginTop: '1000px',
          }}
        >
          버튼
        </Button>
      </div>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {};
