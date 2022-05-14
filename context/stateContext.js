import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItem] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addProduct = (product, quantity) => {
    const isProductInCart = cartItems && cartItems.find((item) => item._id === product._id);
    setCartTotal((prevCartTotal) => prevCartTotal + (product.price * quantity))
    if (isProductInCart) {
      const updateCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + quantity
          }
        }
      });
      setCartItem(updateCartItems);
    } else {
      product.quantity = quantity;
      setCartItem([...cartItems, { ...product }]);
    }
    toast.success('Product Added Succesfully');
    console.log(cartTotal);
    console.log(cartItems);
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        cartTotal,
        addProduct
      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);