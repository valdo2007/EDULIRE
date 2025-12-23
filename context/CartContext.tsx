
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book, CartItem, CartContextType } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('edulivre_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('edulivre_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book: Book, isNew: boolean) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id && item.isNew === isNew);
      if (existing) {
        return prev.map(item => 
          (item.id === book.id && item.isNew === isNew) 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { ...book, quantity: 1, isNew }];
    });
  };

  const removeFromCart = (id: string, isNew: boolean) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.isNew === isNew)));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => 
    acc + (item.quantity * (item.isNew ? item.priceNew : item.priceUsed)), 0
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
