import React from 'react';
import red from '@material-ui/core/colors/red';
import { Button, TextField } from '@material-ui/core';
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
  },
});
export default function MultilineTextFields() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
        <MuiThemeProvider theme={theme}>
          <TextField id="filled-secondary" label="Nome" variant="filled" />
          <div style={{ marginLeft: 20, width: 500 }}>
            <TextField label="Assunto" variant="filled" fullWidth />
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
          />
        </div>
        <div>
          <div style={{ marginTop: 10, width: 741, paddingBottom: 10 }}>
            <form className={classes.root} noValidade autoComplete="off">
              <TextField
                multiline
                rows={6}
                label="Mensagem"
                variant="filled"
                fullWidth
              />
            </form>
            <div style={{ marginTop: 10, marginLeft: 567, width: 176 }}>
              <Button variant="contained" color="primary" fullWidth>
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
