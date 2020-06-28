import React, { Component, useState } from 'react';
import red from '@material-ui/core/colors/red';
import { Button, TextField, Grid } from '@material-ui/core';
import { Color } from '@material-ui/lab/Alert';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import api from '../Services/ApiService';
import Alerta from './Alerta';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
  },
});

const ContatoComp = () => {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mensage, setPropMensagem] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [status, setStatus] = useState<Color>();
  const handleClose = (event: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const enviar = async ():Promise<void> => {
    try {
      if (nome === '') throw new Error('Nome Vazio');
      if (mensagem === '') throw new Error('Mensagem Vazia');
      if (email === '') throw new Error('Email Vazio');
      if (assunto === '') throw new Error('Assunto Vazio');

      const data = {
        nome,
        mensagem,
        email,
        assunto,
      };

      const request = await api.Contato(data);
      if (request) {
        setOpenAlert(true);
        setPropMensagem('Mensagem enviada com sucesso!');
        setStatus('success');
        return;
      }
      throw new Error('Não foi possível enviar a mensagem!');
    } catch (error) {
      setOpenAlert(true);
      setPropMensagem('Não foi Possivel enviar Mensagem!');
      setStatus('error');
    }
  };
  return (
    <>
      <Alerta
        message={mensage}
        openAlert={openAlert}
        status={status}
        handleClose={handleClose}
        vertical="top"
        horizontal="right"
      />
      <Grid container spacing={1} direction="row" justify="flex-start">
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField
            id="filled-secondary"
            label="Nome"
            variant="filled"
            style={{ width: '100%' }}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <TextField
            label="Assunto"
            variant="filled"
            fullWidth
            onChange={(e) => {
              setAssunto(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            id="filled-secondary"
            label="Email"
            variant="filled"
            fullWidth
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <form autoComplete="off">
            <TextField
              multiline
              rows={6}
              label="Mensagem"
              variant="filled"
              fullWidth
              onChange={(e) => {
                setMensagem(e.target.value);
              }}
            />
          </form>
        </Grid>
        <Grid item lg={9} md={9} sm={8} xs={7} />
        <Grid item lg={3} md={3} sm={4} xs={5}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={enviar}
          >
            Enviar Mensagem
          </Button>
        </Grid>
      </Grid>
    </>
  ); 
};

export default ContatoComp;