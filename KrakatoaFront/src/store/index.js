import {createStore, combineReducers} from 'redux'
import productsReducers from '../reducers/products'

const rootReducer = combineReducers({
    products: productsReducers
})

export default createStore(rootReducer);