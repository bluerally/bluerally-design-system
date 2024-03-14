import { Align } from '@/@types';
import styled from '@emotion/styled';

export interface ModalHeaderProps {
  align?: Align;
  children: React.ReactNode;
}

export const ModalHeader = ({ children, align = 'left' }: ModalHeaderProps) => {
  return <HeaderContainer align={align}>{children}</HeaderContainer>;
};

const HeaderContainer = styled('header')<{ align: Align }>`
  width: 100%;
  display: flex;
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
