import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContentResponse } from 'src/app/guest/store/product/types/ProductInterface';

export const selectProducts =
  createFeatureSelector<ContentResponse>('products');

export const selectProductsNewArrival = createSelector(
  selectProducts,
  (products) => {
    return products;
  }
);
