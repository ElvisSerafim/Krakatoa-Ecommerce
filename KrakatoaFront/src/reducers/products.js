/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../store/api';
import { createSelector } from 'reselect';

const url = '/produto';

const productsPage = createSlice({
  name: 'productsPage',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    setImage: (products, action) => {
      const { id = '', img = '' } = action.payload;
      products.list.map((item) => {
        if (item._id === id) {
          item.ImageUrl = img;
        }
      });
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

const selectProducts = (state) => state.products;

export const productsSelector = createSelector(
  [selectProducts],
  (products) => products.list,
);

export default productsPage.reducer;
export const {
  productsRecieved,
  productsRequested,
  productsRequestFail,
  setImage,
} = productsPage.actions;

// Action Creators
export const loadProducts = () =>
  apiCallBegan({
    url,
    onStart: productsRequested.type,
    onSuccess: productsRecieved.type,
    onError: productsRequestFail.type,
  });
