import { createMuiTheme } from '@material-ui/core/styles';
import { red, grey } from '@material-ui/core/colors';

export default createMuiTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  h3: {},
  palette: {
    primary: red,
    secondary: grey,
  },
});
