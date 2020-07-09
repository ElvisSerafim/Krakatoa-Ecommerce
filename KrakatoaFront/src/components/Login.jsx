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
  Backdrop,
  Fade,
  Modal,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import api from '../Services/ApiService';
import { setUser } from '../reducers/user';
import Alerta from './Alerta';
import Estilos from '../Estilos';

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
  const [emailCadastro, setEmailCadastro] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [message, setMessage] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [open, setOpen] = useState(false);
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

  const cadastro = async () => {
    if (emailCadastro === '') {
      setOpenAlert(true);
      setMessage('Email vazio');
      setStatus('error');
      throw new Error('Email Vazio');
    }
    if (nome === '') {
      setOpenAlert(true);
      setMessage('Nome Vazio');
      setStatus('error');
      throw new Error('Nome Vazio');
    }
    if (password === '') {
      setOpenAlert(true);
      setMessage('Senha vazia');
      setStatus('error');
      throw new Error('Senha Vazia');
    }
    if (confirmPassword === '') {
      setOpenAlert(true);
      setMessage('Confirmar senha !');
      setStatus('error');
      throw new Error('Senha não confirmada');
    }

    if (password !== confirmPassword) {
      setOpenAlert(true);
      setMessage('Senhas não coincidem !');
      setStatus('error');
      throw new Error('Senhas Diferentes !');
    }

    const lower = emailCadastro.toLowerCase();
    const data = {
      email: emailCadastro,
      password,
      nome,
    };

    if (password !== confirmPassword) {
      setOpenAlert(true);
      setMessage('Senhas não coincidem !');
      setStatus('error');
      throw new Error('Senhas Diferentes !');
    }
    return history.push('/conta/');
  };

  const handleOpen = () => {
    setOpen(true);
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
      <Grid container lg={12} md={12} sm={12} xs={12} justify="center">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2
                style={{ color: 'white', fontFamily: 'Poppins' }}
                id="transition-modal-title"
              >
                Cadastro
              </h2>
              <FormControl
                fullwidth
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
                  value={emailCadastro}
                  color="textSecondary"
                  style={{ width: '100%', color: 'black' }}
                  onChange={(event) => {
                    setEmailCadastro(event.target.value);
                  }}
                />
                <InputAdornment position="end" />
              </FormControl>
              <div style={{ paddingTop: 10 }}>
                <FormControl
                  fullwidth
                  variant="filled"
                  style={{ width: '100%', backgroundColor: 'white' }}
                >
                  <InputLabel
                    style={{ width: '100%', color: 'black' }}
                    htmlFor="filled-adornment-password"
                  >
                    Nome
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    value={nome}
                    color="textSecondary"
                    style={{ width: '100%', color: 'black' }}
                    onChange={(event) => {
                      setNome(event.target.value);
                    }}
                  />
                  <InputAdornment position="end" />
                </FormControl>
              </div>
              <div style={{ paddingTop: 10 }}>
                <FormControl
                  fullwidth
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
                    value={password}
                    color="textSecondary"
                    style={{ width: '100%', color: 'black' }}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <InputAdornment position="end" />
                </FormControl>
              </div>
              <div style={{ paddingTop: 10 }}>
                <FormControl
                  fullwidth
                  variant="filled"
                  style={{ width: '100%', backgroundColor: 'white' }}
                >
                  <InputLabel
                    style={{ width: '100%', color: 'black' }}
                    htmlFor="filled-adornment-password"
                  >
                    Confirmar Senha
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    value={confirmPassword}
                    color="textSecondary"
                    style={{ width: '100%', color: 'black' }}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                  <InputAdornment position="end" />
                </FormControl>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingTop: 10,
                }}
              >
                <Button variant="contained" color="primary" onClick={cadastro}>
                  Cadastre-se
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>

        <Typography
          style={{ paddingTop: 60, color: 'white' }}
          variant="h5"
          color="secondary"
        >
          Entrar
        </Typography>
      </Grid>
      <Grid container lg={12} md={12} sm={12} xs={12} justify="center">
        <div style={styles.email}>
          <FormControl
            fullwidth
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
              color="textSecondary"
              style={{ width: '100%', color: 'black' }}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <InputAdornment position="end" />
          </FormControl>
        </div>
      </Grid>
      <Grid container justify="center" lg={12} md={12} sm={12} xs={12}>
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <a href="/cangas" style={{ decoration: 'none' }}>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ fontSize: '1.0em' }}
              >
                Perdeu a senha?
              </Typography>
            </a>

            <Typography
              variant="body2"
              color="textSecondary"
              style={{ fontSize: '1.0em', cursor: 'pointer' }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Cadastrar-se
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid container lg={12} md={12} sm={12} xs={12} justify="center">
        <div style={styles.botaoEntrar}>
          <Button variant="contained" color="primary" fullWidth onClick={login}>
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

export default Login;
