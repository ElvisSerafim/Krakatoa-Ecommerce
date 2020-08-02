/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from '@material-ui/core/';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Quantity from './Quantity';
import { productsUpdate } from '../reducers/productsCart';
import Estilos from '../Estilos';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    backgroundColor: '#44323D',
    color: theme.palette.common.white,
    fontSize: 20,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    minWidth: 600,
    '&:nth-of-type(odd)': {
      backgroundColor: '#9e9e9e',
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 600,
    borderRadius: 10,
    fontFamily: 'Poppins',
  },
  tableHead: {
    height: 100,
  },
});

export default function CustomizedTables({
  actualTotal,
  removerItem,
  products,
}) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState([]);
  const dispatch = useDispatch();
  const allProducts = products;

  useEffect(() => {
    const quantidades = [];
    const totais = [];
    allProducts.map((item) => {
      quantidades.push(item.quantidadePedido);
      totais.push(item.preco * item.quantidadePedido);
      setTotal(totais);
      setQuantity(quantidades);
      return null;
    });
    actualTotal(totais);
  }, [allProducts]);

  const updateTotal = (index) => {
    let produtosCarrinho = JSON.parse(JSON.stringify(allProducts));
    let produtoAtualizado = produtosCarrinho[index];
    produtoAtualizado.quantidadePedido++;
    dispatch(productsUpdate(produtoAtualizado));
  };

  const updateSubTotal = (index) => {
    let produtosCarrinho = JSON.parse(JSON.stringify(allProducts));
    let produtoAtualizado = produtosCarrinho[index];
    produtoAtualizado.quantidadePedido--;
    dispatch(productsUpdate(produtoAtualizado));
  };
  const updateRemoveTotal = (i) => {
    const auxiliar = [...total];
    auxiliar.splice(i, 1);
    setTotal(auxiliar);
    actualTotal(auxiliar);
  };
  return (
    <TableContainer className={classes.table}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <StyledTableCell align="center">Produtos</StyledTableCell>
            <StyledTableCell align="center">Preço</StyledTableCell>
            <StyledTableCell align="center">Quantidade</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
            <StyledTableCell align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {allProducts.map((row, i) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                <Box display="flex" alignContent="center">
                  {row.isCanga ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 100,
                        height: 150,
                      }}
                    >
                      <img
                        src={row.ImageUrl}
                        style={{
                          transform: 'rotate(90deg)',
                          width: '150px',
                          height: '100px',
                          borderRadius: 5,
                        }}
                        alt="Imagem produto"
                      />
                    </div>
                  ) : (
                    <div style={{ width: '100px', height: '150px' }}>
                      <img
                        src={row.ImageUrl}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 5,
                        }}
                        alt="Imagem produto"
                      />
                    </div>
                  )}
                  <div
                    style={{
                      ...Estilos.flexColumnCENTER2,
                      paddingLeft: '40px',
                    }}
                  >
                    {row.nome}
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        paddingTop: 10,
                      }}
                    >
                      Tamanho: {row.tamanhoEscolhido}
                    </Typography>
                  </div>
                </Box>
              </StyledTableCell>

              <StyledTableCell align="right">
                <div style={Estilos.flexRowCENTER2}>
                  <p>R$</p>
                  <p>{row.preco}</p>
                </div>
              </StyledTableCell>

              <StyledTableCell align="center">
                <div style={Estilos.flexRowCENTER2}>
                  <Quantity
                    onClickPlus={() => {
                      const aux = [...quantity];
                      aux[i]++;
                      setQuantity(aux);
                      const totally = [...total];
                      totally[i] = row.preco * aux[i];
                      setTotal(totally);
                      actualTotal(totally);
                      updateTotal(i);
                    }}
                    onClickMinus={() => {
                      const aux = [...quantity];
                      aux[i]--;
                      const comparator = aux[i];
                      if (comparator >= 1) {
                        setQuantity(aux);
                        const totally = [...total];
                        const newTotal = totally[i] - row.preco;
                        totally[i] = newTotal;
                        setTotal(totally);
                        actualTotal(totally);
                        updateSubTotal(i);
                      }
                    }}
                    quantidade={quantity[i]}
                  />
                </div>
              </StyledTableCell>

              <StyledTableCell align="center">
                <div style={Estilos.flexRowCENTER2}>
                  <p>R$</p>
                  <div style={{ width: 20 }}>
                    <p>{total[i]}</p>
                  </div>
                </div>
              </StyledTableCell>

              <StyledTableCell align="right">
                <Box style={{ cursor: 'pointer', padding: 20 }}>
                  <HighlightOffIcon
                    style={{ height: 30, width: 30 }}
                    onClick={() => {
                      removerItem(allProducts[i]);
                      updateRemoveTotal(i);
                    }}
                  />
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
