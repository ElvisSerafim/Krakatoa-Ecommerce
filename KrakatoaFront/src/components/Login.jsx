/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Checkbox, Typography, Button, Grid,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextFielde from './TextField';
import api from '../Services/ApiService';
import {setUser} from '../reducers/user';
const styles = {
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  senha: {
    width: 350,
    paddingTop: 10,
    paddingBottom: 30,
  },
  botaoEntrar: {
    width: 100,
  },
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sessao, setSessao] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const login = async () => {
    try {
      if (email === '') throw new Error('Email Vazio');
      if (password === '') throw new Error('Senha Vazia');
      const data = {
        email,
        password,
        sessao,
      };
      const request = await api.Login(data);
      if (request === 'ok') {
        
        let dataToken;
        if(sessao){
          dataToken = {
            token: localStorage.getItem('token')
          }
        } else {
          dataToken = {
            token: sessionStorage.getItem('token')
          }
        }
        
        const user = await api.getUsuario(dataToken);
        dispatch(setUser(user));

        return history.push('/conta');
      }
      throw new Error('Checar Email e Senha');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Grid container spacing={2} diretion="row" justify="flex-start">
        <Grid item lg={12} md={12}>
          <div style={styles.senha}>
            <TextFielde
              login
              id="email-login"
              label="Email"
              fullWidth
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </Grid>
        <Grid item lg={12} md={12}>
          <div style={styles.senha}>
            <TextFielde
              label="Senha"
              id="password"
              password
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </Grid>
        <Grid item lg={6} md={6} flexDirection="row">
          <div style={styles.row}>
            <div style={styles.botaoEntrar}>
              <Button variant="contained" color="primary" fullWidth onClick={login}>
                Entrar
              </Button>
            </div>
            <div style={styles.row}>
              <Checkbox
                onChange={(event) => { setSessao(event.target.checked); }}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <Typography
                variant="body2"
                color="secondary"
                style={{ marginBottom: 0 }}
              >
                Lembre-me
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item lg={12} md={12}>
          <Typography
            variant="body2"
            color="primary"
            style={{ marginBottom: 40 }}
          >
            Perdeu a senha?
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
