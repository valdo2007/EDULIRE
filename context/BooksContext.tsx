
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../types';
import { MOCK_BOOKS } from '../data/mockBooks';

interface BooksContextType {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('edulivre_books');
    return saved ? JSON.parse(saved) : MOCK_BOOKS;
  });

  useEffect(() => {
    localStorage.setItem('edulivre_books', JSON.stringify(books));
  }, [books]);

  const addBook = (newBook: Book) => {
    setBooks(prev => [newBook, ...prev]);
  };

  const removeBook = (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <BooksContext.Provider value={{ books, addBook, removeBook }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) throw new Error('useBooks must be used within a BooksProvider');
  return context;
};
