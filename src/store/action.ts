import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../mocks/offers';

export const changeCity = createAction<string>('city/change');
export const loadOffers = createAction<Offer[]>('offers/load');
