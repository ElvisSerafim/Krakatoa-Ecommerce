/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { decode } from 'jsonwebtoken';

const isAuth = async () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const { exp } = decode(token);
    if (Date.now() >= exp * 1000) {
      return false;
    }
    return true;
  }
  return false;
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { mensage: 'Checar Email e Senha' },
          }}
        />
      )
    }
  />
);

export const PrivateRouteBuy = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { mensage: 'Checar Email e Senha' },
          }}
        />
      )
    }
  />
);
