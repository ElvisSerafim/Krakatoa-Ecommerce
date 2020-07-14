/* eslint-disable array-callback-return */
const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'ADD_CART') {
    let produto = action.product;
     var posicao = null;
     var flag = false;
     var arrayAuxiliar = [];

     state.forEach((item, i) => {
        arrayAuxiliar.push(item);
    });

    arrayAuxiliar.forEach((value, index ) => {
      if((value.nome === produto.nome) && (value.tamanhoEscolhido === produto.tamanhoEscolhido)){
          flag = true;
          posicao = index;
      }
    })

    if(flag == true){
       arrayAuxiliar[posicao].quantidadePedido = arrayAuxiliar[posicao].quantidadePedido + produto.quantidadePedido;
       state = arrayAuxiliar;
       return arrayAuxiliar;
    }else {
      state = arrayAuxiliar;
      return [...state, produto];
    }

  }
  if (action.type === 'REMOVE_CART') {
    let index = null;
    let arrayAux = [];
    state.forEach((item, i) => {
      if (item.nome !== action.product.nome) {
        arrayAux.push(item);
      } if (item.nome === action.product.nome && item.tamanhoEscolhido !== action.product.tamanhoEscolhido) {
        arrayAux.push(item);
      }
    });

    state = arrayAux;
    return state;
  }
  if (action.type === 'UPDATE_PRODUCTS') {
    return action.products;
  }
  if (action.type === 'REMOVE_ALL_PRODUCTS') {
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

export const productsUpdate = (products) => ({
  type: 'UPDATE_PRODUCTS',
  products,
});

export const removerCart = (product) => ({
  type: 'REMOVE_CART',
  product,
});
