const INITIAL_STATE = [

  
];

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'ADD_CART') {
    console.log([...state, action.product]);
    return [...state, action.product];
  } if (action.type === 'REMOVE_CART') {
    return state.filter((item) => item.nome !== action.product.nome);
  } if (action.type === 'UPDATE_PRODUCTS') {
    return action.products;
  } if (action.type === 'REMOVE_ALL_PRODUCTS') {
    return INITIAL_STATE;
  }
  return state;
}


export const addCart = (product) => ({
  type: 'ADD_CART',
  product,
});

export const removeProducts = () => ({
  type: 'REMOVE_ALL_PRODUCTS',
});

export const productsUpdate = (products) => {
  console.log(products);
  return {
    type: 'UPDATE_PRODUCTS',
    products,

  };
};

export const removerCart = (product) => ({
  type: 'REMOVE_CART',
  product,
});