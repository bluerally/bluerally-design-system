import styled from '@emotion/styled';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean;
}

export const Label = ({ error, children, ...rest }: LabelProps) => {
  return (
    <StyledLabel error={error} {...rest}>
      {children}
    </StyledLabel>
  );
};

const StyledLabel = styled('label')<{
  error?: boolean;
}>`
  ${({ theme }) => theme.typography.md.regular};
  padding-bottom: 8px;
  color: ${({ theme, error }) =>
    error ? theme.palette.error['300'] : theme.palette.gray['600']};
`;
