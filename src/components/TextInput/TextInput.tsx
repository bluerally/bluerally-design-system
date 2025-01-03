import { LabeledComponentWrapper } from '../@common/LabeledComponentWrapper';
import { LabeledComponentType } from '@/@types/LabeledComponentType';
import { STATUS } from '@/components';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { CSSProperties, InputHTMLAttributes } from 'react';

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
  inputContainerStyle?: CSSProperties;
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
  inputContainerStyle,
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
        className="textInput-container"
      >
        {startIcon && <StartAdornment>{startIcon}</StartAdornment>}
        <StyledInput
          ref={inputRef}
          aria-label={name}
          name={name}
          placeholder={placeholder}
          error={status === STATUS.ERROR}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          onKeyUp={onKeyUp}
          onFocus={onFocus}
          style={inputContainerStyle}
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
  height: 44px;
  border-radius: 14px;
  background-color: ${({ theme, error, disabled }) =>
    error
      ? theme.palette.error['50']
      : disabled
      ? theme.palette.gray['50']
      : theme.palette.white};
  padding: 10px 14px;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.palette.error['300'] : theme.palette.gray['200']};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `};

  &:focus-within {
    border: 1px solid
      ${({ error, theme }) =>
        error ? theme.palette.error['300'] : theme.palette.primary['300']};
  }
`;

const StyledInput = styled('input')<{ error?: boolean; disabled: boolean }>`
  ${({ theme }) => theme.typography.lg.regular}
  width: 100%;
  border: none;
  outline: none;
  color: ${({ theme, error, disabled }) =>
    error
      ? theme.palette.error['300']
      : disabled
      ? theme.palette.gray['400']
      : theme.palette.gray['900']};
  background-color: ${({ theme, error, disabled }) =>
    error
      ? theme.palette.error['50']
      : disabled
      ? theme.palette.gray['50']
      : theme.palette.white};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `};

  &::placeholder {
    color: ${({ theme }) => theme.palette.gray['400']};
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;

const StartAdornment = styled('div')<{ focused?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const EndAdornment = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;
