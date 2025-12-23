
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'shop' | 'orders' | 'danger' | 'project'>('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      logout();
      navigate('/');
    }
  };

  const handleDownloadDossier = () => {
    window.print();
  };

  if (!user) return <div className="p-20 text-center font-bold">Veuillez vous connecter.</div>;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8 print:block">
        {/* Sidebar Navigation - Hidden on Print */}
        <aside className="md:w-1/4 print:hidden">
          <div className="sticky top-24 space-y-4">
            <h1 className="text-3xl font-black text-gray-900 mb-6 hidden md:block">Paramètres</h1>
            <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-4 md:pb-0">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`whitespace-nowrap flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'profile' ? 'bg-cameroonGreen text-white shadow-lg' : 'text-gray-500 hover:bg-white border border-transparent hover:border-gray-100'}`}
              >
                <span className="text-lg">👤</span> <span className="hidden sm:inline">Mon Profil</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('project')}
                className={`whitespace-nowrap flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'project' ? 'bg-cameroonGold text-white shadow-lg' : 'text-gray-500 hover:bg-white border border-transparent hover:border-gray-100'}`}
              >
                <span className="text-lg">📄</span> <span className="hidden sm:inline">Dossier Projet</span>
              </button>

              <button 
                onClick={() => setActiveTab('orders')}
                className={`whitespace-nowrap flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-cameroonGreen text-white shadow-lg' : 'text-gray-500 hover:bg-white border border-transparent hover:border-gray-100'}`}
              >
                <span className="text-lg">📦</span> <span className="hidden sm:inline">{user.role === 'SELLER' ? 'Commandes Reçues' : 'Mes Commandes'}</span>
              </button>

              <button 
                onClick={() => setActiveTab('notifications')}
                className={`whitespace-nowrap flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'notifications' ? 'bg-cameroonGreen text-white shadow-lg' : 'text-gray-500 hover:bg-white border border-transparent hover:border-gray-100'}`}
              >
                <span className="text-lg">🔔</span> <span className="hidden sm:inline">Notifications</span>
              </button>

              {user.role === 'SELLER' && (
                <button 
                  onClick={() => setActiveTab('shop')}
                  className={`whitespace-nowrap flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'shop' ? 'bg-cameroonGreen text-white shadow-lg' : 'text-gray-500 hover:bg-white border border-transparent hover:border-gray-100'}`}
                >
                  <span className="text-lg">🏪</span> <span className="hidden sm:inline">Ma Boutique</span>
                </button>
              )}

              <button 
                onClick={() => setActiveTab('danger')}
                className={`whitespace-nowrap flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'danger' ? 'bg-red-500 text-white shadow-lg' : 'text-red-400 hover:bg-red-50'}`}
              >
                <span className="text-lg">⚠️</span> <span className="hidden sm:inline">Sécurité</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="md:w-3/4 print:w-full">
          <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0">
            
            {/* Project Dossier Tab - THE PREVIEW DOWNLOAD SECTION */}
            {activeTab === 'project' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Dossier de Présentation</h3>
                  <button 
                    onClick={handleDownloadDossier}
                    className="flex items-center gap-2 px-6 py-3 bg-cameroonGold text-white rounded-xl font-black text-xs shadow-lg hover:scale-105 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    TÉLÉCHARGER LE PREVIEW (PDF)
                  </button>
                </div>

                <div id="project-document" className="bg-gray-50 p-6 md:p-12 rounded-[2rem] border border-gray-200 print:bg-white print:p-0">
                  {/* Document Header */}
                  <div className="text-center mb-12 border-b-4 border-cameroonGreen pb-8">
                    <div className="w-16 h-16 bg-cameroonGreen rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                       <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <h2 className="text-4xl font-black text-cameroonGreen">EDULIVRE CM</h2>
                    <p className="text-cameroonGold font-bold uppercase tracking-widest mt-2">Dossier de Présentation Officiel</p>
                    <p className="text-gray-400 text-sm mt-4">Document généré le {new Date().toLocaleDateString('fr-FR')}</p>
                  </div>

                  {/* Document Content */}
                  <div className="space-y-10 text-gray-800 leading-relaxed">
                    <section>
                      <h4 className="text-lg font-black text-gray-900 border-l-4 border-cameroonGold pl-4 mb-4">1. VISION DU PROJET</h4>
                      <p className="text-sm">
                        EduLivre CM est une plateforme e-commerce innovante conçue pour moderniser le marché du livre scolaire au Cameroun. 
                        Notre mission est de rendre l'éducation accessible à toutes les bourses en facilitant l'achat de livres neufs et 
                        en créant un circuit sécurisé pour les livres de seconde main (occasion).
                      </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-black text-gray-900 border-l-4 border-cameroonGold pl-4 mb-4">2. FONCTIONNALITÉS CLÉS</h4>
                        <ul className="text-sm space-y-2 list-disc pl-5 font-medium">
                          <li>Catalogue complet (Maternelle à Université)</li>
                          <li>Option Neuf / Occasion pour chaque article</li>
                          <li>Système de vendeurs (Librairies vérifiées)</li>
                          <li>Vérification légale des marchands (CNI, RCCM)</li>
                          <li>Calcul automatique des frais de livraison</li>
                          <li>Assistant IA pour le conseil pédagogique</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900 border-l-4 border-cameroonGold pl-4 mb-4">3. IMPACT SOCIAL</h4>
                        <p className="text-sm">
                          En encourageant la réutilisation des manuels scolaires, EduLivre CM permet aux familles camerounaises 
                          d'économiser jusqu'à 60% sur le budget de la rentrée scolaire tout en soutenant l'économie locale des libraires de quartier.
                        </p>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-lg font-black text-gray-900 border-l-4 border-cameroonGold pl-4 mb-4">4. MODÈLE ÉCONOMIQUE</h4>
                      <p className="text-sm mb-4">Le projet repose sur trois piliers :</p>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                          <p className="font-black text-cameroonGreen">Commissions</p>
                          <p className="text-[10px] text-gray-500">Sur chaque vente réalisée</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                          <p className="font-black text-cameroonGreen">Logistique</p>
                          <p className="text-[10px] text-gray-500">Service de livraison intégré</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                          <p className="font-black text-cameroonGreen">Visibilité</p>
                          <p className="text-[10px] text-gray-500">Options premium pour libraires</p>
                        </div>
                      </div>
                    </section>

                    <section className="pt-8 border-t border-gray-200 text-center italic text-gray-400 text-[10px]">
                      <p>Ce document est une propriété intellectuelle d'EduLivre CM. Toute reproduction doit citer la source.</p>
                    </section>
                  </div>
                </div>
              </div>
            )}

            {/* Profil Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSave} className="space-y-8 animate-in slide-in-from-right duration-300">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-6">Informations du Compte</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Nom complet</label>
                      <input type="text" defaultValue={user.name} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-cameroonGreen outline-none font-medium" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Adresse Email</label>
                      <input type="email" defaultValue={user.email} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-cameroonGreen outline-none font-medium" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Adresse de livraison par défaut</label>
                      <input type="text" placeholder="Quartier, Rue, Ville" defaultValue={user.address} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-cameroonGreen outline-none font-medium" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                  <h3 className="text-xl font-black text-gray-900 mb-6">Sécurité</h3>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Nouveau Mot de passe</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-cameroonGreen outline-none font-medium" />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <button type="submit" className="w-full py-4 bg-cameroonGreen text-white rounded-2xl font-black shadow-xl shadow-green-100 hover:scale-[1.01] transition-all">
                    Enregistrer les changements
                  </button>
                  {saved && <span className="text-sm font-bold text-green-500 animate-pulse">✓ Profil mis à jour</span>}
                </div>
              </form>
            )}

            {/* Other tabs remain unchanged but wrapped in animate-in... */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <h3 className="text-xl font-black text-gray-900 mb-6">
                  {user.role === 'SELLER' ? 'Dernières commandes reçues' : 'Historique de mes commandes'}
                </h3>
                
                <div className="space-y-4">
                  {[1, 2].map(order => (
                    <div key={order} className="p-5 bg-gray-50 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">📖</div>
                        <div>
                          <p className="font-black text-gray-900">Commande #ORD-2024-{order}42</p>
                          <p className="text-xs text-gray-400 font-bold">12 Mai 2024 • 3 articles</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-right">
                          <p className="font-black text-cameroonGreen">14 500 F</p>
                          <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${order === 1 ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                            {order === 1 ? 'Livré' : 'En cours'}
                          </span>
                        </div>
                        <button className="p-2 hover:bg-white rounded-full transition"><svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <button className="text-xs font-black text-cameroonGold uppercase tracking-widest hover:underline">Voir tout l'historique</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <form onSubmit={handleSave} className="space-y-8 animate-in slide-in-from-right duration-300">
                <h3 className="text-xl font-black text-gray-900 mb-6">Canaux de communication</h3>
                <div className="space-y-3">
                  {[
                    { title: "Alertes Email", desc: "Recevoir les confirmations de commande par mail", checked: true },
                    { title: "Notifications SMS", desc: "Suivi de livraison en temps réel sur mon mobile", checked: false },
                    { title: "Alertes Stocks", desc: "M'avertir quand un livre est de nouveau disponible", checked: true },
                    { title: "Offres Promo", desc: "Recevoir les meilleures réductions de la rentrée", checked: true },
                  ].map((notif, idx) => (
                    <label key={idx} className="flex items-center justify-between p-5 bg-gray-50 rounded-[2rem] border border-gray-100 cursor-pointer hover:bg-white transition group">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 group-hover:text-cameroonGreen transition">{notif.title}</span>
                        <span className="text-[10px] text-gray-400 font-bold">{notif.desc}</span>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" defaultChecked={notif.checked} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer accent-cameroonGreen" />
                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-200 cursor-pointer"></label>
                      </div>
                    </label>
                  ))}
                </div>
                <button type="submit" className="w-full py-4 bg-cameroonGreen text-white rounded-2xl font-black shadow-xl shadow-green-100">Mettre à jour mes préférences</button>
              </form>
            )}

            {activeTab === 'shop' && user.role === 'SELLER' && (
              <form onSubmit={handleSave} className="space-y-8 animate-in slide-in-from-right duration-300">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-6">Profil de la Librairie</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Nom de l'Etablissement</label>
                      <input type="text" defaultValue={user.shopName} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-cameroonGreen outline-none font-medium" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Ville / Localisation</label>
                        <input type="text" defaultValue={user.address} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-cameroonGreen outline-none font-medium" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Frais de Livraison Standard (F)</label>
                        <input type="number" defaultValue="1500" className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-cameroonGreen outline-none font-medium" />
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-cameroonGreen text-white rounded-2xl font-black shadow-xl shadow-green-100">Enregistrer les infos boutique</button>
              </form>
            )}

            {activeTab === 'danger' && (
              <div className="space-y-8 animate-in zoom-in duration-300">
                <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100">
                  <h3 className="text-xl font-black text-red-600 mb-4">Zone de Danger</h3>
                  <p className="text-sm text-red-500 font-medium mb-8 leading-relaxed">
                    La suppression ou la désactivation de votre compte est définitive.
                  </p>
                  <div className="space-y-4">
                    <button onClick={handleDeleteAccount} className="w-full py-4 bg-white border-2 border-red-500 text-red-500 rounded-2xl font-black hover:bg-red-500 hover:text-white transition-all shadow-sm">Désactiver temporairement</button>
                    <button onClick={handleDeleteAccount} className="w-full py-4 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all shadow-lg">Supprimer définitivement</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
