export type Offer = {
  id: number;
  title: string;
  type: string;
  price: number;
  rating: number;
  image: string;
  isPremium?: boolean;
  isFavorite?: boolean;
};

export const offers: Offer[] = [
  {
    id: 1,
    title: 'Cozy studio in the city center',
    type: 'Apartment',
    price: 120,
    rating: 4.8,
    image: 'img/apartment-01.jpg',
    isPremium: true,
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Modern loft with canal view',
    type: 'Loft',
    price: 150,
    rating: 4.5,
    image: 'img/room.jpg',
    isPremium: false,
    isFavorite: true,
  },
  {
    id: 3,
    title: 'Comfortable suburban house',
    type: 'House',
    price: 90,
    rating: 4.2,
    image: 'img/apartment-02.jpg',
    isPremium: false,
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Stylish apartment near park',
    type: 'Apartment',
    price: 110,
    rating: 4.6,
    image: 'img/apartment-03.jpg',
    isPremium: true,
    isFavorite: true,
  },
];
