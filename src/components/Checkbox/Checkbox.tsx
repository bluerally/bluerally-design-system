import { theme } from '@/style/theme';
import styled from '@emotion/styled';
import { CheckCircle2, Circle } from 'lucide-react';

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
        {checked ? (
          <CheckCircle2
            size={24}
            color={theme.palette.white}
            fill={theme.palette.primary['300']}
          />
        ) : (
          <Circle size={24} color={theme.palette.gray['300']} />
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
  appearance: none;
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
`;

const CheckboxInputBase = styled('input')<CheckboxProps>`
  display: none;
`;

const Label = styled('span')<CheckboxProps>`
  ${({ theme }) => theme.typography.basic.medium}
  color: ${({ theme }) => theme.palette.gray['500']};
  padding-left: ${({ theme }) => theme.spacing(5)};
`;
