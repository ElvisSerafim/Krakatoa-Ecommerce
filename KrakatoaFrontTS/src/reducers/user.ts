//@ts-nocheck
import api from '../Services/ApiService';

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
