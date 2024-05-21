import React, { useEffect, useState } from 'react';
import { List, Button, notification, Select, InputNumber, Checkbox } from 'antd';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { Option } = Select;

const CartProductPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  const userID = localStorage.getItem('userID');
  //const userID = useSelector(state => state.user._id);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/cart/${userID}`);
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items);
          await fetchProductDetails(data.items);
        } else {
          throw new Error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        notification.error({ message: `Failed to fetch cart items: ${error.message}` });
      }
    };

    const fetchProductDetails = async (items) => {
      const details = {};
      for (const item of items) {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/product/get/${item.productId}`);
          if (response.ok) {
            const productData = await response.json();
            details[item.productId] = productData;
          } else {
            throw new Error(`Failed to fetch details for product ID ${item.productId}`);
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
          notification.error({ message: `Failed to fetch product details: ${error.message}` });
        }
      }
      setProductDetails(details);
    };

    fetchCartItems();
  }, [cartItemCount]);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/cart/${userID}/item/${itemId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove product from cart');
      }

      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
      notification.success({ message: 'Product removed from cart successfully' });
    } catch (error) {
      console.error('Error removing product from cart:', error);
      notification.error({ message: `Failed to remove product from cart: ${error.message}` });
    }
  };

  const handleUpdateCartItem = async (updatedItem) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/cart/${userID}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update cart item');
      }

      const updatedCartItems = await response.json();
      setCartItems(updatedCartItems.items);
      notification.success({ message: 'Cart updated successfully' });
    } catch (error) {
      console.error('Error updating cart:', error);
      notification.error({ message: `Failed to update cart item: ${error.message}` });
    }
  };

  const getPriceBySize = (product, size) => {
    return product.price[size] || 0;
  };

  const handleSizeChange = (item, size) => {
    const updatedItem = { ...item, size };
    handleUpdateCartItem(updatedItem);
  };

  const handleColorChange = (item, color) => {
    const updatedItem = { ...item, color };
    handleUpdateCartItem(updatedItem);
  };

  const handleQuantityChange = (item, quantity) => {
    const updatedItem = { ...item, quantity };
    handleUpdateCartItem(updatedItem);
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const allItemIds = cartItems.map(item => item.id);
      setSelectedItems(allItemIds);
    } else {
      setSelectedItems([]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = cartItems.find(item => item.id === itemId);
      const product = productDetails[item.productId];
      if (!product) return total;

      const itemPrice = getPriceBySize(product, item.size);
      const discountedPrice = itemPrice - (itemPrice * (product.discount / 100));
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  // const handleCheckout = () => {
  //   navigate('/OrderPage', { state: { selectedItems } });
  // };
  const handleCheckout = () => {
    const selectedProductDetails = selectedItems.map(itemId => {
      const item = cartItems.find(item => item.id === itemId);
      const product = productDetails[item.productId];
      return {
        ...item,
        productName: product.name,
        productImg: product.img[item.color],
        productPrice: getPriceBySize(product, item.size) - (getPriceBySize(product, item.size) * (product.discount / 100)),
      };
    });
    navigate('/OrderPage', { state: { selectedItems: selectedProductDetails } });
  };
  

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ flex: 2 }}>
        <h1>Giỏ hàng của bạn</h1>
        <Checkbox
          onChange={e => handleSelectAll(e.target.checked)}
          checked={selectedItems.length === cartItems.length && cartItems.length > 0}
        >
          Chọn tất cả
        </Checkbox>
        {cartItems.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={item => {
              const product = productDetails[item.productId];
              if (!product) return null;

              const discountedPrice =
                getPriceBySize(product, item.size) -
                (getPriceBySize(product, item.size) * (product.discount / 100));

              return (
                <List.Item
                  actions={[
                    <Button danger onClick={() => handleRemoveItem(item.id)}>Remove</Button>
                  ]}
                >
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={e => handleSelectItem(item.id, e.target.checked)}
                  />
                  <List.Item.Meta
                    avatar={<img src={product.img[item.color]} alt={item.color} style={{ width: '50px', height: 'auto' }} />}
                    title={product.name}
                    description={
                      <>
                        <Select
                          value={item.size}
                          onChange={(value) => handleSizeChange(item, value)}
                          style={{ marginRight: '10px' }}
                        >
                          {Object.keys(product.price).map((size, index) => (
                            <Option key={index} value={size}>{size}</Option>
                          ))}
                        </Select>
                        <Select
                          value={item.color}
                          onChange={(value) => handleColorChange(item, value)}
                          style={{ marginRight: '10px' }}
                        >
                          {Object.keys(product.img).map((color, index) => (
                            <Option key={index} value={color}>{color}</Option>
                          ))}
                        </Select>
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(value) => handleQuantityChange(item, value)}
                        />
                      </>
                    }
                  />
                  <div>{discountedPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                </List.Item>
              );
            }}
          />
        ) : (
          <p>Giỏ hàng của bạn đang trống</p>
        )}
      </div>
      <div style={{ flex: 1, padding: '20px', border: '1px solid #ddd', borderRadius: '4px', marginLeft: '20px' }}>
        <h2>Tạm tính</h2>
        <p>Tổng tiền: {calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
        <Button type="primary" onClick={handleCheckout} disabled={selectedItems.length === 0}>
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default CartProductPage;

