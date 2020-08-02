/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../store/api';

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
      user.user.telefone = action.payload.telefone;
    },
    userEndereco: (user, action) => {
      user.user.endereco = action.payload;
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
  userEndereco,
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
