import styled from 'styled-components';
import { Input, Button } from 'antd';

export const WrapperContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 600px;
    margin: 1% 10%;
    padding: 20px;
    background-image: url('https://salt.tikicdn.com/cache/w800/ts/tmp/5c/81/3a/533f4333065e9459f28d5995c9566841.jpg.webp');
    background-size: cover;
    background-position: center;
    border-radius: 25px;
`;

export const StyleFormContainer = styled.div`
    background: rgba(255, 255, 255, 0.93);
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
`;

export const StyledHeading = styled.h3`
    text-align: center;
    font-size: 30px;
    margin-bottom: 20px;
`;

export const StyleInput = styled(Input)`
    width: 100%;
    &:hover,
    &:focus {
        border-color: #00a86b;
    }
`;

export const StyleInputPassword = styled(Input.Password)`
    width: 100%;
`;

export const StyledButton = styled(Button)`
    background-color: transparent;
    border: 2px solid #00a86b;
    color: #00a86b;
    width: 100%;
    font-weight: bold;
    &:hover,
    &:focus {
        background-color: #00a86b !important;
        border-color: #00a86b;
        color: #fff;
    }
`;
