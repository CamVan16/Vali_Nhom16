import React from 'react';
import { StyleName, StrikeThrough, DiscountPrice, DiscountPercent, StyledContent, StyleCard, StyleDis, StyledButton } from './style';
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
        <img alt={product.name} src={Object.values(product.img)[0]} style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }} />
      </div>
      <StyleName>{product.name}</StyleName>
      <StyledContent>
        <StyleDis>
          {product.discount > 0 ? (
            <>
              <StrikeThrough>{formattedPrice(productPrice)}</StrikeThrough>
              <DiscountPercent>{product.discount}%</DiscountPercent>
            </>
          ) : (
            <div style={{ height: '1em' }}></div>
          )}
        </StyleDis>
        <DiscountPrice>
          {product.discount > 0 ? formattedPrice(discountedPrice) : formattedPrice(productPrice)}
        </DiscountPrice>
        <Link to={`/ProductDetail/${product.id}`} style={{ display: 'block', width: '100%' }}>
          <StyledButton type="primary" danger style={{ width: '100%' }}>Xem sản phẩm</StyledButton>
        </Link>
      </StyledContent>
    </StyleCard>
  );
}

export default CardProduct;