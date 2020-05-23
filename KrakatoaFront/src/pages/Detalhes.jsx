/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */
/* Pagina de Contato
 */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Typography, Button } from '@material-ui/core/';
import MaskedInput from 'react-text-mask';
import './Contato.css';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import ContaComp from '../components/ContaComp';
import FooterComp from '../components/Footer';
import Topo from '../components/Topo';
import Navbar from '../components/Nav';
import Alerta from '../components/Alerta';
import api from '../Services/ApiService';

const styles = {
  background: {
    backgroundColor: '#D0D0D0',
  },
  flexRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: '50',
  },
  quadrado1: {
    backgroundColor: 'white',
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

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}
export default function Datalhes() {
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [nome, setNome] = useState('');
  const [tel, setTel] = useState('&366&');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('error');
  const [passCurrent, setPassCurrent] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [values, setValues] = React.useState({
    default: '71999362212',
    numberformat: '1320',
  });

  const usuario = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      const tentativa = await usuario;
      const { user } = tentativa;
      const tokenUsuario = localStorage.getItem('token');
      console.log(user);
      setPassCurrent(user.password);
      setNome(user.nome);
      setTel(user.telefone);
    };

    getUser();
  }, []);

  const enviar = async () => {
    if (nome === '') throw new Error('Nome Vazio');
    if (newPass === '') throw new Error('Nova Senha Vazio');
    if (tel === '') throw new Error('Telefone Vazio');

    const data = {
      nome,
      password: pass,
      newPassword: newPass,
      telefone: tel,
      token,
    };
    const request = await api.AtualizaUsuario(data);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <Container maxWidth="lg" style={{ marginBottom: 64 }}>
        <Topo />
        <Navbar />
        <Alerta
          openAlert={open}
          message={message}
          status={status}
          handleClose={handleClose}
          vertical="top"
          horizontal="right"
        />
        <Grid container spacing={2} justify="space-around">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h4" color="primary" style={{ marginTop: 64 }}>
              Minha Conta
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="space-around"
            lg={3}
            md={3}
            sm={12}
            xs={12}
            style={{ marginBottom: 32 }}
          >
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
            justify="space-around"
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              width: '100%',
              height: '100%',
              padding: 30,
            }}
          >
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
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
              <FormControl style={{ width: '100%' }}>
                <InputLabel
                  style={{ fontSize: '1.25em' }}
                  htmlFor="formatted-text-mask-input"
                >
                  Telefone
                </InputLabel>
                <Input
                  defaultValue={values.default}
                  onChange={handleChange}
                  name="textmask"
                  id="formatted-text-mask-input"
                  value={tel}
                  onChange={(event) => {
                    setTel(event.target.value);
                  }}
                  inputComponent={TextMaskCustom}
                />
              </FormControl>
            </Grid>
            <Grid item lg={12} container justify="flex-end">
              <Button
                style={styles.botao}
                onClick={() => {
                  setToken(sessionStorage.getItem('token'));
                  enviar();
                  setOpen(true);
                  setStatus('sucess');
                  switch (true) {
                    case newPass.length > 0:
                      if (pass === '') setMessage('Senha vazio');
                      /*
                        VERIFICAR SE A SENHA ATUAL ESTÁ CERTA
                      */

                      setStatus('sucess');
                      setMessage('Alterações salvas!');

                      /*
                      SE ESTIVER CERTA, RODAR O CÓDIGO ABAIXO:
                    */
                      // ATUALIZAR A SENHA PARA NEWPASS
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
        </Grid>
      </Container>
      <FooterComp />
    </>
  );
}
