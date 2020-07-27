import { combineReducers } from 'redux';
import productsReducers from '../reducers/products';
import productsCartsReducers from '../reducers/productsCart';
import SearchReducer from '../reducers/search';
import UserReducer from '../reducers/user';

const rootReducer = combineReducers({
  products: productsReducers,
  productsCart: productsCartsReducers,
  pesquisaBarra: SearchReducer,
  user: UserReducer,
});

export default rootReducer;
