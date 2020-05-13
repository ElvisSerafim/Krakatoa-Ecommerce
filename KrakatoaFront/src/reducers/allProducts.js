const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'ALL_PRODUCTS') {
    return action.allProducts;
  }
  return state;
}

export const sendAllProducts = (allProducts) => ({
  type: 'ALL_PRODUCTS',
  allProducts,
});
