import React from 'react';
import { Button, Grid } from '@material-ui/core';
import TextFielde from './TextField';

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
export default function MultilineTextFields() {
  return (
    <>
      <Grid container spacing={2} diretion="row" justify="flex-start">
        <Grid item Lg={12} md={12}>
          <div style={styles.senha}>
            <TextFielde login id="email-login" label="Email" fullWidth />
          </div>
        </Grid>
        <Grid item Lg={12} md={12}>
          <div style={styles.senha}>
            <TextFielde label="Senha" id="password" password />
          </div>
        </Grid>
        <Grid item Lg={6} md={6} flexDirection="row">
          <div style={styles.botaoEntrar}>
            <Button variant="contained" color="primary" fullWidth>
              Continuar
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
