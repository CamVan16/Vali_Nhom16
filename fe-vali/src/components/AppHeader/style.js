import {Row} from 'antd';
import styled from "styled-components";

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`;

export default styled.div`
    .ant-btn {
        background-color: #00a86b; /* Thay đổi màu nền của button */
        border-color: #00a86b; /* Thay đổi màu viền của button */
        color: #fff; /* Màu chữ của button */
        font-weight: bold; /* Tạo độ nét cho font chữ */
    }

    .ant-btn:hover,
    .ant-btn:focus {
        background-color: #008c5a; /* Thay đổi màu nền của button khi hover */
        border-color: #008c5a; /* Thay đổi màu viền của button khi hover */
    }
`;