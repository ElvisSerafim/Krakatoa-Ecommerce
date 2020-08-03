import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import {
  Box,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core';

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
  return (
    <>
      {pedidos.length === 0 ? (
        <Typography
          color="primary"
          variant="h4"
          style={{ fontSize: '3.0em', fontWeight: 'Bold' }}
        >
          Sem Pedidos Realizados
        </Typography>

      ) : (
          <TableContainer className={classes.table} >
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <StyledTableCell align="center">Pedidos</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pedidos.map((row) => (
                  <StyledTableRow key={row.id}>
                    <ExpansionPanel style={{ borderRadius: 0 }}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>
                          Pedido {row.idPedido}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Table
                          className={classes.table}
                          aria-label="customized table"
                        >
                          <TableBody>
                            <Box display="flex" component='th' justifyContent="space-between">
                              <Typography className={classes.heading}>
                                Frete: R$ {row.frete}
                              </Typography>
                              <Typography className={classes.heading}>
                                Preço Total: R$ {row.precoTotal / 100}
                              </Typography>
                            </Box>
                            {row.produtos.map((item, i) => (
                              <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row">
                                  <p>{item.Produto_id.nome}</p>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                  <p>Tamanho: {item.tamanhoEscolhido}</p>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                  <p>Quantidade: {item.quantidadePedido}</p>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                  <p>Preço: R$ {item.Produto_id.preco * item.quantidadePedido}</p>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                            <Typography
                              variant="body1"
                              style={{ padding: 10 }}
                              color="primary"
                            >
                              Data {moment(row.createdAt).format('DD/MM/YYYY')}
                            </Typography>
                          </TableBody>
                        </Table>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer >
        )}
    </>
  );
}
