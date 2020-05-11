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


export default function CustomizedTables() {
    const classes = useStyles();
    const [pedidos,setPedidos]=useState([1,2,3,4])
    return (
        <TableContainer className={classes.table}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow className={classes.tableHead}>
                        <StyledTableCell align="center">Produtos</StyledTableCell>
                        <StyledTableCell align="center">Preço</StyledTableCell>
                        <StyledTableCell align="center">Quantidade</StyledTableCell>
                        <StyledTableCell align="center">Data</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {pedidos.map((row, i) => (

                        <StyledTableRow key={row}>
                            <StyledTableCell component="th" scope="row">
                                <div style={{ display: 'flex', flexDirection: 'row', }}>
                                    {<p>Bata</p>}                                  
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <p>R$</p>
                                    <p>64,00</p>
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <p>2</p>
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <p>12/04/2020</p>
                                </div>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}