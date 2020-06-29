/* eslint-disable consistent-return */
import React, { useState, SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography, TextField } from '@material-ui/core';
import api from '../Services/ApiService';
import Alerta from './Alerta';
import { Color } from '@material-ui/lab/Alert';

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

const Cadastro:React.FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [openAlert, setOpenAlert] = useState(false);
  const [status, setStatus] = useState<Color>();
  const [message, setMessage] = useState('');

  const handleClose = (event: React.SyntheticEvent, reason?: string) => {
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
      <Grid container spacing={2} justify="flex-start">
        <Grid item lg={12} md={7} sm={7} xs={7}>
          <Typography variant="h5" color="secondary">
            Registrar
          </Typography>
        </Grid>
        <Grid item lg={12} md={7} sm={7} xs={7}>
          <div style={styles.senha}>
            <TextField
              id="email-login"
              label="Email"
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </Grid>
        <Grid item lg={12} md={7} sm={7} xs={7}>
          <div style={styles.senha}>
            <TextField
              label="Senha"
              id="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
