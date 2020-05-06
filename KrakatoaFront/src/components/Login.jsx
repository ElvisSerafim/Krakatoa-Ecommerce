import React, { Component } from 'react';
import {
  Checkbox, Typography, Button, Grid,
} from '@material-ui/core';
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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      sessao: false,
    };
  }

  handleChange(event) {
    this.setState({ sessao: event.target.checked });
  }

  async login() {
    const { email, password, sessao } = this.state;
    if (email === '') throw new Error('Email Vazio');
    if (password === '') throw new Error('Senha Vazia');
    const data = {
      email,
      password,
      sessao,
    };
    const request = api.Login(data);
    /* Redirect Pagina do Usuario */
  }

  render() {
    return (
      <>
        <Grid container spacing={2} diretion="row" justify="flex-start">
          <Grid item Lg={12} md={12}>
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
          <Grid item Lg={12} md={12}>
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
          <Grid item Lg={6} md={6} flexDirection="row">
            <div style={styles.row}>
              <div style={styles.botaoEntrar} onClick={this.login}>
                <Button variant="contained" color="primary" fullWidth>
                  Entrar
                </Button>
              </div>
              <div style={styles.row}>
                <Checkbox
                  checked={this.state.sessao}
                  onChange={this.handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Typography
                  variant="body2"
                  color="secondary"
                  style={{ marginBottom: 0 }}
                >
                  Lembre-me
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item Lg={12} md={12}>
            <Typography
              variant="body2"
              color="primary"
              style={{ marginBottom: 40 }}
            >
              Perdeu a senha?
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  }
}
