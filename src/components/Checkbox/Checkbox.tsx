import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Icon } from '@/components/Icon';

import { theme } from '@/style/theme';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  label?: string | React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  value,
  label,
  disabled = false,
  checked = false,
  onChange,
  readOnly = false,
  ...rest
}: CheckboxProps) => {
  return (
    <CheckboxContainer disabled={disabled}>
      <CheckBoxBase
        aria-checked={checked}
        disabled={disabled}
        checked={checked}
        {...rest}
      >
        <CheckboxInputBase
          type="checkbox"
          aria-hidden="true"
          readOnly={readOnly}
          onChange={(e) => {
            if (readOnly) {
              return;
            }
            onChange?.(e);
          }}
          checked={checked}
          value={value}
        />
        {checked && (
          <Icon
            icon="checkbox-check"
            width={16}
            color={disabled ? theme.palette.gray['200'] : theme.palette.white}
          />
        )}
      </CheckBoxBase>
      {label && <Label>{label}</Label>}
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled('label')<{ disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const CheckBoxBase = styled('span')<CheckboxProps>`
  display: inline-flex;
  justify-content: center;
  border-radius: 4px;
  width: 16px;
  height: 16px;

  ${({ checked, theme }) =>
    checked
      ? css`
          background: ${theme.palette.primary.main};
        `
      : css`
          outline: 1px solid ${theme.palette.gray['300']};
          background: 'transparent';
        `}

  ${({ theme, disabled }) =>
    disabled &&
    css`
      outline: 1px solid ${theme.palette.gray['200']};
      background: ${theme.palette.gray['100']};
    `}
`;

const CheckboxInputBase = styled('input')<CheckboxProps>`
  display: none;
`;

const Label = styled('span')<CheckboxProps>`
  ${({ theme }) => theme.typography.basic.medium}
  color: ${({ theme }) => theme.palette.gray['500']};
  padding-left: ${({ theme }) => theme.spacing(5)};
`;
