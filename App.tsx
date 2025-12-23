
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { BooksProvider } from './context/BooksContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Assistant from './pages/Assistant';
import SellerDashboard from './pages/SellerDashboard';
import Auth from './pages/Auth';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BooksProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogue" element={<Catalog />} />
                <Route path="/panier" element={<Cart />} />
                <Route path="/assistant" element={<Assistant />} />
                <Route path="/vendeur" element={<SellerDashboard />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </BooksProvider>
    </AuthProvider>
  );
};

export default App;
