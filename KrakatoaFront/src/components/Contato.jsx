import React, { Component } from 'react';
import red from '@material-ui/core/colors/red';
import { Button, TextField } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import api from '../Services/ApiService';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
  },
});

export default class Contato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      mensagem: '',
      email: '',
      assunto: '',
    };
  }

  enviar = async () => {
    const {
      nome, mensagem, email, assunto,
    } = this.state;
    try {
      if (nome === '') throw new Error('Nome Vazio');
      if (mensagem === '') throw new Error('Mensagem Vazia');
      if (email === '') throw new Error('Email Vazio');
      if (assunto === '') throw new Error('Assunto Vazio');

      const data = {
        nome,
        mensagem,
        email,
        assunto,
      };

      const request = await api.Contato(data);
      console.log(request);
      if (request) alert(request);
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
          <MuiThemeProvider theme={theme}>
            <TextField
              id="filled-secondary"
              label="Nome"
              variant="filled"
              onChange={(e) => {
                this.setState({ nome: e.target.value });
              }}
            />
            <div style={{ marginLeft: 20, width: 500 }}>
              <TextField
                label="Assunto"
                variant="filled"
                fullWidth
                onChange={(e) => {
                  this.setState({ assunto: e.target.value });
                }}
              />
            </div>
          </MuiThemeProvider>
        </div>
        <MuiThemeProvider theme={theme}>
          <div style={{ marginTop: 10, width: 741 }}>
            <TextField
              id="filled-secondary"
              label="Email"
              variant="filled"
              fullWidth
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <div>
            <div style={{ marginTop: 10, width: 741, paddingBottom: 10 }}>
              <form noValidade autoComplete="off">
                <TextField
                  multiline
                  rows={6}
                  label="Mensagem"
                  variant="filled"
                  fullWidth
                  onChange={(e) => {
                    this.setState({ mensagem: e.target.value });
                  }}
                />
              </form>
              <div style={{ marginTop: 10, marginLeft: 567, width: 176 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={this.enviar}
                >
                  {' '}
                  Enviar Mensagem
                </Button>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </>
    );
  }
}
