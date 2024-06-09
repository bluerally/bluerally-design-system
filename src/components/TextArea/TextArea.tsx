import { LabeledComponentWrapper } from '../@common/LabeledComponentWrapper';
import { LabeledComponentType } from '@/@types/LabeledComponentType';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { CSSProperties, InputHTMLAttributes } from 'react';

export interface TextAreaProps
  extends InputHTMLAttributes<HTMLTextAreaElement>,
    LabeledComponentType {
  value?: string;
  maxLength?: number;
  error?: boolean;
  disabled?: boolean;
  height?: number | string;
  validRegex?: RegExp;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  containerRef?: React.RefObject<HTMLDivElement>;
  containerStyle?: CSSProperties;
  autoHeight?: boolean;
}

export const TextArea = ({
  status,
  name,
  label,
  required,
  statusMessage,
  description,
  maxLength,
  value = '',
  error = false,
  disabled = false,
  height = 100,
  validRegex,
  onChange,
  onKeyUp,
  inputRef,
  containerRef,
  onFocus,
  containerStyle,
  autoHeight,
  ...rest
}: TextAreaProps) => {
  const current = String(value).length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (
      validRegex &&
      e.target.value !== '' &&
      !validRegex?.test(e.target.value)
    ) {
      return;
    }

    e.target.value = e.target.value.slice(0, maxLength);
    onChange?.(e);
  };

  return (
    <LabeledComponentWrapper
      status={status}
      name={name}
      width={containerStyle?.width || undefined}
      label={label}
      statusMessage={statusMessage}
      description={description}
      required={required}
    >
      <Area style={containerStyle}>
        <TextAreaContainer error={error} disabled={disabled} ref={containerRef}>
          <TextAreaInner
            ref={inputRef}
            aria-label={name}
            innerHeight={height}
            name={name}
            value={value}
            onChange={(e) => {
              handleChange(e);
              if (autoHeight) {
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }
            }}
            autoHeight={autoHeight}
            disabled={disabled}
            onKeyUp={onKeyUp}
            onFocus={onFocus}
            maxLength={maxLength}
            {...rest}
          />
        </TextAreaContainer>
        {Boolean(maxLength) && (
          <TextCount>
            {current}/{maxLength}
          </TextCount>
        )}
      </Area>
    </LabeledComponentWrapper>
  );
};

const Area = styled('div')`
  display: flex;
  flex-direction: column;
`;

const TextCount = styled('p')`
  ${({ theme }) => theme.typography.sm.medium};
  color: ${({ theme }) => theme.palette.gray['300']};
  margin-top: ${({ theme }) => theme.spacing(3)};
  align-self: flex-end;
`;

const TextAreaContainer = styled('div')<{
  error?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.newGray['50'] : theme.palette.white};
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(7)}`};
  border: 1px solid
    ${({ theme, error, disabled }) =>
      error
        ? theme.palette.newError['600']
        : disabled
        ? theme.palette.newGray['100']
        : theme.palette.newGray['200']};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `};

  &:hover {
    border: 1px solid
      ${({ error, theme }) =>
        error ? theme.palette.newError['600'] : theme.palette.sky['500']};
  }
`;

const TextAreaInner = styled('textarea')<{
  autoHeight?: boolean;
  innerHeight?: number | string;
}>`
  ${({ theme }) => theme.typography.basic.regular}
  width: 100%;
  height: ${({ innerHeight }) =>
    typeof innerHeight === 'number' ? `${innerHeight}px` : innerHeight};
  ${({ autoHeight, innerHeight }) =>
    autoHeight &&
    `min-height: ${
      typeof innerHeight === 'number' ? `${innerHeight}px;` : `${innerHeight};`
    }`}
  border: none;
  outline: none;
  resize: none;
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.newGray['200'] : theme.palette.black};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.newGray['50'] : theme.palette.white};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `};

  &::placeholder {
    color: ${({ theme }) => theme.palette.newGray['300']};
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;
