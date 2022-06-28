import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const Context = createContext();

export const StateContext = ({ children }) => {
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
  }

  const removeProduct = (product) => {
    const foundProduct = cartItems && cartItems.find((item) => item._id === product._id);
    const updatedCartItems = cartItems && cartItems.filter((item) => item._id !== foundProduct._id);
    setCartItem(updatedCartItems);
    setCartTotal((prevCartTotal) => prevCartTotal - (foundProduct.price * foundProduct.quantity))
  }

  const updateQuantity = (id, type) => {
    console.log(id);
    const updatedCartItems = [...cartItems];
    const index = cartItems && cartItems.findIndex((item) => item._id === id);
    if (type === 'INCREMENT') {
      updatedCartItems[index].quantity = updatedCartItems[index].quantity + 1;
      setCartItem(updatedCartItems);
      setCartTotal((prevCartTotal) => prevCartTotal + updatedCartItems[index].price)
    } else {
      if (updatedCartItems[index].quantity > 1) {
        updatedCartItems[index].quantity = updatedCartItems[index].quantity - 1;
        setCartItem(updatedCartItems);
        setCartTotal((prevCartTotal) => prevCartTotal - updatedCartItems[index].price)
      }
    }
  }

  return (
    <Context.Provider
      value={{
        cartItems,
        cartTotal,
        addProduct,
        removeProduct,
        updateQuantity
      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);