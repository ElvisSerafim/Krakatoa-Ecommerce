const INITIAL_STATE = [

];

export default function reducer(state = INITIAL_STATE, action) {
    if(action.type == 'ADD_CART'){
        console.log('Produtos no carrinho: '+ [...state, action.product]);
        return [...state, action.product];
    }
    return state;
}


export const addCart = (product) => {
    return {
        type: 'ADD_CART',
        product
    }
}
