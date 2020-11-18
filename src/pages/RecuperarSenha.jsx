import React, { useState } from 'react';
import { Grid, Button, TextField, Typography, Paper } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import logo from '../img/logo192.png';
import api from '../Services/ApiService';
import Alerta from '../components/Alerta';
import withNav from '../higherComponents/withNav';
import withAnimation from '../higherComponents/withAnimation';

const useStyles = makeStyles((theme) => ({
  Paper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: theme.palette.secondary.main,
    padding: 16,
    '@media (max-width: 1280px)': {
      marginTop: 64,
    },
  },
}));

const RecuperarSenha = () => {
  const classes = useStyles();
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const { register, handleSubmit } = useForm();
  const enviar = async (data) => {
    try {
      if (data.email === '') throw new Error('Email Vazio');
      await api.RecuperarSenha({ email: data.email });
      setStatus('success');
      setMessage('Email Enviado!');
      setOpen(true);
      setTimeout(() => {
        history.push('/redefinirSenha');
      }, 2000);
    } catch (error) {
      setStatus('error');
      setMessage('Não Foi possivel enviar o Email!');
      setOpen(true);
    }
  };

  return (
    <>
      <Alerta
        openAlert={open}
        message={message}
        status={status}
        handleClose={handleClose}
        vertical="top"
        horizontal="right"
      />
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        lg={12}
        sm={12}
        md={12}
      >
        <div style={{ paddingTop: 50 }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img
              src={logo}
              alt="Logo Krakatoa"
              margintop="50px"
              style={{ height: 80, width: 80 }}
            />
          </a>
        </div>
        <div style={{ paddingTop: 30 }}>
          <Typography variant="h4">Redefina sua senha</Typography>
        </div>
        <Grid style={{ paddingTop: 30 }} item lg={5} md={12} sm={12} xs={12}>
          <form noValidate onSubmit={handleSubmit((data) => enviar(data))}>
            <Paper className={classes.Paper}>
              <Grid item lg={12} md={12} sm={12} xm={12}>
                <Typography variant="h6" style={{ color: 'white' }}>
                  Digite o endereço de e-mail verificado da sua conta de usuário
                  e enviaremos um token de redefinição de senha.{' '}
                </Typography>
              </Grid>
              <Grid
                item
                style={{ paddingTop: 30 }}
                lg={12}
                md={12}
                sm={12}
                xs={12}
              >
                <TextField
                  required
                  variant="filled"
                  color="secondary"
                  style={{ backgroundColor: 'white' }}
                  label="Email"
                  name="email"
                  id="Email"
                  inputRef={register}
                  fullWidth
                  placeholder="Insira seu Email"
                />
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                container
                justify="flex-end"
                style={{ paddingTop: 30 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  style={{ borderRadius: 7, height: 50 }}
                >
                  Enviar email de redefinição de senha
                </Button>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
export default withNav(withAnimation(RecuperarSenha));
