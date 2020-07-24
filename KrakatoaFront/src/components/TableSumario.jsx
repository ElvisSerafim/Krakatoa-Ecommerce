/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, Typography, Avatar } from '@material-ui/core/';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Quantity from './Quantity';
import { productsUpdate } from '../reducers/productsCart';
import Estilos from '../Estilos';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  body: {
    backgroundColor: '#D2C9C7',
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    fontSize: 20,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#9e9e9e',
    },
    color: theme.palette.secondary.main,
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
    borderRadius: 10,
    fontFamily: 'Poppins',
  },
  tableHead: {
    height: 70,
  },
  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
}));

export default function CustomizedTables({
  totalSumario,
  actualTotal,
}) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productsCart);

  useEffect(() => {
    setProducts(allProducts);
    const quantidades = [];
    const totais = [];
    allProducts.map((item) => {
      quantidades.push(item.quantidadePedido);
      totais.push(item.preco * item.quantidadePedido);
      setTotal(totais);
      setQuantity(quantidades);
    });
    actualTotal(totais);
  }, [allProducts]);


  return (
    <TableContainer className={classes.table}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <StyledTableCell align="center" />
            <StyledTableCell align="center">Produtos</StyledTableCell>
            <StyledTableCell align="center">Preço</StyledTableCell>
            <StyledTableCell align="center">Quantidade</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allProducts.map((row, i) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                <Avatar src={row.Imageurl} className={classes.large} />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <div
                  style={{ ...Estilos.flexRowCENTER2 }}
                >
                  {row.nome}
                </div>

              </StyledTableCell>
              <StyledTableCell align="right">
                <div style={Estilos.flexRowCENTER2}>
                  <p>R$</p>
                  <p>{row.preco}</p>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div style={Estilos.flexRowCENTER2}>
                  <Typography style={{
                    fontFamily: 'Poppins',
                    fontWeight: 'bold'
                  }}>
                    {quantity[i]}
                  </Typography>
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
            </StyledTableRow>
          ))}
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              {' '}
              <div style={Estilos.flexRowCENTER2}>
                <p>Total</p>
              </div>
            </StyledTableCell>
            <StyledTableCell align="right"> </StyledTableCell>
            <StyledTableCell align="center" />
            <StyledTableCell align="center" />
            <StyledTableCell align="right">
              {' '}
              <div style={Estilos.flexRowCENTER2}>
                <p>R$</p>
                <div style={{ width: 20 }}>
                  <p>{totalSumario}</p>
                </div>
              </div>
            </StyledTableCell>

          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
