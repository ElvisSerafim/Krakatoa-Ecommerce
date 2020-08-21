/* eslint-disable react/prop-types */
/* Vestidos,Batas,Shorts,Kangas */

import React, { PureComponent } from 'react';
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

class ComboBox extends PureComponent {
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
                <option style={styles.selectInput} key={item} value={item}>
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

export default withStyles(styles)(React.memo(ComboBox));
