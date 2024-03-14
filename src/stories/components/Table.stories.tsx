import { Table } from '@/components/Table';
import styled from '@emotion/styled';
import { Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'components/Table',
  component: Table,
  argTypes: {},
};

const Template: Story = () => {
  return (
    <Table fullWidth>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>모델구분</Table.HeadCell>
          <Table.HeadCell>속성구분</Table.HeadCell>
          <Table.HeadCell>Factor</Table.HeadCell>
          <Table.HeadCell>설명</Table.HeadCell>
          <Table.HeadCell minWidth={100}>적용 가중치</Table.HeadCell>
          <Table.HeadCell>참고 ) 변경 전 가중치</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <TdCenter rowSpan={4}>Initial 모델</TdCenter>
          <TdCenter rowSpan={4}>고유위험</TdCenter>
          <Table.Cell>국적</Table.Cell>
          <Table.Cell>국적에 따라 자금세탁위험을 평가</Table.Cell>
          <TdRight>11.00%</TdRight>
          <TdRight>11.00%</TdRight>
        </Table.Row>
        <Table.Row>
          <Table.Cell>외국인 여부</Table.Cell>
          <Table.Cell>외국인여부에 따라 자금세탁위험을 평가</Table.Cell>
          <TdRight>11.00%</TdRight>
          <TdRight style={{ color: 'red' }}>11.00%</TdRight>
        </Table.Row>
        <Table.Row>
          <Table.Cell>직업</Table.Cell>
          <Table.Cell>직업에 따라 자금세탁위험을 평가</Table.Cell>
          <TdRight>11.00%</TdRight>
          <TdRight>11.00%</TdRight>
        </Table.Row>
        <Table.Row>
          <Table.Cell>연령</Table.Cell>
          <Table.Cell>개인 실명번호 기준에 따라 자금세탁위험을 평가</Table.Cell>
          <TdRight>11.00%</TdRight>
          <TdRight>11.00%</TdRight>
        </Table.Row>
        <Table.Row>
          <TdCenter rowSpan={5}>Behavior 모델</TdCenter>
          <TdCenter rowSpan={5}>행동 위험</TdCenter>
          <Table.Cell>STable.Row Alert 건수</Table.Cell>
          <Table.Cell>국적에 따라 자금세탁위험을 평가</Table.Cell>
          <TdRight>11.00%</TdRight>
          <TdRight>11.00%</TdRight>
        </Table.Row>
        <Table.Row>
          <Table.Cell>가상자산 입출금 금액</Table.Cell>
          <Table.Cell>외국인여부에 따라 자금세탁위험을 평가</Table.Cell>
          <TdRight>11.00%</TdRight>
          <TdRight>11.00%</TdRight>
        </Table.Row>
        <Table.Row>
          <Table.Cell>원화 입출금 금액</Table.Cell>
          <Table.Cell>직업에 따라 자금세탁위험을 평가</Table.Cell>
          <TdRight>11.00%</TdRight>
          <TdRight>11.00%</TdRight>
        </Table.Row>
        <Table.Row>
          <Table.Cell>가상자산 분산 입출금 지갑수</Table.Cell>
          <Table.Cell>개인 실명번호 기준에 따라 자금세탁위험을 평가</Table.Cell>
          <TdRight>11.00%</TdRight>
          <TdRight>11.00%</TdRight>
        </Table.Row>
        <Table.Row>
          <Table.Cell>STR 보고건수</Table.Cell>
          <Table.Cell>개인 실명번호 기준에 따라 자금세탁위험을 평가</Table.Cell>
          <TdRight>11.00%</TdRight>
          <TdRight>11.00%</TdRight>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export const Default = Template.bind({});

const TdCenter = styled(Table.Cell)`
  text-align: center;
  background-color: ${({ theme }) => theme.palette.primary[100]};
`;

const TdRight = styled(Table.Cell)`
  text-align: end;
`;
