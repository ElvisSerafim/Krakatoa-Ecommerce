/* Pagina de Sobre
 */
import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Estilo from '../Estilos';
import { Table, TableBody, TableRow, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';


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

const setData = (data) => {
  if(data != undefined){
    const stringData = data.toString();
    const arrayString = stringData.split('T');
    return arrayString[0];
  }
  return '';
}



const PedidosMobile = ({ theme, pedidos }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        {pedidos.map((item, i) => (
          <div style={{ marginTop: '10px' }}>
            <ExpansionPanel className={classes.cor}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div style={Estilo.flexRowSPACEBTW}>
                  <Typography className={classes.heading}>Pedido {i + 1}</Typography>
                  <Typography className={classes.heading}>Data: {setData(item.pedido.data)}</Typography>
                </div>

              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={Estilo.flexColumnStandard}>
                  <div style={Estilo.flexRowSPACEBTW}>
                    <Typography>Frete: {item.pedido.frete}</Typography>
                    <Typography>Total: R$ {item.pedido.precoTotal}</Typography>
                  </div>
                  <div style={{ color: 'white' }}>
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
                            {item.produtosPedido.map((row, i) => (
                              <StyledTableRow >
                                <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', marginBottom: '10px', border: 'solid', borderRadius: 10, padding: '5px' }}>
                                  <div style={{ fontFamily: 'Poppins', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <p style={{ margin: 0 }}>{row.produto.nome}</p>
                                    <p style={{ margin: 0 }}>Qnt: {row.quantidade}</p>
                                  </div>
                                  <div style={{ fontFamily: 'Poppins', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <p>Tam: {row.tamanhoEscolhida}</p>
                                    <p>Cor: {row.corEscolhida}</p>
                                  </div>
                                  <div style={Estilo.flexColumnCENTER}>
                                    <p style={{ margin: 0, fontFamily: 'Poppins' }}>Preço: R${row.produto.preco * row.quantidade}</p>
                                  </div>
                                </div>
                              </StyledTableRow>


                            ))}
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
    </>
  );
};
export default PedidosMobile;
