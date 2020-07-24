import { combineReducers } from 'redux';
import productsReducers from '../reducers/products';
import productsCartsReducers from '../reducers/productsCart';
import SearchReducer from '../reducers/search';
import userReducer from '../reducers/user';

const rootReducer = combineReducers({
  products: productsReducers,
  productsCart: productsCartsReducers,
  pesquisaBarra: SearchReducer,
  user: userReducer,
});

export default rootReducer;
