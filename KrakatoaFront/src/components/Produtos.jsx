import React, { Component } from 'react';
import Product from './Produto';
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
        flexGrow: 1
    }
}
export default class Produtos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [['1', '2', '3', '4', '5'], ['2', '2', '3', '4', '5'], ['2', '2', '3', '4', '5'], ['2', '2', '3', '4', '5'], ['2', '2', '3', '4', '5']]
        };
    }
    render() {
        return (
            
            this.state.product.map((item) => (
                <Grid container justify='center' spacing='2'>
                    {item.map((value) => (
                        <Grid key={value} item>
                            <Product />
                        </Grid>
                    ))}
                </Grid>
            ))
        
        );
    }
}
