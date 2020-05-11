import React, { PureComponent } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core/';
import Navbar from '../components/Nav';
import TextField from '@material-ui/core/TextField';
import Topo from '../components/Topo';
import FooterComp from '../components/Footer';
import './Contato.css';
import { FixedSizeList as List } from 'react-window';
import ContaComp from '../components/MinhaConta';

export default function MyAddress() {
  return (
    <div style={{ padding: '20px 0px 0px 20px' }}>
      <Grid container spacing={2} diretion="row" justify="space-between">
        <Grid item lg={6}>
          <TextField defaultValue="Gustavo" label="Nome" />
        </Grid>
        <Grid item lg={6}>
          <TextField defaultValue="Santos" label="Sobrenome" />
        </Grid>
        <Grid item lg={6} >
          <TextField defaultValue="42700000" label="CEP" />
        </Grid>
        <Grid item lg={6}>
          <TextField defaultValue="667123413" label="CPF" />
        </Grid>
        <Grid item lg={6}>
          <TextField defaultValue="Pitangueiras" label="Bairro" />
        </Grid>
        <Grid item lg={6}>
          <TextField defaultValue="Lauro de Freitas"label="Cidade" />
        </Grid>
        <Grid item lg={6}>
          <TextField defaultValue = "R. Leonardo Rodrigues da Silva" label="Rua" />
        </Grid>
        <Grid item lg={6}>
          <TextField defaultValue="337" label="Número" />
        </Grid>
        <Grid item lg={6}>
          <TextField defaultValue="Domino's"label="Complemento" />
        </Grid>
        <div  style={{paddingTop:20, width:200,paddingRight:100}}>
        <Grid item lg={10}>
        <Button
                  variant="contained"
                  color="primary" 
                  fullWidth
                >
                  {' '}
                  Salvar
                </Button>
        </Grid>
        </div>
      </Grid>
    </div>
  );
}
