import React, { useState } from 'react';
import { Grid, Button, TextField, Typography, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import logo from '../img/logo192.png';
import withNav from '../higherComponents/withNav';
import withAnimation from '../higherComponents/withAnimation';
import Alerta from '../components/Alerta';
import api from '../Services/ApiService';
import { setToken, loadUser } from '../reducers/user';

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

const RedefinirSenha = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
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
      if (data.token === '') throw new Error('Token vazio!');
      if (data.novaSenha === '') throw new Error('Nova senha vazia!');
      if (data.confirmarSenha === '') throw new Error('Confirmação vazia!');
      if (data.confirmarSenha !== data.novaSenha) {
        throw new Error('Conflito de Senhas');
      }
      const send = {
        token: data.token,
        newPassword: data.novaSenha,
      };
      const request = await api.RedefinirSenha(send);
      if (request === 'Não foi possivel acessar o servidor') {
        throw new Error('Não foi possivel Alterar');
      }
      dispatch(setToken(request.accessToken));
      dispatch(loadUser(request.accessToken));
      setStatus('success');
      setMessage('Senha Alterada!');
      setOpen(true);
      setTimeout(() => {
        history.push('/conta');
      }, 2000);
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
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
                  Insira o token que foi enviado para o seu email e escolha a
                  nova senha da sua conta.
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
                  name="token"
                  id="token"
                  inputRef={register}
                  variant="filled"
                  color="secondary"
                  style={{ backgroundColor: 'white' }}
                  label="Token"
                  fullWidth
                  placeholder="Insira o token"
                />
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
                  name="novaSenha"
                  id="novaSenha"
                  inputRef={register}
                  color="secondary"
                  style={{ backgroundColor: 'white' }}
                  label="Nova Senha"
                  fullWidth
                  placeholder="Insira a nova senha"
                />
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
                  name="confirmarSenha"
                  id="confirmarSenha"
                  inputRef={register}
                  variant="filled"
                  color="secondary"
                  style={{ backgroundColor: 'white' }}
                  label="Confirmar Senha"
                  fullWidth
                  placeholder="Confirmar senha"
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
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ borderRadius: 7, height: 50 }}
                >
                  Confirmar redefinição de senha
                </Button>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
export default withNav(withAnimation(RedefinirSenha));
