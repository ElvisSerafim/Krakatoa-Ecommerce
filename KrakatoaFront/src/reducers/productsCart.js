/* eslint-disable array-callback-return */

import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addCart: (state, action) => {
      let posicao = null;
      let flag = false;

       state.forEach((value, index) => {
        if ((value.nome === action.payload.nome) && (value.tamanhoEscolhido === action.payload.tamanhoEscolhido)) {
          flag = true;
          posicao = index;
        }
      })

      if (flag == true) {
        state[posicao].quantidadePedido = state[posicao].quantidadePedido + action.payload.quantidadePedido;
      } else {
        state.push(action.payload);
      }
    },
    removeAllProducts: (state, action) => {
      state = [];
    },
    productsUpdate: (state, action) => {
      state = action.payload;
    },
    removerCart: (state, action) => {
      let index = null;
      let arrayAux = [];
      console.log(state);
      state.forEach((item, i) => {
        if (item.nome !== action.payload.nome) {
          arrayAux.push(item);
        } if (item.nome === action.payload.nome && item.tamanhoEscolhido !== action.payload.tamanhoEscolhido) {
          arrayAux.push(item);
        }
      });
      console.log(arrayAux);
      state = arrayAux;
    }
  }
})

export default cart.reducer;
export const { addCart, removeAllProducts, removerCart, productsUpdate } = cart.actions;
/* export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'ADD_CART') {
    let produto = action.product;
    var posicao = null;
    var flag = false;
    var arrayAuxiliar = [];

    state.forEach((item, i) => {
      arrayAuxiliar.push(item);
    });

    arrayAuxiliar.forEach((value, index) => {
      if ((value.nome === produto.nome) && (value.tamanhoEscolhido === produto.tamanhoEscolhido)) {
        flag = true;
        posicao = index;
      }
    })

    if (flag == true) {
      arrayAuxiliar[posicao].quantidadePedido = arrayAuxiliar[posicao].quantidadePedido + produto.quantidadePedido;
      state = arrayAuxiliar;
      return arrayAuxiliar;
    } else {
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
 */
/* export const addCart = (product) => ({
  type: 'ADD_CART',
  product,
});

export const removeAllProducts = () => ({
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
 */