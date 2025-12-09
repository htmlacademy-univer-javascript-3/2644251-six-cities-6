export type City = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export type Offer = {
  id: number;
  title: string;
  type: string;
  price: number;
  rating: number;
  image: string;
  isPremium?: boolean;
  isFavorite?: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  city: City;
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
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37403,
        longitude: 4.88969,
        zoom: 12,
      },
    },
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
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37403,
        longitude: 4.88969,
        zoom: 12,
      },
    },
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
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37403,
        longitude: 4.88969,
        zoom: 12,
      },
    },
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
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37403,
        longitude: 4.88969,
        zoom: 12,
      },
    },
  },
  {
    id: 5,
    title: 'Charming studio near Eiffel Tower',
    type: 'Apartment',
    price: 130,
    rating: 4.7,
    image: 'img/apartment-02.jpg',
    isPremium: false,
    isFavorite: false,
    location: { latitude: 48.858844, longitude: 2.294351 },
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.35222,
        zoom: 12,
      },
    },
  },
  {
    id: 6,
    title: 'Luxurious apartment in central Paris',
    type: 'Apartment',
    price: 200,
    rating: 4.9,
    image: 'img/apartment-03.jpg',
    isPremium: true,
    isFavorite: true,
    location: { latitude: 48.860611, longitude: 2.337644 },
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.35222,
        zoom: 12,
      },
    },
  },
];
