import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import { useSelector, useDispatch } from 'react-redux';
import api from '../Services/ApiService';
import Alerta from './Alerta';

export default function MyAddress() {
  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [cpf, setCpf] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [token] = useState(sessionStorage.getItem('token'));
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('error');
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const usuario = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const tentativa = await usuario;
        const { user } = tentativa;
        setNome(user.nome);
        setNumero(user.endereco.numero);
        setCpf(user.cpf);
        setCep(user.endereco.cep);
        setBairro(user.endereco.bairro);
        setCidade(user.endereco.cidade);
        setRua(user.endereco.rua);
        setComplemento(user.endereco.complemento);
        setEstado(user.endereco.estado);
      } catch (error) {}
    };

    getUser();
  }, [usuario]);

  const enviar = async () => {
    try {
      if (nome === '') throw new Error('Nome Vazio');
      if (cep === '') throw new Error('Cep Vazio');
      if (cpf === '') throw new Error('Cpf Vazio');
      if (bairro === '') throw new Error('Bairro Vazio');
      if (cidade === '') throw new Error('Cidade Vazia');
      if (rua === '') throw new Error('Rua Vazia');
      if (numero === '') throw new Error('Numero Vazio');
      if (estado === '') throw new Error('Estado Vazio');
      const data = {
        nome,
        cep,
        cpf,
        bairro,
        cidade,
        rua,
        complemento,
        numero,
        token,
        estado,
      };
      const request = await api.UsuarioEndereco(data);
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
      <Grid
        container
        spacing={2}
        justify="space-around"
        alignItems="flex-start"
        style={{ padding: 16 }}
        lg={12}
      >
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <TextField
            placeholder="Digite Seu Nome"
            label="Nome"
            value={nome}
            variant="filled"
            fullWidth
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <TextField
            placeholder="Digite Seu CEP"
            label="CEP"
            fullWidth
            value={cep}
            variant="filled"
            onChange={(e) => {
              setCep(e.target.value.replace(/[^0-9]/g, ''));
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <InputMask
            mask="999.999.999-99"
            disabled={false}
            maskChar=" "
            value={cpf}
            onChange={(e) => {
              setCpf(e.target.value);
            }}
          >
            {() => (
              <TextField
                style={{
                  width: '100%',
                }}
                label="CPF"
                placeholder="Digite Seu CPF"
                fullWidth
                variant="filled"
              />
            )}
          </InputMask>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <TextField
            placeholder="Digite Seu Bairro"
            label="Bairro"
            variant="filled"
            fullWidth
            value={bairro}
            onChange={(e) => {
              setBairro(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <TextField
            placeholder="Digite Sua Cidade"
            label="Cidade"
            variant="filled"
            fullWidth
            value={cidade}
            onChange={(e) => {
              setCidade(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <TextField
            placeholder="Digite Sua Rua"
            label="Rua"
            variant="filled"
            fullWidth
            value={rua}
            onChange={(e) => {
              setRua(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <TextField
            placeholder="Digite seu Numero"
            label="Número"
            variant="filled"
            fullWidth
            value={numero}
            onChange={(e) => {
              setNumero(e.target.value.replace(/[^0-9]/g, ''));
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <TextField
            placeholder="Digite seu Complemento"
            label="Complemento"
            value={complemento}
            variant="filled"
            fullWidth
            onChange={(e) => {
              setComplemento(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <TextField
            placeholder="Digite seu Estado"
            label="Estado"
            value={estado}
            variant="filled"
            fullWidth
            onChange={(e) => {
              setComplemento(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} />
        <Grid item lg={5} />
        <Grid item lg={9} />
        <Grid item lg={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              enviar();
              setOpen(true);
              setStatus('error');
              switch (true) {
                case nome.length === 0:
                  setMessage('Insira seu nome!');
                  break;
                case cep.toString().length !== 8:
                  setMessage('Cep inválido!');
                  break;
                case cpf.length !== 11:
                  setMessage('Cpf inválido!');
                  break;
                case bairro.length === 0:
                  setMessage('Insira seu bairro!');
                  break;
                case cidade.length === 0:
                  setMessage('Insira sua cidade!');
                  break;
                case rua.length === 0:
                  setMessage('Insira sua rua!');
                  break;
                case numero.length === 0:
                  setMessage('Insira o numero da sua casa!');
                  break;
                default:
                  setMessage('Alterações salvas!');
                  setStatus('success');
                  break;
              }
            }}
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
