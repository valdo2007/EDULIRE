
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>('CLIENT');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    shopName: '',
    address: '',
    rccm: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(role);
      navigate(role === 'SELLER' ? '/vendeur' : '/catalogue');
    } else {
      register({
        name: formData.name,
        email: formData.email,
        role: role,
        shopName: formData.shopName,
        address: formData.address,
        rccm: formData.rccm
      });
      navigate(role === 'SELLER' ? '/vendeur' : '/catalogue');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-black text-gray-900">
            {isLogin ? 'Bon retour !' : 'Rejoindre EduLivre'}
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            {role === 'CLIENT' ? 'Espace Client' : 'Devenir Vendeur Professionnel'}
          </p>
        </div>

        <div className="flex p-1 bg-gray-100 rounded-2xl">
          <button
            onClick={() => setRole('CLIENT')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${role === 'CLIENT' ? 'bg-white shadow-sm text-cameroonGreen' : 'text-gray-400'}`}
          >
            CLIENT
          </button>
          <button
            onClick={() => setRole('SELLER')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${role === 'SELLER' ? 'bg-white shadow-sm text-cameroonGreen' : 'text-gray-400'}`}
          >
            VENDEUR
          </button>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Nom Complet</label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-cameroonGreen outline-none transition"
                placeholder="Ex: Jean Moussa"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-cameroonGreen outline-none transition"
              placeholder="votre@email.cm"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Mot de passe</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-cameroonGreen outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && role === 'SELLER' && (
            <div className="space-y-4 pt-4 border-t border-gray-50">
              <p className="text-[10px] font-black text-cameroonGold uppercase tracking-widest text-center">Vérification Légale</p>
              
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Nom de la Librairie</label>
                <input
                  name="shopName"
                  required
                  value={formData.shopName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-cameroonGreen outline-none"
                  placeholder="Ex: Librairie de l'Indépendance"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Adresse (Ville, Quartier)</label>
                <input
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-cameroonGreen outline-none"
                  placeholder="Ex: Yaoundé, Mvan"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">N° RCCM / Registre</label>
                <input
                  name="rccm"
                  required
                  value={formData.rccm}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-cameroonGreen outline-none"
                  placeholder="Ex: RC/DLA/2023/B/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border-2 border-dashed border-gray-100 rounded-xl text-center hover:border-cameroonGreen transition cursor-pointer">
                  <svg className="w-5 h-5 mx-auto text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <span className="text-[8px] font-bold text-gray-500">PHOTO CNI</span>
                </div>
                <div className="p-3 border-2 border-dashed border-gray-100 rounded-xl text-center hover:border-cameroonGreen transition cursor-pointer">
                  <svg className="w-5 h-5 mx-auto text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <span className="text-[8px] font-bold text-gray-500">REGISTRE COM.</span>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-cameroonGreen text-white rounded-2xl font-black shadow-lg shadow-green-100 hover:scale-[1.02] transition"
          >
            {isLogin ? 'Se connecter' : 'Créer mon compte'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-bold text-gray-500 hover:text-cameroonGreen transition"
          >
            {isLogin ? "Nouveau ici ? S'inscrire" : "Déjà un compte ? Connexion"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
