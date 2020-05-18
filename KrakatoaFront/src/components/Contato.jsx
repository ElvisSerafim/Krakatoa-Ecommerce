import React, { Component } from 'react';
import red from '@material-ui/core/colors/red';
import { Button, TextField, Grid } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import api from '../Services/ApiService';
import Alerta from './Alerta';
import Themes from '../themes';
import Estilos from '../Estilos';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
  },
});

class ContatoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      mensagem: '',
      email: '',
      assunto: '',
      openAlert: false,
      message: '',
      status: '',
    };
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openAlert: false });
  };

  enviar = async () => {
    const { nome, mensagem, email, assunto } = this.state;
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
      if (request) {
        this.setState({ openAlert: true });
        this.setState({ message: 'Mensagem enviada com sucesso!' });
        this.setState({ status: 'success' });
        return;
      }
      throw new Error('Não foi possível enviar a mensagem!');
    } catch (error) {
      this.setState({ openAlert: true });
      this.setState({ message: 'Não foi Possivel enviar Mensagem!' });
      this.setState({ status: 'error' });
    }
  };

  render() {
    const { message, openAlert, status } = this.state;
    return (
      <>
        <Alerta
          message={message}
          openAlert={openAlert}
          status={status}
          handleClose={this.handleClose}
          vertical="top"
          horizontal="right"
        />
        <Grid container spacing={1} direction="row" justify="flex-start">
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextField
              id="filled-secondary"
              label="Nome"
              variant="filled"
              style={{ width: '100%' }}
              onChange={(e) => {
                this.setState({ nome: e.target.value });
              }}
            />
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <TextField
              label="Assunto"
              variant="filled"
              fullWidth
              onChange={(e) => {
                this.setState({ assunto: e.target.value });
              }}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              id="filled-secondary"
              label="Email"
              variant="filled"
              fullWidth
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
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
          </Grid>
          <Grid item lg={9} md={9} sm={8} xs={7} />
          <Grid item lg={3} md={3} sm={4} xs={5}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={this.enviar}
            >
              Enviar Mensagem
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}
export default ContatoComp;
