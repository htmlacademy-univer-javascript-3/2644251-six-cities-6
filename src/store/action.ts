import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../store/offers/types.ts';

export const changeCity = createAction<string>('city/change');
export const loadOffers = createAction<Offer[]>('offers/load');
