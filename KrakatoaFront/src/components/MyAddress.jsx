import React, { useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';
import InputMask from 'react-input-mask';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import api from '../Services/ApiService';
import Alerta from './Alerta';
import { userEndereco } from '../reducers/user';

const MyAddress = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('error');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const Redux = useSelector((state) => state.user);
  const { token, user: usuario } = Redux;
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      estado: usuario.endereco ? usuario.endereco.estado : '',
      cep: usuario.endereco ? usuario.endereco.cep : '',
      cpf: usuario.cpf ? usuario.cpf : '',
      bairro: usuario.endereco ? usuario.endereco.bairro : '',
      cidade: usuario.endereco ? usuario.endereco.cidade : '',
      rua: usuario.endereco ? usuario.endereco.rua : '',
      numero: usuario.endereco ? usuario.endereco.numero : '',
      complemento: usuario.endereco ? usuario.endereco.complemento : '',
    },
  });

  const enviar = async (data) => {
    try {
      if (data.cep === '') throw new Error('Cep Vazio');
      if (data.cpf === '') throw new Error('Cpf Vazio');
      if (data.bairro === '') throw new Error('Bairro Vazio');
      if (data.cidade === '') throw new Error('Cidade Vazia');
      if (data.rua === '') throw new Error('Rua Vazia');
      if (data.numero === '') throw new Error('Numero Vazio');
      if (data.estado === '') throw new Error('Estado Vazio');
      if (data.complemento === '') throw new Error('Complemento Vazio');
      const request = await api.UsuarioEndereco({ ...data, token });
      if (request) {
        dispatch(userEndereco(data));
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
        handleClose={handleClose}
        status={status}
        vertical="top"
        horizontal="right"
      />
      <form
        onSubmit={handleSubmit((data) => {
          enviar(data);
        })}
      >
        <Grid
          container
          spacing={2}
          justify="space-around"
          alignItems="flex-start"
          style={{ padding: 16 }}
        >
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Controller
              as={InputMask}
              control={control}
              name="cep"
              mask="99999-999"
              maskChar=" "
            >
              {() => (
                <TextField
                  required
                  label="CEP"
                  id="CEP"
                  type="text"
                  placeholder="Digite Seu CEP"
                  fullWidth
                  variant="filled"
                  inputRef={register}
                />
              )}
            </Controller>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Controller
              as={InputMask}
              control={control}
              name="cpf"
              mask="999.999.999-99"
              maskChar=" "
            >
              {() => (
                <TextField
                  required
                  name="cpf"
                  label="CPF"
                  id="CPF"
                  inputRef={register}
                  type="text"
                  placeholder="Digite Seu CPF"
                  variant="filled"
                  fullWidth
                />
              )}
            </Controller>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <TextField
              required
              name="bairro"
              label="Bairro"
              id="Bairro"
              type="text"
              placeholder="Digite Seu Bairro"
              variant="filled"
              fullWidth
              inputRef={register}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <TextField
              required
              name="cidade"
              label="Cidade"
              id="Cidade"
              type="text"
              placeholder="Digite Sua Cidade"
              variant="filled"
              fullWidth
              inputRef={register}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <TextField
              required
              name="rua"
              label="Rua"
              id="Rua"
              type="text"
              placeholder="Digite Sua Rua"
              variant="filled"
              fullWidth
              inputRef={register}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Controller
              as={InputMask}
              control={control}
              name="numero"
              mask="999"
              maskChar=" "
            >
              {() => (
                <TextField
                  required
                  label="Numero"
                  id="Numero"
                  type="text"
                  placeholder="Digite Seu Numero"
                  fullWidth
                  variant="filled"
                  inputRef={register}
                />
              )}
            </Controller>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <TextField
              required
              name="complemento"
              label="Complemento"
              id="Complemento"
              type="text"
              placeholder="Digite seu Complemento"
              variant="filled"
              fullWidth
              inputRef={register}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Controller
              as={InputMask}
              control={control}
              name="estado"
              mask="aa"
              maskChar=" "
            >
              {() => (
                <TextField
                  required
                  label="Estado"
                  id="Estado"
                  type="text"
                  placeholder="Digite Seu Estado"
                  fullWidth
                  variant="filled"
                  inputRef={register}
                />
              )}
            </Controller>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} />
          <Grid item lg={5} />
          <Grid item lg={9} />
          <Grid item lg={3}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default MyAddress;
