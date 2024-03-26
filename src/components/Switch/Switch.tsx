import { Label as LabelBase } from '../Label';
import { Size } from '@/@types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface SwitchProps {
  name?: string;
  checked: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({
  checked = false,
  onChange,
  disabled,
  name,
  label,
  ...rest
}: SwitchProps) => {
  return (
    <Container {...rest}>
      {label && <Label>{label}</Label>}
      <SwitchContainer role="switch">
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
    </Container>
  );
};

const sliderStyleOverride = (checked?: boolean) => {
  const switchShape = css`
    height: 14px;
    width: 14px;
    left: 2.5px;
    bottom: 2px;
  `;

  if (checked) {
    return css`
      ${switchShape}
      transform: translateX(13px);
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
          background-color: ${theme.palette.newGray['150']};
        `
      : css`
          cursor: pointer;
          background-color: ${checked
            ? theme.palette.sky['500']
            : theme.palette.newGray['200']};
        `}

  &:before {
    content: '';
    position: absolute;
    border-radius: 50%;
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.palette.newGray['300'] : theme.palette.white};
    transition: 0.4s;

    ${({ checked }) => sliderStyleOverride(checked)};
  }
`;

const Container = styled('div')`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const Label = styled(LabelBase)`
  padding: 0;
  ${({ theme }) => theme.typography.md.medium}
  color: ${({ theme }) => theme.palette.newGray['700']};
`;
