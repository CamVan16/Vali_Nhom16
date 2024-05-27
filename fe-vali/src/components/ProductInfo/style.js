import styled from 'styled-components';
import { Button } from 'antd';
export const Container = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
`;

export const ProductTitle = styled.h2`
  margin-bottom: 5px;
`;

export const Price = styled.p`
  font-size: 20px;
  color: ${props => props.discount ? 'red' : 'black'};
  ${props => props.discount && 'text-decoration: line-through;'}
  margin-top: 5px;
  margin-bottom: 0;
`;

export const DiscountPrice = styled.p`
  color: red;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 0;
`;

export const ColorOptions = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 0;
  margin-bottom: 0;
`;

export const ColorImage = styled.img`
  width: 10%;
  height: auto;
  cursor: pointer;
  border: 1px solid ${props => (props.selected ? '#00A86B' : 'gray')};
  border-radius: 10px;
`;

export const SizeOptions = styled.div`
  margin-top: 5px;
  margin-bottom: 0;
`;

export const SizeButton = styled.button`
  margin: 2px;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 10px;
  background-color: ${props => (props.selected ? '#00A86B' : 'white')};
  color: ${props => (props.selected ? 'white' : 'black')};
  border: 1px solid ${props => (props.selected ? '#00A86B' : 'black')};
  cursor: pointer;
`;

export const QuantitySection = styled.div`
  margin-top: 5px;
`;

export const QuantityButton = styled(Button)`
  margin: 0 5px;
`;

export const OutOfStockOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-weight: bold;
`;