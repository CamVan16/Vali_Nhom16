import styled from 'styled-components';
import { Layout, Table } from 'antd';

const { Header, Content, Footer } = Layout;

export const StyledLayout = styled(Layout)`
  .order-header {
    background-color: #001529;
  }

  .order-page {
    min-height: 100vh;
  }

  .order-footer {
    text-align: center;
  }

  .shipping-info,
  .order-items,
  .voucher-section,
  .shipping-method,
  .payment-method,
  .order-total,
  .order-notes {
    margin-bottom: 20px;
  }
`;

export const StyledHeader = styled(Header)`
  color: white;
  text-align: center;
`;

export const StyledContent = styled(Content)`
  padding: 0 50px;
`;

export const StyledFooter = styled(Footer)`
  text-align: center;
`;

export const StyledTable = styled(Table)`
  margin-bottom: 20px;

  .ant-table-thead > tr > th {
    background-color: #f0f0f0;
  }

  .ant-table-tbody > tr > td {
    vertical-align: middle;
  }
`;
