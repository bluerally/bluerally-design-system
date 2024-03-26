import { GuideText, STATUS } from '../GuideText';
import { Label } from '../Label';
import { LabeledComponentType } from '@/@types/LabeledComponentType';
import styled from '@emotion/styled';
import React from 'react';

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
        <GuideText
          status={status}
          statusMessage={statusMessage}
          description={description}
        />
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
  color: ${({ theme }) => theme.palette.error.main};
`;
