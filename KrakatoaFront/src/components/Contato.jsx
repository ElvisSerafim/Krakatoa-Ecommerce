import React, { useState } from 'react';
import { Button, TextField, Grid, makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import api from '../Services/ApiService';
import Alerta from './Alerta';

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    color: theme.palette.primary.main,
  },
}));
const ContatoComp = () => {
  const [mensage, setPropMensagem] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [status, setStatus] = useState();
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const enviar = async (data) => {
    try {
      if (data === {}) throw new Error('Favor Preencher os campos');
      const request = await api.Contato(data);
      if (request === 'Mensagem Enviada') {
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

      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          enviar(data);
        })}
      >
        <Grid container spacing={1} justify="flex-start">
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextField
              required
              name="nome"
              label="Nome"
              id="Nome"
              type="text"
              variant="filled"
              inputRef={register({
                required: { value: true, message: 'Favor Escrever seu nome' },
                maxLength: { value: 125, message: 'Nome muito grande' },
              })}
              InputLabelProps={{
                classes: {
                  root: classes.inputLabel,
                },
              }}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <TextField
              required
              name="assunto"
              label="Assunto"
              id="Assunto"
              type="text"
              variant="filled"
              inputRef={register({
                required: { value: true, message: 'Favor Escrever o assunto' },
                maxLength: { value: 60, message: 'Assunto muito grande' },
              })}
              InputLabelProps={{
                classes: {
                  root: classes.inputLabel,
                },
              }}
              fullWidth
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              required
              name="email"
              id="Email"
              type="email"
              label="Email"
              variant="filled"
              inputRef={register({
                required: { value: true, message: 'Favor Escrever o email' },
                maxLength: { value: 60, message: 'Email muito grande' },
              })}
              InputLabelProps={{
                classes: {
                  root: classes.inputLabel,
                },
              }}
              fullWidth
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              required
              multiline
              rows={6}
              type="text"
              name="mensagem"
              label="Mensagem"
              inputRef={register({
                required: { value: true, message: 'Favor Escrever a Mensagem' },
                maxLength: { value: 255, message: 'Mensagem muito grande' },
              })}
              variant="filled"
              fullWidth
              InputLabelProps={{
                classes: {
                  root: classes.inputLabel,
                },
              }}
            />
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Enviar Mensagem
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default React.memo(ContatoComp);
