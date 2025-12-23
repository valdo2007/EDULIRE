
import { Book } from '../types';

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Excellence en Mathématiques',
    author: 'Collectif Auteurs',
    level: 'Lycée',
    grade: 'Terminale C',
    subject: 'Mathématiques',
    priceNew: 6500,
    priceUsed: 3500,
    image: 'https://picsum.photos/seed/math1/400/500',
    description: 'Livre de référence pour la préparation au Baccalauréat Scientifique.',
    // Added required properties to fix TypeScript error
    sellerId: 'seller_1',
    stock: 12
  },
  {
    id: '2',
    title: 'Champion en Français',
    author: 'Jean-Paul Zé',
    level: 'Primaire',
    grade: 'CM2',
    subject: 'Français',
    priceNew: 4500,
    priceUsed: 2000,
    image: 'https://picsum.photos/seed/french1/400/500',
    description: 'Tout le programme de CM2 pour réussir le CEP.',
    // Added required properties to fix TypeScript error
    sellerId: 'seller_1',
    stock: 25
  },
  {
    id: '3',
    title: 'Initiation à l\'Informatique',
    author: 'Tech Cameroon',
    level: 'Secondaire',
    grade: '4ème',
    subject: 'Informatique',
    priceNew: 5000,
    priceUsed: 2500,
    image: 'https://picsum.photos/seed/cs1/400/500',
    description: 'Découvrez les bases du numérique et de la programmation.',
    // Added required properties to fix TypeScript error
    sellerId: 'seller_2',
    stock: 8
  },
  {
    id: '4',
    title: 'Mon Petit Cahier de Coloriage',
    author: 'EduKids CM',
    level: 'Maternelle',
    grade: 'Grande Section',
    subject: 'Eveil',
    priceNew: 3000,
    priceUsed: 1500,
    image: 'https://picsum.photos/seed/kids1/400/500',
    description: 'Activités ludiques pour les tout-petits.',
    // Added required properties to fix TypeScript error
    sellerId: 'seller_2',
    stock: 45
  },
  {
    id: '5',
    title: 'Droit Civil Camerounais',
    author: 'Pr. Mvondo',
    level: 'Université',
    grade: 'Licence 2',
    subject: 'Droit',
    priceNew: 12000,
    priceUsed: 7000,
    image: 'https://picsum.photos/seed/law1/400/500',
    description: 'Analyse approfondie du système juridique camerounais.',
    // Added required properties to fix TypeScript error
    sellerId: 'seller_3',
    stock: 4
  },
  {
    id: '6',
    title: 'Physique-Chimie : Objectif 20/20',
    author: 'Dr. Ngassa',
    level: 'Lycée',
    grade: 'Première S',
    subject: 'Sciences',
    priceNew: 7000,
    priceUsed: 4000,
    image: 'https://picsum.photos/seed/phys1/400/500',
    description: 'Exercices corrigés et rappels de cours.',
    // Added required properties to fix TypeScript error
    sellerId: 'seller_1',
    stock: 10
  }
];
