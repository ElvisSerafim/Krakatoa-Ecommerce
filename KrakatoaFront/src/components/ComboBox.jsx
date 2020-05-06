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
      count: 0,
    };
  }

  render() {
    const {
      children, classes, items, value, onChange, label,
    } = this.props;
    const { orderBy } = this.state;
    return (

      <div>
        <MuiThemeProvider theme={theme}>
          <FormControl
            color="primary"
            variant="outlined"
            size="small"
            style={{ ...styles }}
          >
            <InputLabel
              classes={{ input: classes.input }}
              style={styles.selectInput}
              color="primary"
              htmlFor="outlined-age-native-simple"
            >
              {label}
              {' '}
            </InputLabel>
            <Select
              style={styles.selectInput}
              native
              value={value}
              onChange={onChange}
              label="Ordenar por: "
              inputProps={{
                name: 'age',
                id: 'outlined-age-native-simple',
              }}
            >
              <option style={styles.selectInput} value="" />
              {items.map((item) => (
                <option style={styles.selectInput} value={item}>{item}</option>
              ))}
              {children}
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
