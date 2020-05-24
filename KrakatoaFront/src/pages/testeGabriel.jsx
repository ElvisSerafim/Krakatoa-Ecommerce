/* Pagina de Sobre
 */
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import { func } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
import useScript from '../components/useScript';
import ListItem from '../components/ListItem';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Estilo from '../Estilos';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  cor: {
    backgroundColor: theme.palette.background.color,
    color: 'white',
  },
  table: {
    borderRadius: 10,
  },
  divProduto: {
    backgroundColor: 'white',
    color: theme.palette.background.color,
    fontFamily: 'Poppins',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
}));


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
    },
    color: theme.palette.background.color
  },
}))(TableRow);





const TesteGabriel = ({ theme }) => {
  useScript('https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js');
  useScript('https://ecommerce.int.granito.xyz/js/paymentmethodnonce.min.js');
  const classes = useStyles();

  const [mec, setSearch] = useState('');
  const [teste, setTeste] = useState([1, 1, 1, 1, 1]);
  const pesquisa = useSelector((state) => state.pesquisaBarra);
  console.log(pesquisa);
  return (
    <>
      <Container maxWidth="lg">
        <Topo />
        <Navbar />
        <div className={classes.root}>
          {teste.map((item, i) => (
            <div style={{ marginTop: '10px' }}>
              <ExpansionPanel className={classes.cor}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div style={Estilo.flexRowSPACEBTW}>
                    <Typography className={classes.heading}>Pedido 1</Typography>
                    <Typography className={classes.heading}>Data: 12/12/2000</Typography>
                  </div>

                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div style={Estilo.flexColumnStandard}>
                    <div style={Estilo.flexRowSPACEBTW}>
                      <Typography>Frete: R$ 90,00</Typography>
                      <Typography>Preço Total: R$ 200</Typography>
                    </div>
                    <div style={{color: 'white' }}>
                      <ExpansionPanel className={classes.cor}>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <div style={Estilo.flexColumnCENTER}>
                            <Typography className={classes.heading}>Produtos</Typography>
                          </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <Table className={classes.table} aria-label="customized table">
                            <TableBody>
                              <StyledTableRow >
                                <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', marginBottom: '10px', border: 'solid', borderRadius: 10, padding: '5px', boxShadow: '10px 10px 20px black' }}>
                                  <div style={{ fontFamily: 'Poppins', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <p style={{ margin: 0 }}>Vestido Patong</p>
                                    <p style={{ margin: 0 }}>Qnt: 12</p>
                                  </div>
                                  <div style={{ fontFamily: 'Poppins', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <p>Tamanho: GG</p>
                                    <p>Cor: Azul</p>
                                  </div>
                                  <div style={Estilo.flexColumnCENTER}>
                                    <p style={{ margin: 0, fontFamily: 'Poppins' }}>Preço: R$ 90,00</p>
                                  </div>
                                </div>
                              </StyledTableRow>
                            </TableBody>
                          </Table>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </div>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
};
export default TesteGabriel;
