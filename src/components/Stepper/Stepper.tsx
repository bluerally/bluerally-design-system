import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

type Direction = 'vertical' | 'horizontal';
type Color = 'black' | 'primary' | 'gray' | 'white';

export interface StepperProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  current: number;
  steps: string[] | { title: string; subtitle?: string }[];
  verticalHeight?: number;
  direction?: Direction;
}

enum Status {
  COMPLETE,
  CURRENT,
  INCOMPLETE,
}

const stepTitleColor: { [key in Status]: Color } = {
  0: 'black',
  1: 'primary',
  2: 'gray',
};

const stepIndexColor: { [key in Status]: Color } = {
  0: 'white',
  1: 'primary',
  2: 'black',
};

const stepIndexBGColor: { [key in Status]: Color } = {
  0: 'primary',
  1: 'white',
  2: 'gray',
};

const stepIndexBorderColor: { [key in Status]: Color } = {
  0: 'primary',
  1: 'primary',
  2: 'gray',
};

export const Stepper = ({
  current,
  steps,
  direction = 'horizontal',
  verticalHeight,
}: StepperProps) => {
  const getStatus = (i: number, current: number) => {
    if (i === current) {
      return Status.CURRENT;
    }

    if (i < current) {
      return Status.COMPLETE;
    }

    return Status.INCOMPLETE;
  };

  return (
    <StepperContainer direction={direction} height={verticalHeight}>
      <StepContainer direction={direction}>
        {steps.map((step, i) => (
          <Step direction={direction} key={i}>
            <StepIndex status={getStatus(i, current)} direction={direction}>
              <StepNum>{i + 1}</StepNum>
            </StepIndex>
            {direction === 'horizontal' ? (
              <StepTitle status={getStatus(i, current)} direction={direction}>
                {typeof step === 'string' ? step : step.title}
              </StepTitle>
            ) : (
              <TitleContainer>
                <StepTitle status={getStatus(i, current)} direction={direction}>
                  {typeof step === 'string' ? step : step.title}
                </StepTitle>
                {typeof step !== 'string' && (
                  <StepSubtitle
                    status={getStatus(i, current)}
                    direction={direction}
                  >
                    {step.subtitle}
                  </StepSubtitle>
                )}
              </TitleContainer>
            )}
          </Step>
        ))}
      </StepContainer>
      <LineContainer direction={direction}>
        {[...Array(steps.length - 1)].map((_, i) => (
          <Line key={i} direction={direction}>
            <LineInner isActive={i < current} direction={direction} />
          </Line>
        ))}
      </LineContainer>
    </StepperContainer>
  );
};

const StepperContainer = styled('div')<{
  direction: Direction;
  height?: number;
}>`
  position: relative;

  ${({ direction, height }) =>
    direction === 'vertical'
      ? css`
          max-width: 210px;
          height: ${height ?? 200}px;
        `
      : css`
          margin: 0 15% 20px;
        `};
`;

const StepContainer = styled('div')<{
  direction: Direction;
}>`
  display: flex;
  justify-content: space-between;

  ${({ direction }) =>
    direction === 'vertical' &&
    css`
      height: 100%;
      flex-direction: column;
    `}
`;

const Step = styled('div')<{
  direction: Direction;
}>`
  position: relative;

  ${({ theme, direction }) =>
    direction === 'vertical' &&
    css`
      display: inline-flex;
      gap: ${theme.spacing(8)};
    `}
`;

const StepIndex = styled('div')<{ status: Status; direction: Direction }>`
  position: relative;
  width: 40px;
  height: 40px;
  z-index: 1;
  border-radius: 20px;

  background-color: ${({ theme, status }) =>
    stepIndexBGColor[status] === 'white'
      ? theme.palette[stepIndexBGColor[status]]
      : stepIndexBGColor[status] === 'primary'
      ? theme.palette[stepIndexBGColor[status]]['400']
      : theme.palette[stepIndexBGColor[status]]['100']};
  color: ${({ theme, status }) =>
    stepIndexColor[status] === 'black' || stepIndexColor[status] === 'white'
      ? theme.palette[stepIndexColor[status]]
      : theme.palette[stepIndexColor[status]]['400']};
  border: 2px solid
    ${({ theme, status }) => theme.palette[stepIndexBorderColor[status]]['400']};

  ${({ direction }) =>
    direction === 'horizontal' &&
    css`
      margin: 0 auto 10px;
    `}

  ${({ theme }) => theme.typography.xl.medium}
`;

const StepNum = styled('div')`
  position: absolute;
  font-size: 16px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const TitleContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;

const StepTitle = styled('h4')<{ status: Status; direction: Direction }>`
  color: ${({ theme, status }) =>
    stepTitleColor[status] === 'black'
      ? theme.palette[stepTitleColor[status]]
      : theme.palette[stepTitleColor[status]]['400']};

  ${({ theme }) => theme.typography.basic.medium}

  ${({ theme, direction }) =>
    direction === 'vertical'
      ? css`
          margin-top: ${theme.spacing(4)};
        `
      : css`
          width: max-content;
          left: 50%;
          transform: translate(-50%, 0);
          position: absolute;
        `}
`;

const StepSubtitle = styled('p')<{ status: Status; direction: Direction }>`
  color: ${({ theme, status }) =>
    stepTitleColor[status] === 'black'
      ? theme.palette[stepTitleColor[status]]
      : theme.palette[stepTitleColor[status]]['400']};

  ${({ theme }) => theme.typography.basic.regular};
`;

const LineContainer = styled('div')<{
  direction: Direction;
}>`
  display: flex;
  position: absolute;
  z-index: 0;

  ${({ direction }) =>
    direction === 'vertical'
      ? css`
          left: 19px;
          top: 0;
          height: 100%;
        `
      : css`
          top: 20px;
          left: 0;
          right: 0;
          transform: translateY(-50%);
        `}
`;

const Line = styled('div')<{
  direction: Direction;
}>`
  flex: 1 1 auto;

  ${({ direction }) =>
    direction === 'horizontal' &&
    css`
      align-self: center;
    `}
`;

const LineInner = styled('div')<{ isActive: boolean; direction: Direction }>`
  ${({ theme, isActive }) =>
    isActive
      ? css`
          border-color: ${theme.palette.primary['300']};
        `
      : css`
          border-color: ${theme.palette.gray['600']};
        `};

  ${({ direction }) =>
    direction === 'vertical'
      ? css`
          border-left-style: solid;
          border-left-width: 1px;
          height: 100%;
        `
      : css`
          border-top-style: solid;
          border-top-width: 2px;
        `}
`;
