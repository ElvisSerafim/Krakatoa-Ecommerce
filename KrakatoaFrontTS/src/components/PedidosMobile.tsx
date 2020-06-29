/* Pagina de Sobre
 */
import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Table,
  TableBody,
  TableRow,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Box,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Estilo from '../Estilos';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  cor: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
  table: {
    borderRadius: 10,
  },
  divProduto: {
    backgroundColor: 'white',
    color: theme.palette.secondary.main,
    fontFamily: 'Poppins',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {},
    color: theme.palette.secondary.main,
  },
}))(TableRow);

const setData = (data: any) => {
  if (data !== undefined) {
    const stringData = data.toString();
    const arrayString = stringData.split('T');
    return arrayString[0];
  }
  return '';
};

const PedidosMobile: React.FunctionComponent<any> = ({ pedidos }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        {pedidos.map((item: any, i: number) => (
          <div style={{ marginTop: '10px' }}>
            <ExpansionPanel className={classes.cor}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box justifyContent="space-between">
                  <Typography className={classes.heading}>
                    Pedido {i + 1}
                  </Typography>
                  <Typography className={classes.heading}>
                    Data: {setData(item.pedido.data)}
                  </Typography>
                </Box>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Box>
                  <Box justifyContent="space-between">
                    <Typography>Frete: {item.pedido.frete}</Typography>
                    <Typography>Total: R$ {item.pedido.precoTotal}</Typography>
                  </Box>
                  <div style={{ color: 'white' }}>
                    <ExpansionPanel className={classes.cor}>
                      <ExpansionPanelSummary
                        expandIcon={
                          <ExpandMoreIcon style={{ color: 'white' }} />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Box
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Typography className={classes.heading}>
                            Produtos
                          </Typography>
                        </Box>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Table
                          className={classes.table}
                          aria-label="customized table"
                        >
                          <TableBody>
                            {item.produtosPedido.map((row: any, i: number) => (
                              <StyledTableRow>
                                <div
                                  style={{
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginBottom: '10px',
                                    border: 'solid',
                                    borderRadius: 10,
                                    padding: '5px',
                                  }}
                                >
                                  <Box
                                    justifyContent="space-between"
                                    style={{
                                      fontFamily: 'Poppins',
                                    }}
                                  >
                                    <p style={{ margin: 0 }}>
                                      {row.produto.nome}
                                    </p>
                                    <p style={{ margin: 0 }}>
                                      Qnt: {row.quantidade}
                                    </p>
                                  </Box>
                                  <Box
                                    justifyContent="space-between"
                                    style={{
                                      fontFamily: 'Poppins',
                                    }}
                                  >
                                    <p>Tam: {row.tamanhoEscolhida}</p>
                                    <p>Cor: {row.corEscolhida}</p>
                                  </Box>
                                  <Box
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <p
                                      style={{
                                        margin: 0,
                                        fontFamily: 'Poppins',
                                      }}
                                    >
                                      Preço: R$
                                      {row.produto.preco * row.quantidade}
                                    </p>
                                  </Box>
                                </div>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </Box>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        ))}
      </div>
    </>
  );
};
export default PedidosMobile;
