import { Offer } from '../offers/types';
import { Review } from '../reviews/types';

export type OfferPageState = {
  offer: OfferDetailed | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  isLoading: boolean;
  hasError: boolean;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type OfferDetailed = Offer & {
  images: string[];
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: Host;
  description: string;
};
