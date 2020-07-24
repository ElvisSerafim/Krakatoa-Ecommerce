/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice } from '@reduxjs/toolkit';
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
      products.loading = false;
    },
    productsRequested: (products, action) => {
      products.loading = true;
    },
    productsRequestFail: (products, action) => {
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
