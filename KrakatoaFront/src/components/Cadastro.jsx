import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  FilledInput,
  Backdrop,
  Fade,
  Modal,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import api from '../Services/ApiService';
import { setToken, loadUser } from '../reducers/user';


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


const Cadastro = ({ open, handleCloseModal, setOpenAlert, setMessage, setStatus }) => {
  const [emailCadastro, setEmailCadastro] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

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
      email: lower,
      password,
      nome,
    };
    const request = await api.Cadastro(data);
    if (request.length > 5) {
      dispatch(setToken(request));
      dispatch(loadUser(request));
      return history.push('/conta/');
    }
  };

  return (
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
              style={{ width: '100%', color: 'black' }}
              onChange={(event) => {
                setEmailCadastro(event.target.value);
              }}
            />
            <InputAdornment children={false} position="end" />
          </FormControl>
          <div style={{ paddingTop: 10 }}>
            <FormControl
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
  );
};


export default Cadastro;
