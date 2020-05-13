import api from '../Services/ApiService';

const a = localStorage.getItem('token');
const b = sessionStorage.getItem('token');

const initialState = {
  token: getToken(),
  user: tentativa(),
};

function getToken() {
  if (a.length != 0) {
    return a;
  }
  if (b.length != 0) {
    return b;
  }

  return '';
}

function tentativa() {
  async function getUser() {
    if (a.length != 0) {
      const data = {
        token: a,
      };
      const usuario = await api.getUsuario(data);
      return usuario;
    }
    if (b.length != 0) {
      console.log(b);
      const usuario = api.getUsuario(b);
      return usuario;
    }

    return '';
  }

  const tenta = getUser();
  console.log(tenta);
  return tenta;
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      console.log(state);
      return state;
  }
}

export const setUser = (payload) => ({
  type: 'SET_USER',
  payload,
});
