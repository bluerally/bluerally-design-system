import React from 'react';
import { Meta, Story } from '@storybook/react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme';

export default {
  title: 'general/Typography',
} as Meta;

type StyleType = {
  [key in string]: StyleType;
};

const generateTypography = (typography: string, font: any) => {
  const pattern = new RegExp('(:(?:.*?);)');
  const fontWeightArr = Object.keys(font);
  const styles: StyleType = {};

  fontWeightArr.forEach((e) => {
    const splitArr = font[e].styles.split(pattern);

    splitArr.forEach((a: string, i: number) => {
      if (a.includes('font') || a.includes('line')) {
        styles[e] = {
          ...styles[e],
          [splitArr[i]]: splitArr[i + 1].replace(/(:|;)/g, ''),
        };
      }
    });
  });

  return (
    <>
      <Row key={typography}>
        <FontColumn width="40">{typography}</FontColumn>
        <FontColumn width="600">
          {fontWeightArr.map((fontWeight) => {
            return (
              <FontWeight
                key={fontWeight}
                fontSize={styles[fontWeight]['font-size']}
                fontWeight={styles[fontWeight]['font-weight']}
                lineHight={styles[fontWeight]['line-height']}
              >
                동해물과 백두산이 마르고 닳도록 하느님이 보우하사
              </FontWeight>
            );
          })}
        </FontColumn>
        <Column width="70">{<>{styles['regular']['font-size']}</>}</Column>
        <Column width="80">{<>{styles['regular']['line-height']}</>}</Column>
      </Row>
      <TypographyDivider />
    </>
  );
};

export const Typography: Story = () => {
  const typographies = Object.entries(theme.typography);

  return (
    <>
      <Title>Pretendard</Title>
      <Row>
        <Column width="40"></Column>
        <Column width="600"></Column>
        <Column width="70">font-size</Column>
        <Column width="80">line-height</Column>
      </Row>
      {typographies.map(([typography, font]) =>
        generateTypography(typography, font),
      )}
    </>
  );
};

const Title = styled('h1')`
  margin-bottom: 30px;
  ${({ theme }) => theme.typography['3xl'].regular};
`;

const Row = styled('div')`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Column = styled('div')<{ width?: string }>`
  width: ${({ width }) => (width ? `${width}px` : '50px')};
  ${({ theme }) => theme.typography['md'].regular};
  text-align: center;
`;

const Divider = styled('div')`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.gray['200']};
`;

const TypographyDivider = styled(Divider)`
  margin: 30px 0;
`;

const FontWeight = styled('div')<{
  fontSize: StyleType;
  fontWeight: StyleType;
  lineHight: StyleType;
}>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ lineHight }) => lineHight};
`;

const FontColumn = styled('div')<{
  width?: string;
}>`
  width: ${({ width }) => `${width}px` ?? 'auto'};
  white-space: nowrap;
  overflow-x: auto;
`;
