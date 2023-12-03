import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContentResponse } from './types/ProductInterface';

export const productsNewArrivalState = createFeatureSelector<ContentResponse>(
  'newArrivalProductList'
);

export const getProductsNewArrival = createSelector(
  productsNewArrivalState,
  (state: ContentResponse) => {
    return state;
  }
);

// export const productListState =
//   createFeatureSelector<Array<ProductResponseInterface>>('productList');

// export const productListError =
//   createFeatureSelector<BackendErrorInterface>('errors');

// export const getProductListState = createSelector(
//   productListState,
//   (state: Array<ProductResponseInterface>) => state
// );

// export const productListErrorMessage = createSelector(
//   productListError,
//   (state: BackendErrorInterface) => state.message
// );
