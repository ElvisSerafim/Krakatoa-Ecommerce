import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
const styles = {
  background: {
    backgroundColor: '#D0D0D0',
  },
  flexRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: '50',
  },
  txt1: {
    paddingLeft: 5,
    paddingTop: 26,
    paddingBottom: 40,
    fontWeight: 'bold',
  },
  txt2: {
    paddingLeft: 20,
    paddingTop: 26,
  },
  txt3:{
    paddingLeft:20
  },
  txt4:{ 
     paddingLeft: 5,
     color: 'gray'
     },
    txt5:{ 
     paddingLeft: 5
     },
     txt6:{
          paddingLeft: 20, 
        color: 'gray' 
    },
};
export default class MultilineTextFields extends Component {
  render() {
    return (
      <>
        <div style={styles.flexRow}>
          <Typography style={styles.txt2} color="secondary">Olá,</Typography>
          <Typography color="primary" style={styles.txt1}>Usuário </Typography>
        </div>
        <div style={styles.flexRow}>
          <Typography style={styles.txt3} color="secondary">   A partir do painel de controle da sua conta, você pode ver suas</Typography>
          <Typography style={styles.txt4}>compras recentes</Typography>
          <Typography style={styles.txt5} color="secondary">gerenciar seus</Typography>
        </div>
        <div style={styles.flexRow}>
          <Typography style={styles.txt6}>endereços de entrega e cobrança</Typography>
          <Typography style={styles.txt5} color="secondary">e editar suas</Typography>
          <Typography style={styles.txt4}>senhas e detalhes da conta</Typography>
        </div>
      </>
    );
  }
}
