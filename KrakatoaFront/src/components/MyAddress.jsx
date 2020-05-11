import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import api from '../Services/ApiService';
import './Contato.css';

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
  const [token, setToken] = useState(sessionStorage.getItem('item'));

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
        cep,
        cpf,
        bairro,
        cidade,
        rua,
        complemento,
        numero,
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
  return (
    <div style={{ padding: '20px 0px 0px 20px' }}>
      <Grid container spacing={2} diretion="row" justify="space-between">
        <Grid item lg={6}>
          <TextField
            placeholder="Digite Seu Nome"
            label="Nome"
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
            onChange={(e) => {
              setCep(parseInt(e.target.value, 10));
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite Seu CPF"
            label="CPF"
            onChange={(e) => {
              setCpf(parseInt(e.target.value, 10));
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite Seu Bairro"
            label="Bairro"
            onChange={(e) => {
              setBairro(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite Sua Cidade"
            label="Cidade"
            onChange={(e) => {
              setCidade(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite Sua Rua"
            label="Rua"
            onChange={(e) => {
              setRua(e.target.value);
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            placeholder="Digite seu Numero"
            label="Número"
            onChange={(e) => {
              setNumero(parseInt(e.target.value, 10));
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
                setToken(sessionStorage.getItem('item'));
                enviar();
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
