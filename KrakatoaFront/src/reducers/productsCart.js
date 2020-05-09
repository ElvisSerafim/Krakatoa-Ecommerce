const INITIAL_STATE = [

];

export default function reducer(state = INITIAL_STATE, action) {
    if(action.type == 'ADD_CART'){
        console.log([...state, action.product]);
        return [...state, action.product];
    } else if (action.type == 'REMOVE_CART'){
        return state.filter((item) => item.nome != action.product.nome);
    } else if (action.type == 'UPDATE_PRODUCTS'){
        return action.products;
    }
    return state;
}


export const addCart = (product) => {
    return {
        type: 'ADD_CART',
        product
    }
}

export const productsUpdate = (products) => {
    console.log(products)
    return {
        type: 'UPDATE_PRODUCTS',
        products
    }
}

export const removerCart = (product) => {
    return {
        type: 'REMOVE_CART',
        product
    }
}