/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Checkbox, Typography, Button, Grid, TextField, FormControl, InputLabel, InputAdornment, FilledInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextFielde from './TextField';
import { makeStyles } from '@material-ui/core/styles';
import api from '../Services/ApiService';
import { setUser } from '../reducers/user';
import Alerta from './Alerta';
import Estilos from '../Estilos';

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    color: theme.palette.primary.main
  }
}));
const styles = {
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignSelf: 'center',
  },
  email: {
    maxWidth: 350,
    minWidth: 270,
    width: '100%',
    paddingTop: 10,
    marginTop: 10,
    paddingBottom: 20,
  },
  senha: {
    maxWidth: 350,
    minWidth: 250,
    width: '100%',
    paddingTop: 10,
  },
  botaoEntrar: {
    maxWidth: 350,
    minWidth: 250,
    width: '100%',
    paddingTop: 30
  },
};

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [status, setStatus] = useState('');
  const [sessao, setSessao] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = async () => {
    try {
      if (email === '') throw new Error('Email Vazio');
      if (password === '') throw new Error('Senha Vazia');
      const lower = email.toLowerCase();
      const data = {
        email: lower,
        password,
        sessao,
      };
      const request = await api.Login(data);
      if (request === 'ok') {
        let dataToken;
        if (sessao) {
          dataToken = {
            token: localStorage.getItem('token'),
          };
        } else {
          dataToken = {
            token: sessionStorage.getItem('token'),
          };
        }
        const usuario = await api.getUsuario(dataToken);
        dispatch(setUser(usuario));

        return history.push('/conta/');
      }
      throw new Error('Checar Email e Senha');
    } catch (error) {
      setOpenAlert(true);
      setMessage('Checar Email e Senha');
      setStatus('error');
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
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
      <Grid container lg={12} md={12} sm={12} xs={12} justify="center">
        <Typography style={{ paddingTop: 60, color: 'white' }} variant="h5" color="secondary">
          Cadastro
          </Typography>
      </Grid>
      <Grid container lg={12} md={12} sm={12} xs={12} justify="center">
        <div style={styles.email}>
          <FormControl fullwidth variant="filled" style={{ width: '100%', backgroundColor: 'white' }}>
            <InputLabel style={{ width: '100%', color: 'black' }} htmlFor="filled-adornment-password">Email</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              value={email}
              color="textSecondary"
              style={{ width: '100%', color: 'black' }}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
            />
            <InputAdornment position="end">

            </InputAdornment>
          </FormControl>

        </div>
      </Grid>
      <Grid container lg={12} md={12} sm={12} xs={12} justify="center">
        <div style={styles.email}>
          <FormControl fullwidth variant="filled" style={{ width: '100%', backgroundColor: 'white' }}>
            <InputLabel style={{ width: '100%', color: 'black' }} htmlFor="filled-adornment-password">Email</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              value={email}
              color="textSecondary"
              style={{ width: '100%', color: 'black' }}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
            />
            <InputAdornment position="end">

            </InputAdornment>
          </FormControl>

        </div>
      </Grid>
      <Grid container lg={12} md={12} sm={12} xs={12} justify="center">
        <div style={styles.email}>
          <FormControl fullwidth variant="filled" style={{ width: '100%', backgroundColor: 'white' }}>
            <InputLabel style={{ width: '100%', color: 'black' }} htmlFor="filled-adornment-password">Email</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              value={email}
              color="textSecondary"
              style={{ width: '100%', color: 'black' }}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
            />
            <InputAdornment position="end">

            </InputAdornment>
          </FormControl>

        </div>
      </Grid>
      <Grid container justify="center" lg={12} md={12} sm={12} xs={12}>
        <div style={styles.senha}>
          <FormControl variant="filled" style={{ width: '100%', backgroundColor: 'white' }}>
            <InputLabel style={{ width: '100%', color: 'black' }} htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              color="textSecondary"
              style={{ width: '100%', color: 'black' }}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </Grid>

      <Grid container lg={12} md={12} sm={12} xs={12} justify="center">
        <div style={styles.botaoEntrar}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={login}
          >
            Entrar
              </Button>
        </div>
      </Grid>
      <div
        style={{
          ...Estilos.flexRowStandard,
          flexWrap: 'nowrap',
          alignSelf: 'center',
        }}
      >
        <div
          style={{
            ...Estilos.flexRowStandard,
            flexWrap: 'nowrap',
            alignSelf: 'center',
          }}
        />
      </div>
    </>
  );
};

export default Cadastro;
