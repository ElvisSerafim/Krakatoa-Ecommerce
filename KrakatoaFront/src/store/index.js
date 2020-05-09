import {createStore, combineReducers} from 'redux'
import productsReducers from '../reducers/products'
import productsCartsReducers from '../reducers/productsCart'
import allProductsReducers from '../reducers/allProducts'
import SearchReducer from '../reducers/search.js'

const saveState = (state) => {
    try {
       //Convert the state to a JSON string 
        const serialisedState = JSON.stringify(state);

       //Save the serialised state to localStorage against the key 'app_state'
       window.sessionStorage.setItem('app_state', serialisedState);
    } catch (err) {
       //Log errors here, or ignore
    }
};


const loadState =() => {
    try {
       //Load the data saved in localStorage, against the key 'app_state'
        const serialisedState = window.sessionStorage.getItem('app_state');

       //Passing undefined to createStore will result in our app getting the default state
       //If no data is saved, return undefined
        if (!serialisedState) return undefined;

       //De-serialise the saved state, and return it.
        return JSON.parse(serialisedState);
    } catch (err) {
       //Return undefined if localStorage is not available, 
       //or data could not be de-serialised, 
       //or there was some other error
        return undefined;
    }
};



const rootReducer = combineReducers({
    products: productsReducers,
    productsCart: productsCartsReducers, 
    allProducts: allProductsReducers,
    productsCart: productsCartsReducers,
    pesquisaBarra: SearchReducer
})
const oldState = loadState();
const store = createStore(rootReducer, oldState);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;