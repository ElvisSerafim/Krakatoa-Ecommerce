/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Checkbox, Typography, Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextFielde from './TextField';
import api from '../Services/ApiService';
import { setUser } from '../reducers/user';
import Alerta from './Alerta';
import Estilos from '../Estilos';

const styles = {
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignSelf: 'center',
  },
  senha: {
    maxWidth: 350,
    paddingTop: 10,
    paddingBottom: 30,
    marginTop: 50,
  },
  botaoEntrar: {
    width: 100,
  },
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [status, setStatus] = useState('');
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
        if (sessao) {
          dataToken = {
            token: localStorage.getItem('token'),
          };
        } else {
          dataToken = {
            token: sessionStorage.getItem('token'),
          };
        }
        const usuario = await api.getUsuario(dataToken);
        dispatch(setUser(usuario));

        return history.push('/conta/');
      }
      throw new Error('Checar Email e Senha');
    } catch (error) {
      setOpenAlert(true);
      setMessage('Checar Email e Senha');
      setStatus('error');
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <>
      <Alerta
        message={message}
        openAlert={openAlert}
        status={status}
        handleClose={handleClose}
        vertical="top"
        horizontal="right"
      />
      <Grid container spacing={2} diretion="row" justify="flex-start">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h5" color="secondary">
            Entrar
          </Typography>
        </Grid>
        <Grid item lg={12} md={7} sm={7} xs={7}>
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
        <Grid item lg={12} md={7} sm={7} xs={7}>
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
        <Grid item lg={12} md={12} sm={12} xs={12} container>
          <Grid item lg={2} md={12} sm={12} xs={12}>
            <div style={styles.botaoEntrar}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={login}
              >
                Entrar
              </Button>
            </div>
          </Grid>
          <Grid item lg={6} md={12} sm={12} container xs={12}>
            <Checkbox
              onChange={(event) => {
                setSessao(event.target.checked);
              }}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Typography
              variant="body2"
              color="secondary"
              style={{ marginBottom: 0 }}
            >
              Lembre-me
            </Typography>
          </Grid>
          <div
            style={{
              ...Estilos.flexRowStandard,
              flexWrap: 'nowrap',
              alignSelf: 'center',
            }}
          >
            <div
              style={{
                ...Estilos.flexRowStandard,
                flexWrap: 'nowrap',
                alignSelf: 'center',
              }}
            />
          </div>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
