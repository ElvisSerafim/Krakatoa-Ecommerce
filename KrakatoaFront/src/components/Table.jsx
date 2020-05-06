import React, {useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import imagem from '../img/vestido.jpg';
import remover from '../img/remove.svg';
import Quantity from '../components/Quantity'

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 1124, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 1237, 4.3),
];

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

function aumentarQuantidade(key){
    console.log(key)
}

export default function CustomizedTables() {
    const classes = useStyles();
    const [quantity, setQuantity] = useState(0);

   
    
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
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                <div style={{ display: 'flex', flexDirection: 'row', }}>
                                    <div style={{ width: '100px', height: '150px' }}>
                                        <img src={imagem} style={{ width: '100%', height: '100%' }} alt="Imagem produto" />
                                    </div>
                                    <div style={{ paddingLeft: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        {row.name}
                                    </div>

                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <p>R$</p>
                                    <p>{row.calories}</p>
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Quantity 
                                     reactKey={row.name}

                                    />

                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="center"><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <p>R$</p>
                                <p>{row.carbs}</p>
                            </div></StyledTableCell>
                            <StyledTableCell align="right">
                                <div style={{ width: '40px', height: '40px' }}>
                                    <img src={remover} style={{ width: '100%', height: '100%', cursor: 'pointer' }} alt="Imagem produto" />
                                </div></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}