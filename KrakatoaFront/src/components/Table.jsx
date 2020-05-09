import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box } from '@material-ui/core/';
import Quantity from '../components/Quantity';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { productsUpdate } from '../reducers/productsCart';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'red',
        color: theme.palette.common.white,
    },
    body: {
        backgroundColor: 'black',
        color: theme.palette.common.white,
        fontSize: 20,
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
        fontFamily: 'Poppins'
    },
    tableHead: {
        height: 100
    }
});


export default function CustomizedTables({ produtos, actualTotal, removerItem }) {
    const classes = useStyles();
    const [quantity, setQuantity] = useState([]);
    const [total, setTotal] = useState([]);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setProducts(produtos);
        const quantidades = [];
        const totais = [];
        produtos.map((item, i) => {
            quantidades.push(item.quantidade);
            totais.push(item.preco * item.quantidade);
            setTotal(totais);
            setQuantity(quantidades);
        });
        actualTotal(totais);
    }, []);

    const updateTotal = (index) => {

        products[index].quantidade++;
        dispatch(productsUpdate(products));

    }


    return (
        <TableContainer className={classes.table}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow className={classes.tableHead}>
                        <StyledTableCell align="center">Produtos</StyledTableCell>
                        <StyledTableCell align="center">Preço</StyledTableCell>
                        <StyledTableCell align="center">Quantidade</StyledTableCell>
                        <StyledTableCell align="center">Total</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {produtos.map((row, i) => (

                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                <div style={{ display: 'flex', flexDirection: 'row', }}>
                                    <div style={{ width: '100px', height: '150px' }}>
                                        <img src={row.Imageurl} style={{ width: '100%', height: '100%', borderRadius: 5 }} alt="Imagem produto" />
                                    </div>
                                    <div style={{ paddingLeft: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        {row.nome}
                                    </div>

                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <p>R$</p>
                                    <p>{row.preco}</p>
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
                                            var comparator = aux[i];
                                            if (comparator >= 1) {
                                                setQuantity(aux);
                                                const totally = [...total];
                                                var newTotal = totally[i] - row.preco;
                                                totally[i] = newTotal;
                                                setTotal(totally);
                                                actualTotal(totally);
                                            }
                                        }}
                                        quantidade={quantity[i]}
                                    />

                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <p>R$</p>
                                    <div style={{ width: 20 }}>
                                        <p>{total[i]}</p>
                                    </div>
                                </div></StyledTableCell>
                            <StyledTableCell align="right">
                                <Box style={{ cursor: 'pointer', padding: 20 }} >
                                    <HighlightOffIcon style={{ height: 30, width: 30 }} onClick={() => {
                                        removerItem(products[i])
                                    }} />
                                </Box>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}