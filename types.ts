
export type Level = 'Maternelle' | 'Primaire' | 'Secondaire' | 'Lycée' | 'Université';
export type UserRole = 'CLIENT' | 'SELLER' | 'ADMIN';
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  verificationStatus?: VerificationStatus;
  shopName?: string;
  address?: string;
  rccm?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  level: Level;
  subject: string;
  grade: string;
  priceNew: number;
  priceUsed: number;
  image: string;
  description: string;
  sellerId: string;
  stock: number;
}

export interface CartItem extends Book {
  quantity: number;
  isNew: boolean;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book, isNew: boolean) => void;
  removeFromCart: (id: string, isNew: boolean) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export type DeliveryZone = 'Yaoundé' | 'Douala' | 'Autres Villes';

export const DELIVERY_FEES: Record<DeliveryZone, number> = {
  'Yaoundé': 1000,
  'Douala': 1500,
  'Autres Villes': 3000
};
