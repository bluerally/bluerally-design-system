import { LabeledComponentType } from '@/@types/LabeledComponentType';
import { Button as ButtonBase } from '@/components';
import { LabeledComponentWrapper } from '@/components/@common/LabeledComponentWrapper';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

type SegmentButtonVariant = 'default' | 'button';
export interface SegmentButtonItem {
  title: string;
  value: string;
}

export interface SegmentButtonProps extends LabeledComponentType {
  type?: 'button' | 'submit' | 'reset';
  value?: string;
  variant?: SegmentButtonVariant;
  fullWidth?: boolean;
  options: SegmentButtonItem[];
  enableAll?: boolean;
  allTitle?: string;
  allValue?: string;
  disabled?: boolean;
  onChange?: (
    value: string | undefined,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

export const SegmentButton = ({
  type,
  value,
  variant = 'default',
  fullWidth = false,
  options,
  status,
  label,
  statusMessage,
  description,
  name,
  enableAll,
  allTitle = '전체',
  allValue,
  disabled = false,
  required,
  onChange,
}: SegmentButtonProps) => {
  return (
    <LabeledComponentWrapper
      status={status}
      name={name}
      label={label}
      statusMessage={statusMessage}
      description={description}
      width={fullWidth ? '100%' : undefined}
      required={required}
    >
      <SegmentButtonContainer
        variant={variant}
        disabled={disabled}
        fullWidth={fullWidth}
      >
        {enableAll && (
          <Button
            style={{ flex: fullWidth ? 1 : undefined }}
            type={type ?? 'button'}
            key={allValue}
            variant={value === allValue ? 'primary-filled' : 'primary-outline'}
            value={allValue}
            onClick={(e) => {
              onChange?.(allValue, e);
            }}
            disabled={disabled}
          >
            {allTitle}
          </Button>
        )}
        {options.map((option) => {
          return (
            <Button
              style={{ flex: fullWidth ? 1 : undefined }}
              type={type ?? 'button'}
              key={option.value}
              variant={
                value === allValue ? 'primary-filled' : 'primary-outline'
              }
              value={option.value}
              onClick={(e) => {
                onChange?.(option.value, e);
              }}
              disabled={disabled}
            >
              {option.title}
            </Button>
          );
        })}
      </SegmentButtonContainer>
    </LabeledComponentWrapper>
  );
};

const SegmentButtonContainer = styled('div')<{
  variant?: SegmentButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
}>`
  display: inline-flex;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  height: 44px;
  position: relative;
  border-radius: 8px;

  ${({ variant, theme, disabled }) => {
    return (
      variant === 'default' &&
      css`
        background-color: ${disabled
          ? theme.palette.primary['50']
          : theme.palette.primary['200']};
      `
    );
  }}
`;

const Button = styled(ButtonBase)`
  width: max-content;
  height: 36px;
  margin: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(10)}`};
`;
