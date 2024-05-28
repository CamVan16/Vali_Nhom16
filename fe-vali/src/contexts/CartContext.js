import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  const userID = localStorage.getItem('userID');
  //const userID = useSelector(state => state.user.id);
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/cart/${userID}`);
        if (response.ok) {
          const data = await response.json();
          setCartData(data);
          setCartItemCount(data.items.length);
        } else {
          throw new Error('Failed to fetch cart data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartData();
  }, []);

  const incrementItemCount = () => {
    setCartItemCount(prevCount => prevCount + 1);
  };

  const contextValue = {
    cartItemCount,
    incrementItemCount,
    cartData
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
