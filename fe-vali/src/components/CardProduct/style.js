import styled from 'styled-components';
import { Button } from 'antd';

export const StyleCard = styled.div`
  width: 20%;
  height: 400px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #fff;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  }
`;

export const StyleName = styled.div`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: 100%;
`;

export const StyleDis = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0;
`;

export const StrikeThrough = styled.p`
  text-decoration: line-through;
  color: #888;
  font-size: 16px;
  margin: 0;
`;

export const DiscountPrice = styled.p`
  color: #ff4d4f;
  font-size: 24px;
  font-weight: bold;
  margin: 8px 0;
`;

export const DiscountPercent = styled.p`
  color: #ff4d4f;
  font-size: 16px;
  margin: 0;
  font-weight: bold;
`;

export const StyledButton = styled(Button)`
  background-color: #00A86B !important;
  border-color: #00A86B !important;
  color: #fff !important;
  border-radius: 5px !important;
  
  &:hover, &:focus {
    background-color: #02ce83 !important;
    border-color: #02ce83 !important;
    color: #fff !important;
  }
`;
