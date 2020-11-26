import React from 'react';

import { TableCell, TableRow } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

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

const Pedido = (item) => {
  return (
    <>
      <StyledTableRow
        key={item.item.Produto_id.nome}
      >
        <StyledTableCell component="th" scope="row">
          <p>{item.item.Produto_id.nome}</p>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <p>Tamanho: {item.item.tamanhoEscolhido}</p>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <p>Quantidade: {item.item.quantidadePedido}</p>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <p>Preço: {item.item.Produto_id.preco}</p>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default Pedido;
