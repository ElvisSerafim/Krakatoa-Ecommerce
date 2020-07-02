/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { decode } from 'jsonwebtoken';

const isAuth = () => {
  try {
    const token = sessionStorage.getItem('token');
    if (token === null) {
      return false;
    }
    if (token !== null && token.length > 10) {
      const { exp } = decode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      }
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { mensage: 'Checar Email e Senha' },
        }}
      />
    ))}
  />
);

export const PrivateRouteBuy = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { mensage: 'Checar Email e Senha' },
        }}
      />
    ))}
  />
);
