import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import expireReducer from 'redux-persist-expire';
import rootReducer from './reducer';
import api from './middleware/api';
import { loadProducts } from '../reducers/products';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  transforms: [
    expireReducer('products', {
      // (Optional) Key to be used for the time relative to which store is to be expired
      persistedAtKey: '__persisted_at',
      // (Required) Seconds after which store will be expired
      expireSeconds: 60,
      // (Optional) State to be used for resetting e.g. provide initial reducer state
      expiredState: {},
    }),
    expireReducer('user', {
      // (Optional) Key to be used for the time relative to which store is to be expired
      persistedAtKey: '__persisted_at',
      // (Required) Seconds after which store will be expired
      expireSeconds: 5,
      // (Optional) State to be used for resetting e.g. provide initial reducer state
      expiredState: { user: [] },
    }),
  ],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer,
  middleware: [...getDefaultMiddleware(), api],
});

export const persistor = persistStore(store);

/* const state = store.getState();

console.log(state);

if (localStorage.getItem) store.dispatch(loadProducts());

console.log(state); */
