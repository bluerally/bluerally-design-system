import { Button } from '@/components';
import { Modal, Modal as ModalComponent, ModalProps } from '@/components/Modal';
import styled from '@emotion/styled';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

export default {
  title: 'components/Modal',
  component: ModalComponent,
  argTypes: {},
};

const Template: Story<ModalProps> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ModalComponent {...args} open={open}>
        <Modal.Header align="left">
          <Header>TEST : Pure Popup</Header>
        </Modal.Header>
        <Modal.Content align="left">뿌링클을 드시겠습니까?</Modal.Content>
        <Modal.Footer>
          <ButtonContainer>
            <Button onClick={() => setOpen(false)}>확인</Button>
          </ButtonContainer>
        </Modal.Footer>
      </ModalComponent>
      <Button onClick={() => setOpen((prev) => !prev)}>버튼</Button>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  position: { top: 10, left: 0 },
};

const Header = styled('h4')`
  ${({ theme }) => theme.typography.lg.bold};
`;

const ButtonContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
