/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */
/* Pagina de Contato
 */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Button, Paper } from '@material-ui/core/';
import InputMask from 'react-input-mask';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import ContaComp from '../components/ContaComp';
import Alerta from '../components/Alerta';
import api from '../Services/ApiService';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';
import { userDetails } from '../reducers/user';

const styles = {
  background: {
    backgroundColor: '#44323D',
  },
  flexRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: '50',
  },
  quadrado1: {
    backgroundColor: '#44323D',
    width: 800,
    height: 300,
    paddingTop: 50,
    paddingeft: 20,
    borderRadius: 10,
  },
  botao: {
    height: 50,
    width: '20%',
  },
};

function Detalhes() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('error');

  const Redux = useSelector((state) => state.user);
  const { token, user: usuario } = Redux;

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      nome: usuario.nome,
      telefone: usuario.telefone,
    },
  });

  const dispatch = useDispatch();
  const enviar = async (data) => {
    try {
      if (data.telefone === '') throw new Error('Telefone Vazio');
      if (data.nome === '') throw new Error('Nome Vazio');
      if (data.password) {
        if (!data.newPassword) {
          throw new Error('Senha Nova Vazio');
        }
        if (data.newPassword !== data.password) {
          throw new Error('Senhas Diferentes');
        }
        if (data.password.length < 8 || data.newPassword < 8) {
          throw new Error('As senhas devem possuir 8 caracteres');
        }
      }
      const request = await api.AtualizaUsuario({ ...data, token });
      if (request === 'ok') {
        const { nome, telefone } = data;
        const SendRedux = { nome, telefone };
        dispatch(userDetails(SendRedux));
        setOpen(true);
        setMessage('Dados Alterados com Sucesso');
        setStatus('success');
      }
    } catch (error) {
      setOpen(true);
      setMessage(error.message);
      setStatus('error');
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
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
        spacing={2}
        justify="space-around"
        alignItems="flex-start"
      >
        <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 32 }}>
          <Typography variant="h4" color="primary">
            Minha Conta
          </Typography>
        </Grid>
        <Grid item container lg={5} md={4} sm={12} xs={12}>
          <ContaComp />
        </Grid>
        <Grid
          item
          container
          lg={7}
          md={7}
          sm={12}
          xs={12}
          spacing={2}
          alignContent="flex-start"
        >
          <Paper
            elevation={3}
            style={{ backgroundColor: '#D2C9C7', padding: 30 }}
          >
            <form
              onSubmit={handleSubmit((data) => {
                enviar(data);
              })}
            >
              <Grid
                item
                container
                lg={12}
                md={12}
                sm={12}
                xs={12}
                spacing={2}
                justify="space-around"
              >
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    variant="filled"
                    name="password"
                    id="Password"
                    label="Senha Atual"
                    fullWidth
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    name="nome"
                    id="Nome"
                    label="Nome"
                    fullWidth
                    variant="filled"
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    name="newPassword"
                    id="newPassword"
                    label="Nova Senha"
                    fullWidth
                    variant="filled"
                    inputRef={register}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Controller
                    as={InputMask}
                    control={control}
                    name="telefone"
                    id="telefone"
                    mask="(99)99999-9999"
                    maskChar=" "
                  >
                    {() => (
                      <TextField
                        name="telefone"
                        id="telefone"
                        variant="filled"
                        id="outlined-name"
                        inputRef={register}
                        fullWidth
                        label="Telefone"
                      />
                    )}
                  </Controller>
                </Grid>
                <Grid item lg={12} container justify="flex-end">
                  <Button
                    style={styles.botao}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
export default withNav(withAnimation(Detalhes));
