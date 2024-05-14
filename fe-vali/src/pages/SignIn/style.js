import styled from 'styled-components'
import { Input } from 'antd'
export const WrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-contents: center;
    height: 600px;
`

export const StyleLeftCon = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px solid #1A93FF; 
    @media (max-width: 968px) {
        display: none; 
    }
`


export const StyleRightCon = styled.div`
    flex: 1;
    justify-content: center;
    align-items: center;
    @media (max-width: 968px) {
        padding: 20px; 
    }
`
export const StyleInput = styled(Input)`
    width: 100%;
`
export const StyleInputPassword = styled(Input.Password)`
    width: 100%;
`