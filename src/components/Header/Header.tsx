import styled from '@emotion/styled';
import React from 'react';

export interface HeaderProps {
  title?: string;
  subTitle?: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export const Header = ({
  title,
  subTitle,
  description,
  action,
  children,
}: HeaderProps) => {
  return (
    <TitleContainer>
      {children ?? (
        <>
          <TextContainer>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
            <Description>{description}</Description>
          </TextContainer>
          <Action>{action}</Action>
        </>
      )}
    </TitleContainer>
  );
};

const Title = styled('p')`
  ${({ theme }) => theme.typography['3xl'].bold}
  letter-spacing: -0.75px;
`;

const SubTitle = styled('p')`
  ${({ theme }) => theme.typography['xl'].bold}
  letter-spacing: -0.02em;
`;

const Description = styled('span')`
  ${({ theme }) => theme.typography.basic.regular}
  color: ${({ theme }) => theme.palette.gray['300']}
`;

const TitleContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const TextContainer = styled('div')``;
const Action = styled('div')``;
