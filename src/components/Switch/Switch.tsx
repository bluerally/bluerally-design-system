import { Size } from '@/@types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface SwitchProps {
  name?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({
  checked = false,
  onChange,
  disabled,
  name,
  ...rest
}: SwitchProps) => {
  return (
    <SwitchContainer role="switch" {...rest}>
      <CheckBox
        aria-hidden
        type="checkbox"
        name={name}
        aria-checked={checked}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <Slider checked={checked} disabled={disabled} />
    </SwitchContainer>
  );
};

const sliderStyleOverride = (size?: Size, checked?: boolean) => {
  const switchShape = css`
    height: 14px;
    width: 14px;
    left: 4.5px;
    bottom: 2px;
  `;

  if (checked) {
    return css`
      ${switchShape}
      transform: translateX(10px);
    `;
  }
  return switchShape;
};

const SwitchContainer = styled('label')<{ size?: Size }>`
  position: relative;
  display: inline-block;
  width: 32px;
  height: 18px;
`;

const CheckBox = styled('input')`
  display: none;
`;

const Slider = styled('span')<{
  size?: Size;
  checked: boolean;
  disabled?: boolean;
}>`
  position: absolute;
  inset: 0;
  border-radius: 14px;
  transition: 0.4s;

  ${({ theme, checked, disabled }) =>
    disabled
      ? css`
          background-color: ${checked
            ? theme.palette.primary['300']
            : theme.palette.gray['200']};
        `
      : css`
          cursor: pointer;
          background-color: ${checked
            ? theme.palette.primary['400']
            : theme.palette.gray['300']};
        `}

  &:before {
    content: '';
    position: absolute;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.white};
    transition: 0.4s;

    ${({ checked, size }) => sliderStyleOverride(size, checked)};
  }
`;
