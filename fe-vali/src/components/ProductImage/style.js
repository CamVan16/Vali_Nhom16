import styled from "styled-components";
export const FeatureContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #00A86B;
  padding: 10px;
  border-radius: 10px;
  margin-top: 5px;
`;

export const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100px;
  text-align: center;
  
  span {
    margin-top: 5px;
    font-size: 14px;
  }
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