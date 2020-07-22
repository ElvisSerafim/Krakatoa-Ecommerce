/* eslint-disable react/prop-types */
/* Vestidos,Batas,Shorts,Kangas */

import React, { Component } from 'react';
import { InputLabel, Select, FormControl } from '@material-ui/core';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
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
      main: '#00000',
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
      children,
      classes,
      items,
      value,
      onChange,
      label,
      style,
    } = this.props;
    const { orderBy } = this.state;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <FormControl
            color="primary"
            variant="outlined"
            size="small"
            style={{ ...style }}
          >
            <InputLabel
              classes={{ input: classes.input }}
              style={styles.selectInput}
              color="primary"
              htmlFor="outlined-age-native-simple"
            >
              {label}
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
                <option style={styles.selectInput} value={item}>
                  {item}
                </option>
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
