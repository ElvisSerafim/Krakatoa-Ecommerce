const INITIAL_STATE = [

];

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'CURRENTY_PRODUCTS') {
    console.log('Entrei na funcao reducer');
    console.log(action.products);
    return action.products;
  }
  return state;
}

export const updateProducts = (products) => ({
  type: 'CURRENTY_PRODUCTS',
  products,
});
