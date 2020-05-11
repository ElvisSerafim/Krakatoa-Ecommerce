import React, { Component } from 'react';
import { Button, Grid } from '@material-ui/core';
import TextFielde from './TextField';
import api from '../Services/ApiService';

const styles = {
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  senha: {
    width: 350,
    paddingTop: 10,
    paddingBottom: 30,
  },
  botaoEntrar: {
    width: 100,
  },
};

export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

   Cadastro = async () => {
    const { email, password } = this.state;
    console.log(email);
    
    if (email === '') throw new Error('Email Vazio');
    if (password === '') throw new Error('Senha Vazia');
    const data = {
      email,
      password,
    };
    const request = api.Cadastro(data);
    console.log(request);
    /* Redirect Pagina do Usuario */
  }

  render() {
    return (
      <>
        <Grid container spacing={2} diretion="row" justify="flex-start">
          <Grid item lg={12} md={12}>
            <div style={styles.senha}>
              <TextFielde
                login
                id="email-login"
                label="Email"
                fullWidth
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
            </div>
          </Grid>
          <Grid item lg={12} md={12}>
            <div style={styles.senha}>
              <TextFielde
                label="Senha"
                id="password"
                password
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
            </div>
          </Grid>
          <Grid item lg={6} md={6} flexDirection="row">
            <div style={styles.botaoEntrar}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={this.Cadastro}
                href="/conta"
              >
                Continuar
              </Button>
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
}
