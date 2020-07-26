/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../reducers/user';

const isAuth = (token) => {
  try {
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

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.user2.token);
  useDispatch(loadUser(token));
  return (
    <Route
      {...rest}
      render={(props) => (isAuth(token) ? (
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
};

export const PrivateRouteBuy = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.user2.token);
  return (
    <Route
      {...rest}
      render={(props) => (isAuth(token) ? (
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
};
