/* Vestidos,Batas,Shorts,Kangas */

import React, { Component } from 'react';
import { InputLabel, Select, FormControl } from '@material-ui/core';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

const styles = {
  root: {
    height: '20px',
    width: '100px',
  },
  input: {
    padding: '10px 14px',
  },
  selectInput: {
    fontFamily: 'Poppins',
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
  },
});

class ComboBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: '',
    };
  }

  render() {
    const { classes } = this.props;
    const { orderBy } = this.state;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <FormControl
            color="primary"
            variant="outlined"
            size="small"
            style={{ width: '300px' }}
          >
            <InputLabel
              classes={{ input: classes.input }}
              style={styles.selectInput}
              color="primary"
              htmlFor="outlined-age-native-simple"
            >
              Ordenar por:
              {' '}
            </InputLabel>
            <Select
              style={styles.selectInput}
              native
              value={orderBy}
              onChange={(event) => {
                this.setState({ orderBy: event.target.value });
              }}
              label="Ordenar por: "
              inputProps={{
                name: 'age',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option style={styles.selectInput} value={10}>
                Mais vendidos
              </option>
              <option style={styles.selectInput} value={20}>
                Menor Preço
              </option>
              <option style={styles.selectInput} value={30}>
                Maior Preço
              </option>
            </Select>
          </FormControl>
        </MuiThemeProvider>
      </div>
    );
  }
}

ComboBox.propTypes = {
  classes: PropTypes.string.isRequired,
};

export default withStyles(styles)(ComboBox);
