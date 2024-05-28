import React, { useState, useEffect } from 'react';
import { StyledCarousel, Container, BrandContainer, BrandItem, BrandTag, FeatureContainer, FeatureItem, AboutSection, AboutText, AboutImage } from './style';
import { useNavigate } from 'react-router-dom';
import CardProduct from '../../components/CardProduct/CardProduct';
import { Button } from 'antd';
import { FaShieldAlt, FaStore, FaTruck, FaSuitcase } from 'react-icons/fa';
const searchButtonStyles = {
  backgroundColor: 'transparent',
  color: '#fff',
  height: '35px',

  border: '1px solid #00a86b',
  transition: 'background-color 0.3s, border-color 0.3s',
};

const searchButtonHoverStyles = {
  backgroundColor: '#02ce83',
  borderColor: '#02ce83',
  color: '#fff',
  weight:'35px',

};
const HomePage = () => {
  const navigate = useNavigate();
  const [latestProducts, setLatestProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/product/getall')
      .then(response => response.json())
      .then(data => {
        const latest = data.slice(-8);
        setLatestProducts(latest);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleBanner1Click = () => {
    navigate('ProductPages');
  };

  const handleBanner2Click = () => {
    navigate('/ProductPages', { state: { discount: 30 } });
  };

  const handleBrandClick = (brand) => {
    navigate('/ProductPages', { state: { brand } });
  };

  const handleViewMoreClick = () => {
    navigate('/ProductPages');
  };

  const brands = ['Pisani', 'Epoch', 'Austin Reed', 'Legend Walker', 'Herschel', 'Larita', 'Heys'];

  return (
    <Container>
      <StyledCarousel autoplay>
        <div onClick={handleBanner1Click}>
          <img src="banner1.png" alt="banner1" />
        </div>
        <div onClick={handleBanner2Click}>
          <img src="banner2.png" alt="banner2" />
        </div>
      </StyledCarousel>
      <BrandTag>NHỮNG DÒNG THƯƠNG HIỆU ĐƯỢC ƯA CHUỘNG NHẤT</BrandTag>
      <BrandContainer>
        {brands.map((brand, index) => (
          <BrandItem key={index} onClick={() => handleBrandClick(brand)}>
            {brand}
          </BrandItem>
        ))}
      </BrandContainer>
      <BrandTag>
        <div>NHỮNG DÒNG SẢN PHẨM MỚI NHẤT</div>
        <Button type="link"
          onClick={handleViewMoreClick}
          style={isHovered ? { ...searchButtonStyles, ...searchButtonHoverStyles } : searchButtonStyles}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >Xem thêm</Button>
      </BrandTag>
      <BrandContainer>
        {latestProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </BrandContainer>
      <BrandTag>VỀ LUCKY CHÚNG TÔI</BrandTag>
      <AboutSection>
        <AboutText>
          <p>
            Chào mừng bạn đến với LUGKY - cửa hàng vali uy tín và chất lượng hàng đầu! Tại LUGKY, chúng tôi cam kết mang đến cho bạn những sản phẩm vali đa dạng về mẫu mã, phong cách và chất lượng vượt trội. Với nhiều năm kinh nghiệm trong ngành, chúng tôi luôn đặt khách hàng lên hàng đầu, cung cấp các dịch vụ hậu mãi tốt nhất và chế độ bảo hành tuyệt vời. Hãy đến với LUGKY để trải nghiệm mua sắm hoàn hảo và tìm kiếm cho mình chiếc vali ưng ý nhất!
          </p>
        </AboutText>
        <AboutImage src='about.png' alt='about' />
      </AboutSection>
      <FeatureContainer>
        <FeatureItem>
          <FaShieldAlt size={30} />
          <span>Bảo hành toàn cầu 05 năm</span>
        </FeatureItem>
        <FeatureItem>
          <FaStore size={30} />
          <span>Hàng hiệu chính hãng</span>
        </FeatureItem>
        <FeatureItem>
          <FaTruck size={30} />
          <span>Ship nhanh hoả tốc</span>
        </FeatureItem>
        <FeatureItem>
          <FaSuitcase size={30} />
          <span>Bảo hành phụ kiện vĩnh viễn</span>
        </FeatureItem>
      </FeatureContainer>
    </Container>
  );
};

export default HomePage;
