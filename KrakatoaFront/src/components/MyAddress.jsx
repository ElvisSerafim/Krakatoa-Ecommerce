import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import api from '../Services/ApiService';
import './Contato.css';
import Alerta from '../components/Alerta';
import { useSelector, useDispatch } from 'react-redux';

export default function MyAddress() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cep, setCep] = useState('');
  const [cpf, setCpf] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('error');
  const [open, setOpen] = useState(false);

  const usuario = useSelector((state) => state.user);


  useEffect(() => {

    const getUser = async () => {

      const tentativa = await usuario;
      const user = tentativa.user;
      const tokenUsuario = localStorage.getItem('token');
      console.log(user);
      setNome(user.nome);
      setNumero(user.endereco.numero);
      setCpf(user.cpf);
      setCep(user.endereco.cep);
      setBairro(user.endereco.bairro);
      setCidade(user.endereco.cidade);
      setRua(user.endereco.rua);
    };

    getUser();
  }, []);


  const enviar = async () => {
    try {
      if (nome === '') throw new Error('Nome Vazio');
      if (sobrenome === '') throw new Error('Sobrenome Vazio');
      if (cep === '') throw new Error('Cep Vazio');
      if (cpf === '') throw new Error('Cpf Vazio');
      if (bairro === '') throw new Error('Bairro Vazio');
      if (cidade === '') throw new Error('Cidade Vazia');
      if (rua === '') throw new Error('Rua Vazia');
      if (complemento === '') throw new Error('Complemento Vazio');
      if (numero === '') throw new Error('Numero Vazio');
      const data = {
        nome: nomeCompleto,
        cep: parseInt(cep),
        cpf: parseInt(cpf),
        bairro,
        cidade,
        rua,
        complemento,
        numero: parseInt(numero),
        token,
      };
      const request = await api.UsuarioEndereco(data);
      if (request) {
        console.log(request);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false); 
  };
  return (
    <div style={{ padding: '20px 0px 0px 20px' }}>
      <Alerta openAlert={open} message={message} handleClose={handleClose} status={status} vertical='top' horizontal='right' />
      <Grid container spacing={2} diretion="row" justify="space-between">
        <Grid item lg={6}>
          <TextField
            placeholder="Digite Seu Nome"
            label="Nome"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite Seu Sobrenome"
            label="Sobrenome"
            onChange={(e) => {
              setSobrenome(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite Seu CEP"
            label="CEP"
            value={cep}
            onChange={(e) => {
              setCep(e.target.value.replace(/[^0-9]/g, ''));
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite Seu CPF"
            label="CPF"
            value={cpf}
            onChange={(e) => {
              setCpf(e.target.value.replace(/[^0-9]/g, ''));
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite Seu Bairro"
            label="Bairro"
            value={bairro}
            onChange={(e) => {
              setBairro(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite Sua Cidade"
            label="Cidade"
            value={cidade}
            onChange={(e) => {
              setCidade(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite Sua Rua"
            label="Rua"
            value={rua}
            onChange={(e) => {
              setRua(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite seu Numero"
            label="Número"
            value={numero}
            onChange={(e) => {
              setNumero(e.target.value.replace(/[^0-9]/g, ''));
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite seu Complemento"
            label="Complemento"
            onChange={(e) => {
              setComplemento(e.target.value);
            }}
          />
        </Grid>
        <div style={{ paddingTop: 20, width: 200, paddingRight: 100 }}>
          <Grid item lg={10}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                setNomeCompleto(`${nome} ${sobrenome}`);
                setToken(sessionStorage.getItem('token'));
                enviar();
                setOpen(true);
                setStatus('error');
                switch (true) {
                  case nome.length == 0:
                  setMessage('Insira seu nome!')
                  break;
                  case sobrenome.length == 0:
                    setMessage('Insira seu sobrenome!');
                    break;
                  case cep.length != 8:
                    setMessage('Cep inválido!');
                    break;
                  case cpf.length != 11:
                    setMessage('Cpf inválido!');
                    break;
                  case bairro.length == 0:
                    setMessage('Insira seu bairro!');
                    break;
                  case cidade.length == 0:
                    setMessage('Insira sua cidade!');
                    break;
                  case rua.length == 0:
                    setMessage('Insira sua rua!');
                    break;
                  case numero.length == 0:
                    setMessage('Insira o numero da sua casa!');
                    break;
                    setOpen(true);
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
        </div>
      </Grid>
    </div>
  );
}
