/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  FilledInput,
  Container,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import api from '../Services/ApiService';
import { setToken, loadUser } from '../reducers/user';
import Alerta from './Alerta';
import Cadastro from './Cadastro';

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    color: theme.palette.primary.main,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.color,
    border: '2px solid white',
    maxWidth: 500,
    width: '100%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
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
    paddingTop: 30,
    paddingBottom: 30,
  },
  cadastro: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 5,
    width: '50%',
  },
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
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
      if (email === '') {
        setOpenAlert(true);
        setMessage('Email vazio');
        setStatus('error');
        throw new Error('Email Vazio');
      }
      if (values.password === '') {
        setOpenAlert(true);
        setMessage('Senha Vazia');
        setStatus('error');
        throw new Error('Senha Vazia');
      }

      const lower = email.toLowerCase();
      const data = {
        email: lower,
        password: values.password,
      };
      const request = await api.Login(data);
      if (request.length > 5) {
        dispatch(setToken(request));
        dispatch(loadUser(request));
        return history.push('/conta/');
      }
      throw new Error('Checar Email e Senha');
    } catch (error) {
      setOpenAlert(true);
      setMessage(error.message);
      setStatus('error');
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
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
      <Grid container item lg={12} md={12} sm={12} xs={12} justify="center">
        <Cadastro
          open={open}
          handleCloseModal={handleCloseModal}
          setMessage={setMessage}
          setStatus={setStatus}
          setOpenAlert={setStatus}
        />

        <Typography
          style={{ paddingTop: 60, color: 'white' }}
          variant="h5"
          color="secondary"
        >
          Entrar
        </Typography>
      </Grid>
      <Container maxWidth="xs">
        <Grid container item lg={12} md={12} sm={12} xs={12} justify="center">
          <div style={styles.email}>
            <FormControl
              variant="filled"
              style={{ width: '100%', backgroundColor: 'white' }}
            >
              <InputLabel
                style={{ width: '100%', color: 'black' }}
                htmlFor="filled-adornment-password"
              >
                Email
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                value={email}
                style={{ width: '100%', color: 'black' }}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <InputAdornment position="end" />
            </FormControl>
          </div>
        </Grid>
        <Grid container item justify="center" lg={12} md={12} sm={12} xs={12}>
          <div style={styles.senha}>
            <FormControl
              variant="filled"
              style={{ width: '100%', backgroundColor: 'white' }}
            >
              <InputLabel
                style={{ width: '100%', color: 'black' }}
                htmlFor="filled-adornment-password"
              >
                Senha
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <a
                href="/recuperarSenha"
                style={{ textDecoration: 'none', decoration: 'none' }}
              >
                <Typography
                  variant="body2"
                  style={{ fontSize: '1.0em' }}
                  color="textSecondary"
                >
                  Perdeu a senha?
                </Typography>
              </a>

              <Typography
                variant="body2"
                style={{ fontSize: '1.0em', cursor: 'pointer' }}
                color="textSecondary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Cadastrar-se
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item container lg={12} md={12} sm={12} xs={12} justify="center">
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
      </Container>
    </>
  );
};

export default Login;
