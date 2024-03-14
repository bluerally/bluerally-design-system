import { Button, Checkbox, Select } from '@/components';
import { Dialog, DialogProps } from '@/components/Dialog';
import styled from '@emotion/styled';
import { Story } from '@storybook/react';
import React, { useCallback, useState } from 'react';

export default {
  title: 'components/Dialog',
  component: Dialog,
  argTypes: {},
};

const Template: Story<DialogProps> = ({ titleAlign, size, dimmed }) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback(() => {
    setChecked((checked) => !checked);
  }, []);

  return (
    <>
      <Dialog
        side="center"
        align="end"
        open={open}
        height={600}
        title="파일 다운로드"
        subTitle="다운로드 사유 입력"
        onClose={() => setOpen(false)}
        titleAlign={titleAlign}
        size={size}
        dimmed={dimmed}
        footer={
          <ButtonContainer>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button>다음</Button>
          </ButtonContainer>
        }
      >
        <Select
          width="300px"
          selected={{ title: '안녕하세요', value: 'hi' }}
          options={[
            { title: '10', value: '10' },
            { title: '25', value: '25' },
            { title: '50', value: '50' },
          ]}
        />
        <Checkbox
          checked={checked}
          onChange={handleChange}
          label="체크체크체크"
        />
      </Dialog>
      <Button onClick={() => setOpen((prev) => !prev)}>Dialog Open</Button>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  size: 'sm',
  dimmed: true,
};

const ButtonContainer = styled('div')`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;
