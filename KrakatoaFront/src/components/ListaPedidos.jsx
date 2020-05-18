import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Estilo from '../Estilos';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.background.color,
    color: 'white',
  },
  body: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#9e9e9e',
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    borderRadius: 10,
    fontFamily: 'Poppins',
  },
  tableHead: {
    height: 100,
  },
});

export default function CustomizedTables({ pedidos }) {
  const classes = useStyles();
  const [pedidosUsuario, setPedidos] = useState(pedidos.produtosPedido);
  console.log(pedidos);
  return (
    <TableContainer className={classes.table}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <StyledTableCell align="center">Pedidos</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.map((row, i) => (
            <StyledTableRow>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >

                  <div style={Estilo.flexRowSPACEBTW}>
                    <Typography className={classes.heading}>Pedido {i + 1}</Typography>
                    <Typography className={classes.heading}>Frete: R$ {row.pedido.frete}</Typography>
                    <Typography className={classes.heading}>Preço Total: R$ {row.pedido.precoTotal}</Typography>
                    <Typography className={classes.heading}>Data: 12/12/2000</Typography>
                  </div>

                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Table className={classes.table} aria-label="customized table">
                    <TableBody >
                      {row.produtosPedido.map((item, i) => (
                        <StyledTableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            <p>{item.produto.nome}</p>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <p>Tamanho: GG</p>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <p>Color: Azul</p>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <p>Quantidade: {item.quantidade}</p>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <p>Preço: R$ {item.produto.preco}</p>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
