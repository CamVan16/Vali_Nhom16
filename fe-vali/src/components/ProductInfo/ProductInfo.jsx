import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { useCart } from '../../contexts/CartContext';

const ProductInfo = ({ id, name, price, discount, img = {}, sizes = [], stock = {}, description, onImageClick, onSizeClick, selectedSize }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(Object.keys(img)[0]);
  const [currentStock, setCurrentStock] = useState(0);
  const { incrementItemCount } = useCart();
  const discountedPrice = price - (price * discount / 100);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const stockForSelected = stock[selectedColor]?.[selectedSize];
      setCurrentStock(stockForSelected || 0);
    }
  }, [selectedColor, selectedSize, stock]);

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
    if (!selectedColor || !selectedSize) {
      notification.error({ message: 'Please select a color and size' });
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
    <div style={{ border: '1px solid #ddd', padding: '10px' }}>
      <h2>{name}</h2>
      {discount > 0 ? (
        <>
          <p>Giá gốc: <span style={{ textDecoration: 'line-through' }}>{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
          <p style={{ color: 'red', fontSize: '20px' }}>Giá sau giảm: {discountedPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
          <p>Giảm giá: {discount}%</p>
        </>
      ) : (
        <p>Giá: {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
      )}
      <div style={{ display: 'flex', gap: '2px' }}>
        <p>Màu sắc:</p>
        {Object.keys(img).map((color) => (
          <img
            key={color}
            src={img[color]}
            alt={color}
            style={{ width: '10%', height: 'auto', cursor: 'pointer', border: '1px solid gray', borderRadius: '10px', borderColor: selectedColor === color ? 'blue' : 'gray' }}
            onClick={() => { setSelectedColor(color); onImageClick(img[color]); }}
          />
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <p>Kích thước:</p>
        {sizes.map((size) => (
          <button
            key={size}
            style={{ margin: '2px', padding: '10px 20px', fontSize: '14px', borderRadius: '10px', backgroundColor: selectedSize === size ? 'blue' : 'white', color: selectedSize === size ? 'white' : 'black' }}
            onClick={() => { onSizeClick(size); }}
          >
            {size}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <p>Tồn kho: {currentStock}</p>
        <p>Số lượng:</p>
        <Button onClick={handleDecrease} disabled={quantity <= 1}>-</Button>
        <span style={{ margin: '0 10px', fontSize: '16px' }}>{quantity}</span>
        <Button onClick={handleIncrease}>+</Button>
      </div>
      <Button type="primary" danger style={{ marginTop: '10px' }} onClick={handleAddToCart}>Thêm sản phẩm</Button>
    </div>
  );
};

export default ProductInfo;



