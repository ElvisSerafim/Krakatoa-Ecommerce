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
      expireSeconds: 3600,
      expiredState: {},
      autoExpire: true,
    }),
    expireReducer('user2', {
      expireSeconds: 3600,
      expiredState: {},
      autoExpire: true,
    }),
  ],
  /* blacklist: [user2.info], */
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer,
  middleware: [...getDefaultMiddleware(), api],
});

const checkHydrate = () => {
  const state = store.getState();
  if (state.products.list.length < 1) {
    store.dispatch(loadProducts());
  }
};
export const persistor = persistStore(store, {}, checkHydrate);

/* console.log(state.products.list); */

/* if ((state.products.list.length === 0)) store.dispatch(loadProducts()); */
