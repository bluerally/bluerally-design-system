import styled from '@emotion/styled';

export interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
  return <FooterContainer>{children}</FooterContainer>;
};

const FooterContainer = styled('footer')`
  width: 100%;
  display: flex;
  align-items: center;
`;
