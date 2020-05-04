import React from 'react';
import { Checkbox, Typography, Button } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TextFielde from './TextField';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
  },
});

const styles = {
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  coluna: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  senha: {
    width: 344,
    paddingTop: 10,
    paddingBottom: 30,
    paddingRight: 415,
  },
  botao: {
    width: 150,
    paddingTop: 50,
  },
  botaoEntrar: {
    width: 150,
  },
  lembre: {
    fontSize: '1.0em',
    color: '#FF5757',
    paddingTop: 9,
    fontWeight: 'bold',
  },
  perdeuSen: {
    fontSize: '1.0em',
    color: '#FF5757',
    paddingTop: 9,
    paddingBottom: 40,
    fontWeight: 'bold',
  },
};
export default function MultilineTextFields() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <div style={styles.coluna}>
          <div style={styles.row}>
            <div style={{ paddingRight: 400, width: 350 }}>
              <TextFielde login id="email-login" label="Email" fullWidth />
            </div>
            <div style={{ width: 344 }}>
              <TextFielde login id="email-register" label="Email" />
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.senha}>
              <TextFielde label="Senha" id="password" password />
            </div>
            <div style={styles.botao}>
              <Button variant="contained" color="primary" fullWidth>
                Continuar
                {' '}
              </Button>
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.botaoEntrar}>
              <Button variant="contained" color="primary" fullWidth>
                Entrar
              </Button>
            </div>
            <div style={styles.row}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <Typography style={styles.lembre}>Lembre-me</Typography>
            </div>
          </div>
          <Typography style={styles.perdeuSen}>Perdeu a senha?</Typography>
        </div>
      </MuiThemeProvider>
    </>
  );
}

/*
 <div style={styles.row}>
                  <div style={styles.botaoEntrar}>
                    <Button variant="contained" color="primary" fullWidth>
                      Entrar
                    </Button>
                  </div>
                  <div style={{paddingTop:30}}>
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  </div>
                </div> */
