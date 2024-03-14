import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { CSSProperties, InputHTMLAttributes } from 'react';

import { LabeledComponentType } from '@/@types/LabeledComponentType';

import { STATUS } from '@/components';

import { LabeledComponentWrapper } from '../@common/LabeledComponentWrapper';

export interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    LabeledComponentType {
  value?: string;
  disabled?: boolean;
  validRegex?: RegExp;
  placeholder?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerStyle?: CSSProperties;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.LegacyRef<HTMLInputElement>;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const TextInput = ({
  name,
  required,
  value = '',
  status,
  disabled = false,
  validRegex,
  placeholder,
  onChange,
  startIcon,
  endIcon,
  label,
  statusMessage,
  description,
  onClick,
  onKeyUp,
  inputRef,
  containerRef,
  onFocus,
  containerStyle,
  ...rest
}: TextInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      validRegex &&
      e.target.value !== '' &&
      !validRegex?.test(e.target.value)
    ) {
      return;
    }
    onChange?.(e);
  };

  return (
    <LabeledComponentWrapper
      status={status}
      name={name}
      width={containerStyle?.width || '100%'}
      label={label}
      statusMessage={statusMessage}
      description={description}
      required={required}
    >
      <TextInputContainer
        error={status === STATUS.ERROR}
        icon={Boolean(startIcon)}
        disabled={disabled}
        onClick={onClick}
        ref={containerRef}
        style={containerStyle}
      >
        {startIcon && <StartAdornment>{startIcon}</StartAdornment>}
        <StyledInput
          ref={inputRef}
          aria-label={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          onKeyUp={onKeyUp}
          onFocus={onFocus}
          {...rest}
        />
        {endIcon && <EndAdornment>{endIcon}</EndAdornment>}
      </TextInputContainer>
    </LabeledComponentWrapper>
  );
};

const TextInputContainer = styled('div')<{
  error?: boolean;
  icon?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  min-height: 42px;
  border-radius: 8px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.gray['50'] : theme.palette.white};
  padding: ${({ theme, icon }) =>
    `${theme.spacing(4.5)} ${theme.spacing(7)} ${theme.spacing(
      4.5,
    )} ${theme.spacing(icon ? 2.5 : 7)}`};
  border: 1px solid
    ${({ theme, error, disabled }) =>
      error
        ? theme.palette.error.main
        : disabled
        ? theme.palette.gray['200']
        : theme.palette.gray['300']};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `};

  &:focus-within {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const StyledInput = styled('input')<{ disabled: boolean }>`
  ${({ theme }) => theme.typography.basic.regular}
  width: 100%;
  border: none;
  outline: none;
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.gray['200'] : theme.palette.black};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.gray['50'] : theme.palette.white};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `};

  &::placeholder {
    color: ${({ theme }) => theme.palette.gray['300']};
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;

const StartAdornment = styled('div')<{ focused?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 ${({ theme }) => theme.spacing(5)} 0
    ${({ theme }) => theme.spacing(2)};
`;

const EndAdornment = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 ${({ theme }) => theme.spacing(2)} 0
    ${({ theme }) => theme.spacing(5)};
`;
