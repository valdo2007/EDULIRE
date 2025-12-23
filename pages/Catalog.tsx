
import React, { useState, useMemo } from 'react';
import { useBooks } from '../context/BooksContext';
import { Level, Book } from '../types';
import { useCart } from '../context/CartContext';

const Catalog: React.FC = () => {
  const { books } = useBooks();
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<Level | 'Tous'>('Tous');
  const [priceRange, setPriceRange] = useState<number>(25000);
  const [showFilters, setShowFilters] = useState(false);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(search.toLowerCase()) || 
        book.subject.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = selectedLevel === 'Tous' || book.level === selectedLevel;
      const matchesPrice = Math.min(book.priceNew, book.priceUsed) <= priceRange;
      return matchesSearch && matchesLevel && matchesPrice;
    });
  }, [books, search, selectedLevel, priceRange]);

  const levels: (Level | 'Tous')[] = ['Tous', 'Maternelle', 'Primaire', 'Secondaire', 'Lycée', 'Université'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filtres */}
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block md:w-1/5 space-y-6`}>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
            <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Filtrer</h3>
            
            <div className="space-y-1 mb-6">
              <label className="block text-[10px] font-black text-gray-300 uppercase mb-2">Niveau</label>
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-bold transition ${
                    selectedLevel === level 
                    ? 'bg-cameroonGreen text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-50">
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-3">Prix Max: {priceRange} F</label>
              <input 
                type="range" 
                min="500" 
                max="25000" 
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-cameroonGreen"
              />
            </div>
          </div>
        </aside>

        {/* Grille de livres */}
        <main className="md:w-4/5">
          <div className="flex gap-2 mb-6">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Rechercher un manuel (Titre, auteur...)" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-5 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cameroonGreen text-sm"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-white p-3 rounded-xl border border-gray-200"
            >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} onAdd={addToCart} />
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-100">
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Aucun manuel trouvé</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const BookCard: React.FC<{ book: Book, onAdd: (b: Book, isNew: boolean) => void }> = ({ book, onAdd }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition group h-full">
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-50">
        <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <div className="absolute top-1 left-1 flex flex-col gap-1">
          <span className="bg-cameroonGreen/90 backdrop-blur-sm text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase">{book.level}</span>
        </div>
      </div>
      <div className="p-3 flex-grow flex flex-col justify-between">
        <div className="mb-2">
          <h3 className="font-bold text-gray-900 text-[10px] md:text-[11px] line-clamp-2 leading-tight min-h-[2rem]">{book.title}</h3>
          <p className="text-[8px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">{book.grade} • {book.subject}</p>
        </div>
        <div className="space-y-1.5 mt-auto">
          <button 
            onClick={() => onAdd(book, true)}
            className="w-full flex items-center justify-between px-2 py-1.5 bg-gray-50 hover:bg-cameroonGreen hover:text-white rounded text-[9px] font-black transition group/btn"
          >
            <span>NEUF</span>
            <span>{book.priceNew} F</span>
          </button>
          <button 
            onClick={() => onAdd(book, false)}
            className="w-full flex items-center justify-between px-2 py-1.5 bg-gray-50 hover:bg-cameroonGold hover:text-white rounded text-[9px] font-black transition"
          >
            <span>OCCASION</span>
            <span>{book.priceUsed} F</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
