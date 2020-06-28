/* eslint-disable react/prop-types */
/* Vestidos,Batas,Shorts,Kangas */

import React, { Component, ChangeEvent } from 'react';
import { InputLabel, Select, FormControl } from '@material-ui/core';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

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

interface PropsType {
  children?: React.ReactNode;
  items: string[];
  onChange: any;
  label: string;
  style: object;
  value: string;
}

class ComboBox extends Component<PropsType> {
  constructor(props:PropsType) {
    super(props);
  }

  render() {
    const { children, items, value, onChange, label, style } = this.props;
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


export default withStyles(styles)(ComboBox);
