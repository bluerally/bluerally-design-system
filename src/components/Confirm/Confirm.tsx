import { Button } from '../Button';
import { Modal } from '@/components/Modal';
import styled from '@emotion/styled';

export interface ConfirmProps {
  open: boolean;
  dimmed?: boolean;
  cancelText?: string;
  confirmStatus?: 'default' | 'error';
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
  confirmStatus = 'error',
  title,
  description = '',
  dimmed = true,
  onClose,
  onCancel,
  onConfirm,
}: ConfirmProps) => {
  return (
    <Modal open={open} onClose={onClose} dimmed={dimmed} side="center">
      <Container>
        <Modal.Header align="left">
          <Header>{title}</Header>
        </Modal.Header>
        <Description>{description}</Description>
        <Modal.Footer>
          <ButtonContainer>
            {cancelText && onCancel && (
              <Button variant="gray-outline" onClick={onCancel} width="100%">
                {cancelText}
              </Button>
            )}

            <Button
              variant={
                confirmStatus === 'error' ? 'red-outline' : 'primary-outline'
              }
              onClick={onConfirm}
              width="100%"
            >
              {confirmText}
            </Button>
          </ButtonContainer>
        </Modal.Footer>
      </Container>
    </Modal>
  );
};

const Container = styled('div')`
  padding: ${({ theme }) => theme.spacing(12)};
  color: ${({ theme }) => theme.palette.gray['900']};
`;

const Header = styled('h1')`
  ${({ theme }) => theme.typography.xl.semiBold};
`;

const ButtonContainer = styled('div')`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.spacing(12)};
`;

const Description = styled('span')`
  width: 260px;
  ${({ theme }) => theme.typography.md.regular};
  color: ${({ theme }) => theme.palette.gray['500']};
  padding: ${({ theme }) => theme.spacing(2)} 0;
`;
