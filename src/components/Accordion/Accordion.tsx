import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

export interface AccordionProps {
  summary: React.ReactNode;
  children: React.ReactNode;
  expanded?: boolean;
}

export const Accordion = ({
  summary,
  children,
  expanded = false,
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleClickDetails = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <AccordionContainer>
      <Details onClick={handleClickDetails}>
        <Summary>{summary}</Summary>
      </Details>
      <ContentWrapper>
        <ContentContainer expanded={isExpanded}>{children}</ContentContainer>
      </ContentWrapper>
    </AccordionContainer>
  );
};

const AccordionContainer = styled('div')``;

const Details = styled('details')``;

const Summary = styled('summary')`
  list-style: none;
  cursor: pointer;
`;

const ContentWrapper = styled('div')`
  overflow: hidden;
`;

const ContentContainer = styled('div')<{
  expanded: boolean;
}>`
  ${({ expanded }) =>
    css`
      max-height: ${expanded ? '100%' : 0};
      opacity: ${expanded ? 1 : 0};
    `}
  transition: 0.2s ease-in-out;
`;
