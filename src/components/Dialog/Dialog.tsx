import styled from '@emotion/styled';
import React from 'react';

import { Align, Modal, ModalProps } from '@/index';

export interface DialogProps extends ModalProps {
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  titleAlign?: Align;
  isContentScroll?: boolean;
}

export const Dialog = ({
  children,
  title,
  subTitle,
  titleAlign = 'left',
  footer,
  isContentScroll = false,
  ...rest
}: DialogProps) => {
  return (
    <Modal {...rest} isContentScroll={isContentScroll}>
      {title && (
        <TitleContainer>
          <Title titleAlign={titleAlign}>{title}</Title>
          {subTitle && <SubTitle titleAlign={titleAlign}>{subTitle}</SubTitle>}
        </TitleContainer>
      )}
      <ContentContainer isContentScroll={isContentScroll}>
        {children}
      </ContentContainer>
      {footer}
    </Modal>
  );
};

const TitleContainer = styled('div')`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-shrink: 0;
  height: 84px;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled('h2')<{ titleAlign: Align }>`
  display: flex;
  justify-content: ${({ titleAlign }) => {
    switch (titleAlign) {
      case 'center':
        return titleAlign;

      case 'right':
        return 'flex-end';

      default:
      case 'left':
        return 'flex-start';
    }
  }};

  ${({ theme }) => theme.typography['3xl'].bold};
  color: ${({ theme }) => theme.palette.gray['700']};
`;

const SubTitle = styled('p')<{ titleAlign: Align }>`
  display: flex;
  justify-content: ${({ titleAlign }) => {
    switch (titleAlign) {
      case 'center':
        return titleAlign;

      case 'right':
        return 'flex-end';

      default:
      case 'left':
        return 'flex-start';
    }
  }};
  ${({ theme }) => theme.typography.lg.medium};
  color: ${({ theme }) => theme.palette.gray['500']};
`;

const ContentContainer = styled('section')<{
  isContentScroll: boolean;
}>`
  flex: 1;
  overflow: ${({ isContentScroll }) =>
    isContentScroll ? 'scroll' : 'visible'};
`;
