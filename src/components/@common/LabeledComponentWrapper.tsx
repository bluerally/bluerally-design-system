import { GuideText, STATUS } from '../GuideText';
import { Label } from '../Label';
import { LabeledComponentType } from '@/@types/LabeledComponentType';
import { theme } from '@/style';
import styled from '@emotion/styled';
import { AlertTriangle } from 'lucide-react';

export const LabeledComponentWrapper = ({
  children,
  required = false,
  status,
  width,
  label,
  name,
  statusMessage,
  description,
}: LabeledComponentType) => {
  return (
    <LabeledContainer width={width}>
      {label && (
        <Label htmlFor={name} error={status === STATUS.ERROR}>
          {label} {required && <StarIconWrapper> *</StarIconWrapper>}
        </Label>
      )}
      {children}
      {(status || description || statusMessage) && (
        <StatusMessageContainer>
          {(description || statusMessage) && (
            <AlertTriangle size={16} color={theme.palette.error[300]} />
          )}
          <GuideText
            status={status}
            statusMessage={statusMessage}
            description={description}
          />
        </StatusMessageContainer>
      )}
    </LabeledContainer>
  );
};

const LabeledContainer = styled('div')<{ width?: string | number }>`
  display: flex;
  flex-direction: column;
  ${({ width }) =>
    width && `width: ${typeof width == 'string' ? width : `${width}px`};`}
`;

const StarIconWrapper = styled('span')`
  color: ${({ theme }) => theme.palette.error['300']};
`;

const StatusMessageContainer = styled('div')`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-top: 6px;
`;
