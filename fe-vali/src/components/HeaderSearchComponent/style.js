import {Row} from 'antd';
import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperHeader = styled(Row)`
    box-sizing: border-box;  
    padding: 10px 15px;
    background-color: rgb(26,147,255);
    width: 100%;

    @media (max-width: 480px) {
    padding: 10px 0;
  }
`;

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover{
        color: #fff;
        background: rgb(13,92,182);
        span{
            color: #fff;
        }
    }
    color: rgb(11, 116, 229);
    width: 100%;
`

export const WrapperProducts = styled.div`
  display: grid;
  gap: 8px;
  padding: 20px;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (min-width: 1280px)
  {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  @media (max-width: 1280px)
  {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 1024px)
  {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 968px)
  {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px)
  {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

<<<<<<< HEAD
<<<<<<< HEAD
`;
export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    max-width: 200px;
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`;
