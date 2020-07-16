import productsReducers from '../reducers/products';
import productsCartsReducers from '../reducers/productsCart';
import SearchReducer from '../reducers/search';
import userReducer from '../reducers/user';
import pageReducer from '../reducers/page'
import {combineReducers } from 'redux';



const rootReducer = combineReducers({
    products: productsReducers,
    productsCart: productsCartsReducers,
    pesquisaBarra: SearchReducer,
    user: userReducer,
    page: pageReducer
  });

  export default rootReducer; 