/* Pagina de Sobre
 */
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import { func } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Estilo from '../Estilos';
import ListItem from '../components/ListItem';
import Footer from '../components/Footer';
import Topo from '../components/Topo';
import Navbar from '../components/Nav';
import ProdutoMobile from '../components/ProdutoMobile';

const TesteGabriel = ({ theme }) => {
  const [mec, setSearch] = useState('');

  return (
    <>
      <Container maxWidth="lg">
        <Topo />
        <Navbar />
        <div style={{marginBottom: '60px', marginTop: '60px'}}>
        </div>
      </Container>
      <Footer />
    </>
  );
};
export default TesteGabriel;
