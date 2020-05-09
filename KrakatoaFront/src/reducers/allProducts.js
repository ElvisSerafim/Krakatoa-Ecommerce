const INITIAL_STATE = [
        
];

export default function reducer(state = INITIAL_STATE, action) {
    if(action.type == 'ALL_PRODUCTS'){
       console.log(action.allProducts)
        return action.allProducts;
    }
    return state;
}

export const sendAllProducts = (allProducts) => {
    return {
        type: 'ALL_PRODUCTS',
        allProducts
    }
}
