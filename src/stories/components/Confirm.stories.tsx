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
      />
      <Button onClick={() => setOpen((prev) => !prev)}>버튼</Button>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {};
