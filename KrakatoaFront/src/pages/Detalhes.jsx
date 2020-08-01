/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */
/* Pagina de Contato
 */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Button, Paper } from '@material-ui/core/';
import InputMask from 'react-input-mask';
import { useSelector, useDispatch } from 'react-redux';
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
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [nome, setNome] = useState('');
  const [tel, setTel] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('error');
  const [, setOpenAlert] = useState(false);

  const usuario = useSelector((state) => state.user.user);
  const tokenUser = useSelector((state) => state.user.token);

  useEffect(() => {
    setNome(usuario.nome);
    setTel(usuario.telefone);
  }, []);

  const dispatch = useDispatch();
  const enviar = async () => {
    try {
      if (tel === '') throw new Error('Telefone Vazio');

      const data = {
        nome,
        password: pass,
        newPassword: newPass,
        telefone: tel,
        token: tokenUser,
      };
      const request = await api.AtualizaUsuario(data);
      if (request) {
        const SendRedux = { nome, tel };
        setOpenAlert(true);
        dispatch(userDetails(SendRedux));
        setMessage('Dados Alterados com Sucesso');
        setStatus('success');
      }
    } catch (error) {
      setOpenAlert(true);
      setMessage('Falha na mudança');
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
                  id="passwordOld"
                  type="password"
                  label="Senha Atual"
                  value={pass}
                  fullWidth
                  onChange={(event) => {
                    setPass(event.target.value);
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  variant="filled"
                  id="name"
                  color="primary"
                  label="Nome"
                  fullWidth
                  value={nome}
                  onChange={(event) => {
                    setNome(event.target.value);
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  variant="filled"
                  id="passwordNew"
                  type="password"
                  fullWidth
                  label="Nova Senha"
                  value={newPass}
                  onChange={(event) => {
                    setNewPass(event.target.value);
                  }}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputMask
                  mask="(99)99999-9999"
                  value={tel}
                  disabled={false}
                  maskChar=" "
                  onChange={(event) => {
                    setTel(event.target.value);
                  }}
                >
                  {() => (
                    <TextField
                      variant="filled"
                      id="outlined-name"
                      fullWidth
                      label="Telefone"
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item lg={12} container justify="flex-end">
                <Button
                  style={styles.botao}
                  onClick={() => {
                    enviar();
                    setOpen(true);
                    setStatus('success');
                    switch (true) {
                      case newPass.length > 0:
                        if (pass === '') setMessage('Senha vazio');
                        setStatus('success');
                        setMessage('Alterações salvas!');

                        break;
                      case nome.length === 0:
                        setStatus('error');
                        setMessage('Você deve botar seu nome!');
                        break;
                      case tel.replace(/[^0-9]/g, '').length !== 11 &&
                        tel !== '&366&':
                        setStatus('error');
                        setMessage(
                          'Você deve inserir um número de telefone válido com DDD',
                        );
                        break;
                      default:
                        setMessage('Alterações salvas!');
                        setStatus('success');
                        // ATUALIZAR O NOME DO USARIO
                        // ATUALIZAR O TELEFONE DO USARIO
                        break;
                    }
                  }}
                  variant="contained"
                  color="primary"
                >
                  SALVAR
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
export default withNav(withAnimation(Detalhes));
