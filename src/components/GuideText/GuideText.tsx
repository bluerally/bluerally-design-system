import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const STATUS = {
  DEFAULT: 'default',
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

interface GuideTextProps {
  status?: Status;
  description?: string;
  statusMessage?: string;
}

export const GuideText = ({
  status = STATUS.DEFAULT,
  description,
  statusMessage,
}: GuideTextProps) => {
  return (
    <GuideTextContainer status={status}>
      {status !== STATUS.DEFAULT && statusMessage && (
        <StatusText>{statusMessage}</StatusText>
      )}
      {description && <Description>{description}</Description>}
    </GuideTextContainer>
  );
};

const GuideTextContainer = styled('div')<{ status?: Status }>`
  ${({ theme }) => theme.typography.basic.regular};

  ${({ status, theme }) => {
    switch (status) {
      case STATUS.ERROR:
        return css`
          color: ${theme.palette.error['300']};
        `;
      default:
        return css`
          color: ${theme.palette.gray['600']};
        `;
    }
  }};
`;

const Description = styled('p')`
  ${({ theme }) => theme.typography['sm-2'].lighter};
  line-height: 24px;
  color: ${({ theme }) => theme.palette.gray['600']};
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const StatusText = styled('p')`
  line-height: 24px;
  margin-top: ${({ theme }) => theme.spacing(3)};
`;
