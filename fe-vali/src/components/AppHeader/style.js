import {Row} from 'antd';
import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`;

export const StyledButton = styled.div`
  cursor: pointer;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 8px 16px;
  background-color: rgba(0, 168, 107, 0.7); // Màu của header với opacity 0.7
  max-height: 36px;
  border-radius: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00A86B; // Màu của header khi hover
    color: #fff; // Màu chữ trắng khi hover
  }
`;