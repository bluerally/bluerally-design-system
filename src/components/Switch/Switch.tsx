import { Size } from '@/@types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface SwitchProps {
  name?: string;
  checked: boolean;
  disabled?: boolean;
  size?: Size;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({
  checked = false,
  onChange,
  disabled,
  size,
  name,
  ...rest
}: SwitchProps) => {
  return (
    <SwitchContainer role="switch" size={size} {...rest}>
      <CheckBox
        aria-hidden
        type="checkbox"
        name={name}
        aria-checked={checked}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <Slider size={size} checked={checked} disabled={disabled} />
    </SwitchContainer>
  );
};

const sliderStyleOverride = (size?: Size, checked?: boolean) => {
  switch (size) {
    default:
    case 'md': {
      const switchShape = css`
        height: 14px;
        width: 14px;
        left: 3px;
        bottom: 2.5px;
      `;

      if (checked) {
        return css`
          ${switchShape}
          transform: translateX(10px);
        `;
      }
      return switchShape;
    }

    case 'sm': {
      const switchShape = css`
        height: 10px;
        width: 10px;
        left: 2.5px;
        bottom: 2px;
      `;

      if (checked) {
        return css`
          ${switchShape}
          transform: translateX(9px);
        `;
      }
      return switchShape;
    }

    case 'lg': {
      const switchShape = css`
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 2px;
      `;

      if (checked) {
        return css`
          ${switchShape}
          transform: translateX(20.5px);
        `;
      }
      return switchShape;
    }
  }
};

const SwitchContainer = styled('label')<{ size?: Size }>`
  position: relative;
  display: inline-block;

  ${({ size }) => {
    switch (size) {
      default:
      case 'md':
        return css`
          width: 30px;
          height: 19px;
        `;
      case 'sm':
        return css`
          width: 24px;
          height: 14px;
        `;
      case 'lg':
        return css`
          width: 45px;
          height: 24px;
        `;
    }
  }}
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
