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
  previewImage: string;
  isPremium?: boolean;
  isFavorite?: boolean;
  location: {
    latitude: number;
    longitude: number;
    zoom?: number;
  };
  city: City;
};
