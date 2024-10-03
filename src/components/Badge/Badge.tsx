import badgeStyles from './style';
import styled from '@emotion/styled';

type BadgeVariant = 'primary-outline' | 'gray-filled' | 'gray-outline';

export type Props = {
  variant?: BadgeVariant;
  children: React.ReactNode;
};

export const Badge = ({ variant, children }: Props) => {
  return <BadgeContainer variant={variant}>{children}</BadgeContainer>;
};

const BadgeContainer = styled('div')<{
  variant?: BadgeVariant;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  vertical-align: middle;
  border-radius: 100px;
  padding: 1px 6px;
  height: 19px;

  ${({ variant }) => variant && badgeStyles.variants[variant]};
  ${({ theme }) => theme.typography.basic.medium};
`;
