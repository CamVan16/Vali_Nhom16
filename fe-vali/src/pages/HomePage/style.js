import styled from 'styled-components';
import { Carousel } from 'antd';

export const Container = styled.div`
  padding: 0 10%;
  margin-top: 5px;
`;

export const StyledCarousel = styled(Carousel)`
  .slick-slide {
    text-align: center;
    height: 500px;
    line-height: 500px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;

export const BrandContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  flex-wrap: wrap;
  width: 100%;
`;

export const BrandItem = styled.div`
  flex: 1 1 calc(10% - 20px);
  padding: 10px 10px;
  margin: 5px;
  border-radius: 12px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center; /* Center the text within the brand item */

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 4px #51C878;
  }
`;

export const BrandTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #00A86B;
  height: 40px;
  color: white;
  margin-top: 5px;
  border-radius: 10px;
`;
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
  width: 200px;
  text-align: center;
  
  span {
    margin-top: 5px;
    font-size: 14px;
  }
`;
export const AboutSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
`;

export const AboutText = styled.div`
  flex: 1;
  margin-right: 20px;

  p {
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
  }
`;

export const AboutImage = styled.img`
  width: 300px;
  border-radius: 10px;
  object-fit: cover;
`;