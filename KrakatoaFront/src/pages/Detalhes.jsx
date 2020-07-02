/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */
/* Pagina de Contato
 */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Button } from '@material-ui/core/';
import MaskedInput from 'react-text-mask';
import './Contato.css';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useSelector } from 'react-redux';
import ContaComp from '../components/ContaComp';
import Alerta from '../components/Alerta';
import api from '../Services/ApiService';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';

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
function Detalhes() {
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [nome, setNome] = useState('');
  const [tel, setTel] = useState('&366&');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('error');
  const [, setPassCurrent] = useState('');
  const [, setToken] = useState();
  const [, setOpenAlert] = useState(false);
  const [values, setValues] = React.useState({
    default: '71999362212',
    numberformat: '1320',
  });

  const usuario = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      const tentativa = await usuario;
      const { user } = tentativa;
      setPassCurrent(user.password);
      setNome(user.nome);
      setTel(user.telefone);
    };

    getUser();
  }, []);

  const enviar = async () => {
    try {
      if (nome === '') throw new Error('Nome Vazio');
      if (newPass === '') throw new Error('Nova Senha Vazio');
      if (tel === '') throw new Error('Telefone Vazio');
      let tokenUser;
      if (sessionStorage.getItem('token') !== undefined) {
        tokenUser = sessionStorage.getItem('token');
        setToken(tokenUser);
      } else {
        tokenUser = localStorage.getItem('token');
        setToken(tokenUser);
      }
      const data = {
        nome,
        password: pass,
        newPassword: newPass,
        telefone: tel,
        token: tokenUser,
      };
      const request = await api.AtualizaUsuario(data);
      if (request) {
        setOpenAlert(true);
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

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
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
      <Grid container spacing={2} style={{ marginBottom: 64 }} justify="space-around">
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
              variant="filled"
              id="outlined-name"
              style={{ width: '100%', backgroundColor: 'white' }}
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
              id="outlined-name"
              style={{ width: '100%', backgroundColor: 'white', color: 'black' }}
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
              id="outlined-name"
              style={{ width: '100%', backgroundColor: 'white', color: 'black' }}
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
                setStatus('success');
                switch (true) {
                  case newPass.length > 0:
                    if (pass === '') setMessage('Senha vazio');
                    /*
                        VERIFICAR SE A SENHA ATUAL ESTÁ CERTA
                      */

                    setStatus('success');
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
                  case tel.replace(/[^0-9]/g, '').length !== 11
                      && tel !== '&366&':
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
    </>
  );
}
export default withNav(withAnimation(Detalhes));
