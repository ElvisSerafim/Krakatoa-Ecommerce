/**
 * Componente adaptado de Elvis Serafim (Wakandaaaa!)
 */

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Select } from '@material-ui/core';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.br';

const styles = {
  main: {
    width: '100%',
    marginLeft: '1px',
    marginRight: '1px',
    display: 'flex',
    fontSize: 16,
    backgroundColor: 'white',
    boxShadow: '0 0 5px #c9c9c9',
    borderRadius: '20px',
    borderWidth: '0px',
    border: 'none',
    outline: 0,
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingLeft: '15px',
    paddingright: '15px',
    color: '#424242',
    boxSizing: 'border-box',
    search: {
      width: '100%',
      marginLeft: '1px',
      marginRight: '1px',
      display: 'flex',
      fontSize: '16px',
      backgroundColor: 'white',
      boxShadow: '0 0 5px #c9c9c9',
      borderRadius: '8px 0 0 8px',
      borderWidth: '0px',
      border: 'none',
      outline: 0,
      paddingTop: '12px',
      paddingBottom: '12px',
      paddingLeft: '15px',
      paddingright: '15px',
      color: '#424242',
      boxSizing: 'border-box',
    },
  },
  container: {
    lineHeight: '.1',
    color: '#424242',
    search: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  iconContainer: {
    backgroundColor: '#f7f7f7',
    display: 'flex',
    alignItems: 'center',
    width: 64,
    height: 43,
    boxShadow: '0 0 5px #c9c9c9',
    borderRadius: '0 8px 8px 0',
    borderWidth: '0px',
    border: 'none',
    '&:active': {
      boxShadow: '0px 0px 0px #00000000;',
    },
  },
  icon: {
    width: 32,
    height: 32,
  },

  inputs: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  inputsMinhaConta: {
    fontFamily: 'Poppins',
    color: '#F0F0F0',
  },
};

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    const { children, style, classes, onClick } = this.props;
    const {
      login,
      email,
      password,
      label,
      cpf,
      cnpj,
      numberOnly,
      date,
      time,
      datetime,
      phone,
      search,
      select,
      semestre,
      nomeTurma,
    } = this.props;

    if (email) {
      return (
        <div style={styles.container}>
          <p style={styles.inputs}>&nbsp;{label}</p>
          <input
            value={this.props.value}
            onChange={this.props.onChange}
            style={{ ...styles.main, ...style }}
            type="email"
            autoComplete="email"
            onKeyPress={this.props.onKeyPress}
          >
            {children}
          </input>
        </div>
      );
    } else if (password) {
      return (
        <div style={styles.container}>
          <p style={styles.inputsMinhaConta}>&nbsp;{label}</p>
          <input
            value={this.props.value}
            onChange={this.props.onChange}
            style={{ ...styles.main, ...style }}
            type="password"
            autoComplete="password"
          >
            {children}
          </input>
        </div>
      );
    } else if (cpf) {
      return (
        <div style={styles.container}>
          <p>&nbsp;{label}</p>
          <Cleave
            value={this.props.value}
            onChange={this.props.onChange}
            options={{
              delimiters: ['.', '.', '-'],
              blocks: [3, 3, 3, 2],
              numericOnly: true,
            }}
            style={{ ...styles.main, ...style }}
          >
            {children}
          </Cleave>
        </div>
      );
    } else if (cnpj) {
      return (
        <div style={styles.container}>
          <p>&nbsp;{label}</p>
          <Cleave
            value={this.props.value}
            onChange={this.props.onChange}
            options={{
              delimiters: ['.', '.', '/', '-'],
              blocks: [3, 3, 3, 4, 2],
              numericOnly: true,
            }}
            style={{ ...styles.main, ...style }}
          >
            {children}
          </Cleave>
        </div>
      );
    } else if (numberOnly) {
      return (
        <div style={styles.container}>
          <p style={styles.inputs}>&nbsp;{label}</p>
          <Cleave
            value={this.props.value}
            onChange={this.props.onChange}
            options={{
              numericOnly: true,
            }}
            style={{ ...styles.main, ...style }}
          >
            {children}
          </Cleave>
        </div>
      );
    } else if (date) {
      return (
        <div style={styles.container}>
          <p>&nbsp;{label}</p>
          <Cleave
            value={this.props.value}
            onChange={this.props.onChange}
            options={{
              date: true,
              datePattern: ['d', 'm', 'Y'],
            }}
            style={{ ...styles.main, ...style }}
          >
            {children}
          </Cleave>
        </div>
      );
    } else if (time) {
      return (
        <div style={styles.container}>
          <p>&nbsp;{label}</p>
          <Cleave
            value={this.props.value}
            onChange={this.props.onChange}
            options={{
              time: true,
              timePattern: ['h', 'm'],
            }}
            style={{ ...styles.main, ...style }}
          >
            {children}
          </Cleave>
        </div>
      );
    } else if (datetime) {
      return (
        <div style={styles.container}>
          <p>&nbsp;{label}</p>
          <Cleave
            value={this.props.value}
            onChange={this.props.onChange}
            options={{
              delimiters: ['/', '/', ' ', ':', ':'],
              blocks: [2, 2, 4, 2, 2, 2],
              numericOnly: true,
            }}
            style={{ ...styles.main, ...style }}
          >
            {children}
          </Cleave>
        </div>
      );
    } else if (phone) {
      return (
        <div style={styles.container}>
          <p style={styles.inputs}>&nbsp;{label}</p>
          <Cleave
            value={this.props.value}
            onChange={this.props.onChange}
            options={{
              phone: true,
              phoneRegionCode: 'BR',
            }}
            style={{ ...styles.main, ...style }}
          >
            {children}
          </Cleave>
        </div>
      );
    } else if (select) {
      return (
        <div style={styles.container}>
          <label>
            <select>
              <option value="null">Tipo</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>
        </div>
      );
    } else if (login) {
      return (
        <div style={styles.container}>
          {label && <p style={styles.inputsMinhaConta}>&nbsp;{label}</p>}
          <input
            value={this.props.value}
            onChange={this.props.onChange}
            onFocus={(this.value = '')}
            style={{ ...styles.main, ...style }}
          >
            {children}
          </input>
        </div>
      );
    } else {
      return (
        <div style={styles.container}>
          {label && <p style={styles.inputs}>&nbsp;{label}</p>}
          <input
            value={this.props.value}
            onChange={this.props.onChange}
            onFocus={(this.value = '')}
            style={{ ...styles.main, ...style }}
          >
            {children}
          </input>
        </div>
      );
    }
  }
}

//Essa funcao comentada é a funcao responsavel para fazer a navagecao para outrarota
// this.props.history.push('./outrarota')

export default withStyles(styles)(TextField);
