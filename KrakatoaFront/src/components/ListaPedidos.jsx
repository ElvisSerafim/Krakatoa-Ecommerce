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

const StyledTableRow = withStyles(() => ({
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
  // eslint-disable-next-line no-empty-pattern
  const [] = useState(pedidos.produtos);

  const setData = (data) => {
    if (data !== undefined) {
      const stringData = data.toString();
      const arrayString = stringData.split('T');
      return arrayString[0];
    }
    return '';
  };
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
                    <Typography className={classes.heading}>
                      Pedido {row.idPedido}
                    </Typography>
                    <Typography className={classes.heading}>
                      Frete: R$ {row.frete}
                    </Typography>
                    <Typography className={classes.heading}>
                      Preço Total: R$ {row.precoTotal/100}
                    </Typography>
                    <Typography className={classes.heading}>
                      Data: {setData(row.createdAt)}
                    </Typography>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableBody>
                      {row.produtos.map((item, i) => (
                        <StyledTableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            <p>Teste {i +1}</p>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <p>Tamanho: {item.tamanhoEscolhido}</p>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <p>Quantidade: {item.quantidadePedido}</p>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <p>
                              Preço: R$ {100 * item.quantidadePedido}
                            </p>
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
