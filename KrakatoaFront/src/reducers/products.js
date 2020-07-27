/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../store/api';

const url = '/produto';

const productsPage = createSlice({
  name: 'productsPage',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    updateProducts: (products, action) => {
      products.list = action.payload;
    },
    productsRecieved: (products, action) => {
      products.list = action.payload;
      products.__persisted_at = Date.now();
      products.loading = false;
    },
    productsRequested: (products) => {
      products.loading = true;
    },
    productsRequestFail: (products) => {
      products.loading = false;
    },
  },
});

export default productsPage.reducer;
export const {
  updateProducts,
  productsRecieved,
  productsRequested,
  productsRequestFail,
} = productsPage.actions;

// Action Creators
export const loadProducts = () =>
  apiCallBegan({
    url,
    onStart: productsRequested.type,
    onSuccess: productsRecieved.type,
    onError: productsRequestFail.type,
  });

export const ProductPageFiler = (categoria, tipo) =>
  createSelector(
    (state) => state.products.list,
    (products) =>
      products.filter((product) => {
        if (categoria.toUpperCase() === tipo.toUpperCase()) {
          if (product.categoria.toUpperCase() === categoria.toUpperCase())
            return product;
        }
        return product.tipo.toUpperCase() === tipo.toUpperCase();
      }),
  );
