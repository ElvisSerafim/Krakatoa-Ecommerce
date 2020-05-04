import { createMuiTheme } from '@material-ui/core/styles';
import { red, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: grey,
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h5: {
      fontSize: '1.5em',
      marginTop: '0px',
    },
    h2: {
      fontWeight: 400,
      margin: '64px',
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
    },
  },
});
export default theme;
