/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import TextFielde from './TextField';
import api from '../Services/ApiService';
import Alerta from './Alerta';

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

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [openAlert, setOpenAlert] = useState(false);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const Cadastrar = async () => {
    try {
      if (email === '') throw new Error('Email Vazio');
      if (password === '') throw new Error('Senha Vazia');
      const data = {
        email,
        password,
      };

      const request = await api.Cadastro(data);

      if (request === 'ok') return history.push('/conta');
      throw new Error('Email já cadastrado');
    } catch (error) {
      setOpenAlert(true);
      setMessage('Email já Cadastrado');
      setStatus('error');
    }
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
          <Typography style={styles.topico} variant="h5" color="secondary">
            Registrar
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
        <Grid item lg={12} md={12} sm={12} xs={12} flexDirection="row">
          <div style={styles.botaoEntrar}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={Cadastrar}
            >
              Continuar
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default Cadastro;
