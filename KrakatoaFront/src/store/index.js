import {createStore, combineReducers} from 'redux'
import productsReducers from '../reducers/products'
import productsCartsReducers from '../reducers/productsCart'
const rootReducer = combineReducers({
    products: productsReducers,
    productsCart: productsCartsReducers
})

export default createStore(rootReducer);