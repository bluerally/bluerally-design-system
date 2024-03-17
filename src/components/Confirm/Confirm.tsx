import { Button } from '../Button';
import { Modal } from '@/components/Modal';
import styled from '@emotion/styled';

export interface ConfirmProps {
  open: boolean;
  cancelText?: string;
  confirmText?: string;
  title: string;
  description?: string;
  onClose?: () => void;
  onCancel?: (e: any) => void;
  onConfirm?: (e: any) => void;
}

export const Confirm = ({
  open,
  cancelText = '취소',
  confirmText = '확인',
  title,
  description = '',
  onClose,
  onCancel,
  onConfirm,
}: ConfirmProps) => {
  return (
    <Modal open={open} dimmed position={{ top: 30, left: 0 }} onClose={onClose}>
      <Modal.Header align="left">
        <Header>{title}</Header>
      </Modal.Header>
      <Description>{description}</Description>
      <Modal.Footer>
        <ButtonContainer>
          <Button
            variant="outlined"
            color="gray"
            onClick={onCancel}
            width="100%"
          >
            {cancelText}
          </Button>
          <Button color="error" onClick={onConfirm} width="100%">
            {confirmText}
          </Button>
        </ButtonContainer>
      </Modal.Footer>
    </Modal>
  );
};

const Header = styled('h1')`
  ${({ theme }) => theme.typography.xl.semiBold};
`;

const ButtonContainer = styled('div')`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  justify-content: flex-end;
`;

const Description = styled('span')`
  width: 260px;
  ${({ theme }) => theme.typography.md.regular};
  color: ${({ theme }) => theme.palette.newGray['500']};
  padding: ${({ theme }) => theme.spacing(2)} 0
    ${({ theme }) => theme.spacing(12)} 0;
`;
