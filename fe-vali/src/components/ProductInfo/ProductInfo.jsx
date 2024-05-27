import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom'; 
import {
  Container, ProductTitle, Price, DiscountPrice, ColorImage, ColorOptions,
  SizeButton, QuantityButton, QuantitySection, SizeOptions
} from './style';

const ProductInfo = ({ id, name, price, discount, img = {}, sizes = [], stock = {}, description, onImageClick, onSizeClick, selectedSize }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(Object.keys(img)[0]);
  const [currentStock, setCurrentStock] = useState(0);
  const [availableSizes, setAvailableSizes] = useState(sizes);
  const [availableColors, setAvailableColors] = useState(Object.keys(img));
  const { incrementItemCount } = useCart();
  const discountedPrice = price - (price * discount / 100);
  const userID = localStorage.getItem('userID');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const stockForSelected = stock[selectedColor]?.[selectedSize];
      setCurrentStock(stockForSelected || 0);
    }
  }, [selectedColor, selectedSize, stock]);

  useEffect(() => {
    if (selectedColor) {
      const sizesWithStock = sizes.filter(size => stock[selectedColor]?.[size] > 0);
      setAvailableSizes(sizesWithStock);
    }
  }, [selectedColor, sizes, stock]);

  useEffect(() => {
    if (selectedSize) {
      const colorsWithStock = Object.keys(img).filter(color => stock[color]?.[selectedSize] > 0);
      setAvailableColors(colorsWithStock);
    }
  }, [selectedSize, img, stock]);

  const handleIncrease = () => {
    if (quantity < currentStock) {
      setQuantity(quantity + 1);
    } else {
      notification.error({ message: 'Số lượng vượt quá tồn kho' });
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!userID) {
      navigate('/SignIn');
      return;
    }

    if (!selectedColor || !selectedSize) {
      notification.error({ message: 'Vui lòng chọn màu sắc và kích thước' });
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/v1/cart/${userID}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: id,
          color: selectedColor,
          size: selectedSize,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product to cart');
      }

      const itemExists = await response.json();

      if (!itemExists) {
        incrementItemCount();
      }

      notification.success({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      notification.error({ message: `Failed to add product to cart: ${error.message}` });
    }
  };

  return (
    <Container>
      <ProductTitle>{name}</ProductTitle>
      {discount > 0 ? (
        <>
          <Price discount>Giá gốc: {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Price>
          <DiscountPrice>Giá sau giảm: {discountedPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</DiscountPrice>
          <p>Giảm giá: {discount}%</p>
        </>
      ) : (
        <Price>Giá: {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Price>
      )}
      <ColorOptions>
        <p>Màu sắc:</p>
        {Object.keys(img).map((color) => (
          <ColorImage
            key={color}
            src={img[color]}
            alt={color}
            selected={selectedColor === color}
            onClick={() => { setSelectedColor(color); onImageClick(img[color]); }}
            style={{ opacity: availableColors.includes(color) ? 1 : 0.5, pointerEvents: availableColors.includes(color) ? 'auto' : 'none' }}
          />
        ))}
      </ColorOptions>
      <SizeOptions>
        <p>Kích thước:</p>
        {sizes.map((size) => (
          <SizeButton
            key={size}
            selected={size === selectedSize}
            onClick={() => { onSizeClick(size); }}
            style={{ opacity: availableSizes.includes(size) ? 1 : 0.5, pointerEvents: availableSizes.includes(size) ? 'auto' : 'none' }}
          >
            {size}
          </SizeButton>
        ))}
      </SizeOptions>
      <QuantitySection>
        <p>Tồn kho: {currentStock}</p>
        <p>Số lượng:</p>
        <QuantityButton onClick={handleDecrease} disabled={quantity <= 1}>-</QuantityButton>
        <span style={{ margin: '0 10px', fontSize: '16px' }}>{quantity}</span>
        <QuantityButton onClick={handleIncrease}>+</QuantityButton>
      </QuantitySection>
      <Button type="primary" danger style={{ marginTop: '10px' }} onClick={handleAddToCart}>Thêm sản phẩm</Button>
    </Container>
  );
};

export default ProductInfo;
