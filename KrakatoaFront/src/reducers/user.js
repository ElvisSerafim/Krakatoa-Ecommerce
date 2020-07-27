/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../store/api';

/* let a = '';
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
}); */

const url = 'user/';

const slice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    user: {},
    loading: false,
  },
  reducers: {
    setToken: (user, action) => {
      user.token = action.payload;
    },
    userRecieved: (user, action) => {
      user.user = action.payload;
      user.loading = false;
    },
    userRequested: (user) => {
      user.loading = true;
    },
    userRequestFail: (user) => {
      user.loading = false;
    },
    logout: (user) => {
      user.token = '';
    },
    userDetails: (user, action) => {
      user.user.nome = action.payload.nome;
      user.user.telefone = action.payload.tel;
    },
  },
});

export default slice.reducer;
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
