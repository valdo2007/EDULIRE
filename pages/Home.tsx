
import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';

const Home: React.FC = () => {
  const { books } = useBooks();
  const featuredBooks = books.slice(0, 10); // Plus de livres sur l'accueil

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-white pt-10 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center bg-cameroonGreen/10 text-cameroonGreen px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
              L'éducation à portée de clic 🇨🇲
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-none">
              Vos manuels <br />
              <span className="text-cameroonGreen">en un clic.</span>
            </h1>
            <p className="text-gray-500 max-w-md mx-auto md:mx-0 text-lg">
              Économisez jusqu'à 60% sur vos listes scolaires avec nos livres d'occasion certifiés.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/catalogue" className="px-10 py-5 bg-cameroonGreen text-white rounded-2xl font-black shadow-xl shadow-green-100 hover:scale-105 transition text-center">
                Explorer le Catalogue
              </Link>
              <Link to="/login" className="px-10 py-5 border-2 border-cameroonGold text-cameroonGold rounded-2xl font-black hover:bg-cameroonGold hover:text-white transition text-center">
                Vendre mes livres
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-16 md:mt-0 relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-cameroonGreen/5 rounded-full blur-3xl"></div>
            <img 
              src="https://picsum.photos/seed/edulivre2/800/600" 
              alt="Education Cameroun" 
              className="rounded-[3rem] shadow-2xl border-8 border-white relative z-10 rotate-3"
            />
          </div>
        </div>
      </section>

      {/* Featured Books - Petits Carreaux */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Arrivages Récents</h2>
            <p className="text-gray-400 font-medium mt-1">Les derniers manuels ajoutés par nos librairies partenaires.</p>
          </div>
          <Link to="/catalogue" className="hidden sm:flex items-center text-cameroonGreen font-black text-xs uppercase tracking-widest hover:gap-2 transition-all">
            Voir tout le catalogue <span className="ml-2">→</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {featuredBooks.map(book => (
            <Link to="/catalogue" key={book.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="aspect-[3/4] relative overflow-hidden bg-gray-50">
                <img src={book.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="" />
                <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black shadow-sm text-cameroonGreen">
                  {book.priceUsed} F
                </div>
              </div>
              <div className="p-3">
                <h4 className="text-[11px] font-black text-gray-900 line-clamp-1 uppercase tracking-tight">{book.title}</h4>
                <p className="text-[9px] text-gray-400 font-bold mt-1">{book.grade}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
            <Link to="/catalogue" className="inline-block px-8 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-xs">VOIR TOUT LE CATALOGUE</Link>
        </div>
      </section>

      {/* CTA Vendeur */}
      <section className="container mx-auto px-4">
        <div className="bg-cameroonGreen rounded-[3rem] p-10 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="md:w-2/3 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Vous êtes une librairie ?</h2>
            <p className="text-green-100 text-lg opacity-80">Rejoignez la plus grande plateforme de vente de manuels scolaires au Cameroun. Augmentez vos ventes dès aujourd'hui.</p>
          </div>
          <Link to="/login" className="px-10 py-5 bg-white text-cameroonGreen rounded-2xl font-black hover:bg-cameroonGold hover:text-white transition whitespace-nowrap shadow-xl relative z-10">
            Commencer à vendre
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
