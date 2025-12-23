
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooks } from '../context/BooksContext';
import { Level, Book } from '../types';

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { books, addBook, removeBook } = useBooks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrer les livres pour n'afficher que ceux du vendeur actuel
  const myBooks = books.filter(b => b.sellerId === user?.id);

  if (user?.role !== 'SELLER') {
    return <div className="p-20 text-center font-bold">Accès réservé aux vendeurs.</div>;
  }

  const handleAddBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newBook: Book = {
      id: 'book_' + Date.now(),
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      level: formData.get('level') as Level,
      grade: formData.get('grade') as string,
      subject: formData.get('subject') as string,
      priceNew: parseInt(formData.get('priceNew') as string),
      priceUsed: parseInt(formData.get('priceUsed') as string),
      image: `https://picsum.photos/seed/${Date.now()}/400/500`,
      description: formData.get('description') as string,
      sellerId: user.id,
      stock: parseInt(formData.get('stock') as string)
    };

    addBook(newBook);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:row gap-8">
        {/* Profil Vendeur */}
        <div className="lg:w-1/4 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-black text-gray-900 mb-1">{user.shopName}</h2>
            <p className="text-xs text-gray-400 mb-4">{user.address}</p>
            
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase ${
              user.verificationStatus === 'VERIFIED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {user.verificationStatus === 'VERIFIED' ? 'Vendeur Vérifié' : 'En attente de vérification'}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-50 space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400 uppercase">Articles</span>
                <span>{myBooks.length}</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400 uppercase">Ventes</span>
                <span>0 F</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 bg-cameroonGreen text-white rounded-2xl font-black shadow-lg shadow-green-100 hover:scale-[1.02] transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Ajouter au stock
          </button>
        </div>

        {/* Liste des livres - Petits Carreaux */}
        <div className="lg:w-3/4">
          <h3 className="text-2xl font-black text-gray-900 mb-6">Mon Inventaire</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {myBooks.map(book => (
              <div key={book.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group relative">
                <div className="aspect-[3/4] relative overflow-hidden bg-gray-50">
                  <img src={book.image} className="w-full h-full object-cover" alt="" />
                  <button 
                    onClick={() => removeBook(book.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
                <div className="p-2.5 flex-grow">
                  <h4 className="text-[11px] font-bold text-gray-900 line-clamp-1 leading-tight">{book.title}</h4>
                  <p className="text-[9px] text-gray-400 mt-1">{book.grade}</p>
                  <div className="mt-2 flex justify-between items-center text-[10px] font-black">
                    <span className="text-cameroonGreen">{book.priceUsed} F</span>
                    <span className="text-gray-300 font-bold">Stock: {book.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {myBooks.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-bold">Aucun livre dans votre librairie.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Ajout */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8">
            <h3 className="text-2xl font-black mb-6">Nouveau Manuel</h3>
            <form onSubmit={handleAddBook} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Titre</label>
                <input name="title" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="Ex: Excellence en Math" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Niveau</label>
                  <select name="level" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none">
                    <option value="Maternelle">Maternelle</option>
                    <option value="Primaire">Primaire</option>
                    <option value="Secondaire">Secondaire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Classe</label>
                  <input name="grade" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="Ex: CM2" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Prix Neuf (F)</label>
                  <input name="priceNew" type="number" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Prix Occas (F)</label>
                  <input name="priceUsed" type="number" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" />
                </div>
                <div className="col-span-2">
                   <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Stock Disponible</label>
                   <input name="stock" type="number" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" defaultValue="1" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-3 text-gray-400 font-bold">Annuler</button>
                <button type="submit" className="flex-grow py-3 bg-cameroonGreen text-white rounded-2xl font-bold">Publier</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
