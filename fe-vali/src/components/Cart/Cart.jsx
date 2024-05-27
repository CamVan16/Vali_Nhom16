import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext'; 

const Cart = () => {
  const navigate = useNavigate();
  const { cartItemCount } = useCart();

  const handleClick = () => {
    navigate('/CartProductPage');  
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <ShoppingCartOutlined 
        style={{ fontSize: '24px', color: '#08c', cursor: 'pointer', color: "white" }} 
        onClick={handleClick}
      />
      {cartItemCount >= 0 && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          backgroundColor: 'red',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '12px'
        }}>
          {cartItemCount}
        </div>
      )}
    </div>
  );
}

export default Cart;
