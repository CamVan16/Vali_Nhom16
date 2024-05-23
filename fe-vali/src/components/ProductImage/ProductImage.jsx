import React from 'react';
import { FeatureContainer, FeatureItem } from './style';
import { FaShieldAlt, FaStore, FaTruck, FaSuitcase } from 'react-icons/fa';
const ProductImage = ({ selectedImage }) => {
  return (
    <div>
      <img src={selectedImage} alt="Product" style={{ maxWidth: '100%', height: 'auto'}} />
      <FeatureContainer>
        <FeatureItem>
          <FaShieldAlt size={20} />
          <span>Bảo hành toàn cầu 05 năm</span>
        </FeatureItem>
        <FeatureItem>
          <FaStore size={20} />
          <span>Hàng hiệu chính hãng</span>
        </FeatureItem>
        <FeatureItem>
          <FaTruck size={20} />
          <span>Ship nhanh hoả tốc</span>
        </FeatureItem>
        <FeatureItem>
          <FaSuitcase size={20} />
          <span>Bảo hành phụ kiện vĩnh viễn</span>
        </FeatureItem>
      </FeatureContainer>
    </div>
  );
}

export default ProductImage;
