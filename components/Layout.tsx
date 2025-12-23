
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { user, logout, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-cameroonGreen rounded-lg flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="text-lg md:text-xl font-bold text-cameroonGreen leading-none block">EduLivre <span className="text-cameroonGold">CM</span></span>
            <span className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest font-semibold">L'excellence pour tous</span>
          </div>
          <div className="sm:hidden">
            <span className="text-lg font-bold text-cameroonGreen">EduLivre</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link to="/" className={`${isActive('/') ? 'text-cameroonGreen' : 'text-gray-600'} hover:text-cameroonGreen transition`}>Accueil</Link>
          <Link to="/catalogue" className={`${isActive('/catalogue') ? 'text-cameroonGreen' : 'text-gray-600'} hover:text-cameroonGreen transition`}>Catalogue</Link>
          {user?.role === 'SELLER' && (
            <Link to="/vendeur" className={`${isActive('/vendeur') ? 'text-cameroonGreen' : 'text-gray-600'} hover:text-cameroonGreen transition`}>Ma Librairie</Link>
          )}
          <Link to="/assistant" className={`${isActive('/assistant') ? 'text-cameroonGreen' : 'text-gray-600'} hover:text-cameroonGreen transition flex items-center`}>
            Assistant IA
            <span className="ml-1 bg-cameroonGold text-white text-[8px] px-1 rounded">PRO</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4">
          <Link to="/panier" className="relative p-2 text-gray-600 hover:text-cameroonGreen transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-cameroonRed text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {totalItems}
              </span>
            )}
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <div className="hidden lg:block text-right">
                <p className="text-xs font-bold leading-none">{user?.shopName || user?.name}</p>
                <div className="flex gap-2">
                  <Link to="/settings" className="text-[10px] text-gray-400 font-bold uppercase hover:text-cameroonGreen">Paramètres</Link>
                  <span className="text-[10px] text-gray-300">•</span>
                  <button onClick={logout} className="text-[10px] text-red-500 font-bold uppercase hover:underline">Quitter</button>
                </div>
              </div>
              <Link to="/settings" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 transition">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Link to="/login" className="text-xs font-bold text-gray-600 hover:text-cameroonGreen px-2">Connexion</Link>
              <Link to="/login" className="bg-cameroonGreen text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-opacity-90">Vendre</Link>
            </div>
          )}

          {/* Mobile Menu Toggle (The "3 Barres") */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-cameroonGreen transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={`text-sm font-semibold flex items-center gap-2 ${isActive('/') ? 'text-cameroonGreen' : 'text-gray-600'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Accueil
            </Link>
            <Link to="/catalogue" onClick={() => setIsMenuOpen(false)} className={`text-sm font-semibold flex items-center gap-2 ${isActive('/catalogue') ? 'text-cameroonGreen' : 'text-gray-600'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              Catalogue
            </Link>
            {user?.role === 'SELLER' && (
              <Link to="/vendeur" onClick={() => setIsMenuOpen(false)} className={`text-sm font-semibold flex items-center gap-2 ${isActive('/vendeur') ? 'text-cameroonGreen' : 'text-gray-600'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                Ma Librairie
              </Link>
            )}
            <Link to="/assistant" onClick={() => setIsMenuOpen(false)} className={`text-sm font-semibold flex items-center gap-2 ${isActive('/assistant') ? 'text-cameroonGreen' : 'text-gray-600'}`}>
               <svg className="w-4 h-4 text-cameroonGold" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z" /></svg>
               Assistant IA (PRO)
            </Link>

            {/* NEW: Settings option in Mobile Menu */}
            {isLoggedIn && (
              <Link to="/settings" onClick={() => setIsMenuOpen(false)} className={`text-sm font-bold flex items-center gap-2 pt-2 border-t border-gray-50 ${isActive('/settings') ? 'text-cameroonGreen' : 'text-gray-900'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Paramètres du Compte
              </Link>
            )}
          </nav>

          {!isLoggedIn && (
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-50">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-gray-600 py-2">Se connecter</Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-cameroonGreen text-white py-3 rounded-xl font-bold text-sm text-center">Devenir Vendeur</Link>
            </div>
          )}
          {isLoggedIn && (
            <div className="pt-2 border-t border-gray-50">
              <p className="text-xs text-gray-400 mb-2">Connecté : {user?.shopName || user?.name}</p>
              <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-sm font-bold text-red-500 uppercase flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Déconnexion
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
/* ... Rest of Footer and Layout as they were ... */
const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 mt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-4 mb-6">
           <img src="https://flagcdn.com/w40/cm.png" alt="Cameroun" className="h-4 rounded-sm" />
        </div>
        <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-widest font-bold">
          EduLivre CM • Solution Éducative Responsable au Cameroun
        </p>
      </div>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
