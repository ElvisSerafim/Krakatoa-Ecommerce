/* eslint-disable operator-assignment */
/* eslint-disable no-param-reassign */
// Reducer do Carrinho da loja

import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addCart: (state, action) => {
      let posicao = null;
      let flag = false;

      state.forEach((value, index) => {
        if (
          value.nome === action.payload.nome
          && value.tamanhoEscolhido === action.payload.tamanhoEscolhido
        ) {
          flag = true;
          posicao = index;
        }
      });

      if (flag === true) {
        state[posicao].quantidadePedido =
          state[posicao].quantidadePedido + action.payload.quantidadePedido;
      } else {
        state.push(action.payload);
      }
    },
    removeAllProducts: (state, action) => {
      state = [];
    },
    productsUpdate: (state, action) => {
      let index = null;
      state.forEach((item, i) => {
        if (item.cartId === action.payload.cartId) {
          index = state.indexOf(item);
        }
      });
      if (index >= 0 && action.payload.quantidadePedido > 0) {
        state[index].quantidadePedido = action.payload.quantidadePedido;
      }
    },
    removerCart: (state, action) => {
      let index = null;
      state.forEach((item) => {
        if (item.cartId === action.payload.cartId) {
          index = state.indexOf(item);
        }
      });

      state.splice(index, 1);
    },
  },
});

export default cart.reducer;
export const {
  addCart,
  removeAllProducts,
  removerCart,
  productsUpdate,
} = cart.actions;
