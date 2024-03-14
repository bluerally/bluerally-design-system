import { Align } from '@/@types';
import styled from '@emotion/styled';

export interface ModalContentProps {
  align?: Align;
  children: React.ReactNode;
}

export const ModalContent = ({
  children,
  align = 'left',
}: ModalContentProps) => {
  return (
    <ContentContainer align={align}>
      <Content>{children}</Content>
    </ContentContainer>
  );
};

const ContentContainer = styled('article')<{ align: Align }>`
  width: 100%;
  min-height: 70px;
  display: inline-flex;
  align-items: center;
  justify-content: ${({ align }) => {
    switch (align) {
      case 'center':
        return align;

      case 'right':
        return 'flex-end';

      default:
      case 'left':
        return 'flex-start';
    }
  }};
`;

const Content = styled('div')`
  width: 100%;
  white-space: pre;
  color: ${({ theme }) => theme.palette.black};
  ${({ theme }) => theme.typography.basic.regular};
`;
