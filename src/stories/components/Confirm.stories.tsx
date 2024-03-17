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
        title="회원 탈퇴"
        description="사용 중인 {IDName}는 탈퇴할 경우 재사용 및 복구가 불가능합니다."
        onClose={() => setOpen(false)}
      />
      <Button onClick={() => setOpen((prev) => !prev)}>버튼</Button>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {};
