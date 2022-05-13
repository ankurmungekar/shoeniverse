import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItem] = useState();
  const [cartTotal, setCartTotal] = useState(0);

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        cartTotal,
      }}>
      {children}
    </Context.Provider>
  )
}