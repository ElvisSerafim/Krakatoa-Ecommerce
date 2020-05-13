/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import TextFielde from './TextField';
import api from '../Services/ApiService';
import Alerta from './Alerta';

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
