/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuth = () => {
  if (sessionStorage.getItem('token') !== null) return true;
  if (localStorage.getItem('token') !== null) return true;
  return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
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

export default PrivateRoute;
