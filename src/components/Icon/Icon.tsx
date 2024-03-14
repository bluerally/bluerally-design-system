import styled from '@emotion/styled';
import { forwardRef } from 'react';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  src?: string;
  width?: string | number;
  height?: string | number;
  size?: 16 | 24;
  onClick?: (e: any) => void;
}

export const Icon = forwardRef<HTMLDivElement, LogoProps>(function Icon(
  {
    icon,
    src,
    color = '#000',
    width = 16,
    height = 16,
    size = 16,
    onClick,
    ...rest
  }: LogoProps,
  ref,
) {
  return (
    <Image
      width={width}
      height={height}
      color={color}
      src={icon ? `/icons/${size}px/${icon}.svg` : src}
      onClick={onClick}
      ref={ref}
      {...rest}
    />
  );
});

const Image = styled('div')<{
  width?: string | number;
  height?: string | number;
  onClick?: (e: any) => void;
  color?: string;
  src?: string;
  style?: any;
}>`
  ${({ width }) =>
    `width: ${typeof width === 'number' ? `${width}px` : width}`};
  ${({ height }) =>
    `height: ${typeof height === 'number' ? `${height}px` : height}`};
  ${({ color }) => `background: ${color}`};
  ${({ src }) => `mask: url(${src}) no-repeat center`};
  mask-size: contain;
  ${({ onClick }) => onClick && `cursor: pointer`};
  ${({ style }) => style};
`;
