const INITIAL_STATE = [

];

export default function reducer(state = INITIAL_STATE, action) {
    if(action.type == 'CURRENTY_PRODUCTS'){
        console.log('Entrei na funcao reducer')
        console.log("Produtos: "+ action.products)
        return action.products;
    } 
    return state;
}

export const updateProducts = (products) => {
    console.log('Estou no reducer')
    return {
        type: 'CURRENTY_PRODUCTS',
        products
    }
}
