/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import { Box } from '@material-ui/core/';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Quantity from './Quantity';
import { productsUpdate } from '../reducers/productsCart';
import Estilos from '../Estilos';
import { ProdutoTipo } from '../Services/dto/produto.dto';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'red',
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

type PropsComponent = {
  actualTotal: Function;
  removerItem: Function;
};

const CustomizedTables: React.FunctionComponent<PropsComponent> = ({
  actualTotal,
  removerItem,
}) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState<number[]>([]);
  const [total, setTotal] = useState<number[]>([]);
  const [products, setProducts] = useState<ProdutoTipo>();
  const dispatch = useDispatch();
  const allProducts = useSelector((state: any) => state.productsCart);

  useEffect(() => {
    setProducts(allProducts);
    const quantidades: React.SetStateAction<number[]> = [];
    const totais: React.SetStateAction<number[]> = [];
    allProducts.map((item: ProdutoTipo) => {
      quantidades.push(item.quantidade);
      totais.push(item.preco * item.quantidade);
      setTotal(totais);
      setQuantity(quantidades);
      return null;
    });
    actualTotal(totais);
  }, [allProducts]);

  const updateTotal = (index: number) => {
    allProducts[index].quantidade++;
    dispatch(productsUpdate(allProducts));
  };

  const updateSubTotal = (index: number) => {
    allProducts[index].quantidade--;
    dispatch(productsUpdate(allProducts));
  };
  const updateRemoveTotal = (i: number) => {
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
          {allProducts.map((row: ProdutoTipo, i: number) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                <Box>
                  <div style={{ width: '100px', height: '150px' }}>
                    <img
                      src={row.Imageurl}
                      style={{ width: '100%', height: '100%', borderRadius: 5 }}
                      alt="Imagem produto"
                    />
                  </div>
                  <Box
                    justifyContent="center"
                    alignItems="center"
                    style={{ paddingLeft: '40px' }}
                  >
                    {row.nome}
                  </Box>
                </Box>
              </StyledTableCell>

              <StyledTableCell align="right">
                <Box justifyContent="center" alignItems="center">
                  <p>R$</p>
                  <p>{row.preco}</p>
                </Box>
              </StyledTableCell>

              <StyledTableCell align="center">
                <Box justifyContent="center" alignItems="center">
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
                </Box>
              </StyledTableCell>

              <StyledTableCell align="center">
                <Box justifyContent="center" alignItems="center">
                  <p>R$</p>
                  <div style={{ width: 20 }}>
                    <p>{total[i]}</p>
                  </div>
                </Box>
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
};
export default CustomizedTables;
