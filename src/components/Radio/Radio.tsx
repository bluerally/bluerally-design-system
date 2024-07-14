import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  value?: number | string;
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Radio = ({
  value,
  label,
  disabled,
  checked,
  onChange,
  ...rest
}: RadioProps) => {
  return (
    <RadioContainer disabled={disabled}>
      <RadioBase
        type="radio"
        role="radio"
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <Label>{label}</Label>
    </RadioContainer>
  );
};

const RadioContainer = styled('label')<RadioProps>`
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const RadioBase = styled('input')<RadioProps>`
  appearance: none;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  cursor: pointer;
  border: 1px solid
    ${({ disabled, theme }) =>
      disabled ? theme.palette.gray['200'] : theme.palette.gray['300']};

  ${({ checked, theme, disabled }) => {
    if (checked && disabled) {
      return css`
        outline: 1px solid ${theme.palette.gray['200']};
        background: ${theme.palette.gray['200']};
        border: 4px solid ${theme.palette.gray['100']};
        cursor: not-allowed;
      `;
    }

    if (!checked && disabled) {
      return css`
        background: ${theme.palette.gray['100']};
        cursor: not-allowed;
      `;
    }

    if (checked) {
      return css`
        border: 5px solid ${theme.palette.primary['300']};
      `;
    }
  }}
`;

const Label = styled('span')`
  ${({ theme }) => theme.typography.basic.medium}
  color: ${({ theme }) => theme.palette.gray['500']};
  padding-left: ${({ theme }) => theme.spacing(5)};
`;
