/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice } from '@reduxjs/toolkit';
import api from '../Services/ApiService';
import { apiCallBegan } from '../store/api';

let a = '';
let b = '';
a = localStorage.getItem('token');
b = sessionStorage.getItem('token');

function getToken() {
  if (a !== null && a.length !== 0) {
    return a;
  }
  if (b !== null && b.length !== 0) {
    return b;
  }
  return '';
}

const initialState = {
  token: getToken(),
  user: '',
};

async function tentativa() {
  function getUser() {
    if (a != null && a.length !== 0) {
      const data = {
        token: a,
      };
      const agora = api.getUsuario(data).then((result) => result);
      return agora;
    }
    if (b != null && b.length !== 0) {
      const data = {
        token: b,
      };
      const usuario = api.getUsuario(data).then((result) => result);
      return usuario;
    }
    return '';
  }

  const retorno = await getUser();
  return retorno;
}

export default async function user(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      var usuario = await tentativa();
      return { ...state, user: usuario };
  }
}

export const setUser = (payload) => ({
  type: 'SET_USER',
  payload,
});

const url = 'user/';

const slice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    user: {},
    loading: false,
  },
  reducers: {
    setToken: (user2, action) => {
      user2.token = action.payload;
    },
    userRecieved: (user2, action) => {
      user2.user = action.payload;
      user2.loading = false;
    },
    userRequested: (user2) => {
      user2.loading = true;
    },
    userRequestFail: (user2) => {
      user2.loading = false;
    },
    logout: (user2) => {
      user2.token = '';
    },
    userDetails: (user2, action) => {
      user2.user.nome = action.payload.nome;
      user2.user.telefone = action.payload.tel;
    },
  },
});

export const { reducer } = slice;
export const {
  getUser,
  setToken,
  userRecieved,
  userRequestFail,
  userRequested,
  logout,
  userDetails,
} = slice.actions;

export const loadUser = (token) =>
  apiCallBegan({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onStart: userRequested.type,
    onSuccess: userRecieved.type,
    onError: userRequestFail.type,
  });
