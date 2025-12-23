
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { DeliveryZone, DELIVERY_FEES } from '../types';

const Cart: React.FC = () => {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('Yaoundé');

  const deliveryFee = DELIVERY_FEES[deliveryZone];
  const finalTotal = totalPrice + deliveryFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setSuccess(true);
      clearCart();
    }, 2000);
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Commande Réussie !</h2>
        <p className="text-gray-500 mb-8">Nous vous contacterons pour la livraison à {deliveryZone}.</p>
        <Link to="/" className="px-8 py-3 bg-cameroonGreen text-white rounded-xl font-bold">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
        <Link to="/catalogue" className="px-8 py-3 bg-cameroonGreen text-white rounded-xl font-bold">
          Explorer les livres
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10">Mon Panier</h1>
      <div className="flex flex-col lg:row gap-12">
        <div className="lg:w-2/3 space-y-4">
          {cart.map((item) => (
            <div key={`${item.id}-${item.isNew}`} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-lg" />
              <div className="flex-grow">
                <h3 className="font-bold text-sm">{item.title} ({item.isNew ? 'Neuf' : 'Occasion'})</h3>
                <p className="text-sm font-bold text-cameroonGreen">{item.quantity} x {(item.isNew ? item.priceNew : item.priceUsed).toLocaleString()} FCFA</p>
              </div>
              <button onClick={() => removeFromCart(item.id, item.isNew)} className="text-red-500">Supprimer</button>
            </div>
          ))}

          <div className="bg-white p-6 rounded-2xl border border-gray-100 mt-8">
            <h3 className="font-bold mb-4">Zone de Livraison</h3>
            <div className="flex gap-4">
              {(['Yaoundé', 'Douala', 'Autres Villes'] as DeliveryZone[]).map(zone => (
                <button
                  key={zone}
                  onClick={() => setDeliveryZone(zone)}
                  className={`px-4 py-2 rounded-xl border-2 ${deliveryZone === zone ? 'border-cameroonGreen bg-green-50' : 'border-gray-50'}`}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white p-8 rounded-3xl border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Total</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between"><span>Livres</span><span>{totalPrice.toLocaleString()} FCFA</span></div>
              <div className="flex justify-between"><span>Livraison</span><span>{deliveryFee.toLocaleString()} FCFA</span></div>
              <div className="border-t pt-2 font-bold flex justify-between"><span>Total</span><span>{finalTotal.toLocaleString()} FCFA</span></div>
            </div>
            <button onClick={handleCheckout} className="w-full py-4 bg-cameroonGreen text-white rounded-xl font-bold">
              Commander
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
