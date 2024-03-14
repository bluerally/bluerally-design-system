import styled from '@emotion/styled';
import React from 'react';

interface Props {
  children: React.ReactNode;
  isAttachRoot?: boolean;
}
const OverlayDimmedWrapper = ({ children, isAttachRoot }: Props) => {
  return isAttachRoot ? (
    <DimmedContainer>{children}</DimmedContainer>
  ) : (
    <>{children}</>
  );
};

export { OverlayDimmedWrapper };

const DimmedContainer = styled('div')`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: transparent;
  z-index: ${({ theme }) => theme.zIndex.DIM};
  overflow: hidden;
  margin: 0;
  padding: 0;
`;
