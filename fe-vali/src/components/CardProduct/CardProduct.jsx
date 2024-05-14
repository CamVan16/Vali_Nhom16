import React from 'react';
import { Button } from 'antd';
import { StyleName, StrikeThrough, DiscountPrice, DiscountPercent, StyledContent, StyleCard, StyleDis } from './style';
import { Link } from 'react-router-dom';
const CardProduct = ({ product }) => {
  const formattedPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const productPrice = product.price["S"];

  const discountedPrice = productPrice - (productPrice * product.discount / 100);

  return (
    <StyleCard>
      <div>
        <img alt={product.name} src={Object.values(product.img)[0]} style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
      <StyleName>{product.name}</StyleName>
      <StyledContent>
        <StyleDis>
          <StrikeThrough>{formattedPrice(productPrice)}</StrikeThrough>
          <DiscountPercent>{product.discount}%</DiscountPercent>
        </StyleDis>
        <DiscountPrice>{formattedPrice(discountedPrice)}</DiscountPrice>
        <Link to={`/ProductDetail/${product.id}`}>
          <Button type="primary" danger>Xem sản phẩm</Button>
        </Link>
      </StyledContent>
    </StyleCard>
  );
}

export default CardProduct;

