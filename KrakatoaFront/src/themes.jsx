import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8C0705',
    },
    secondary: {
      main: '#fff',
    },
    background: {
      color: '#44323D',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h5: {
      fontSize: '1.5em',
      marginTop: '0px',
    },
    h2: {
      fontWeight: 400,
      marginTop: 64,
      marginBottom: 64,
      textAlign: 'center',
    },
    h3: {
      fontSize: '3.25em',
      fontWeight: '1000',
      fontStyle: 'italic',
      marginTop: 64,
    },
    h4: {
      fontWeight: 700,
    },
    body1: {
      fontSize: '1.0em',
    },
    body2: {
      fontSize: '1.25em',
      color: '#FF5757',
      paddingTop: 9,
      fontWeight: 'bold',
    },
    h6: {
      fontSize: '1.25em',
    },
  },
});
export default theme;
