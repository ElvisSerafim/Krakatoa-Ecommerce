import React, { Component } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import {Typography } from '@material-ui/core/';


export default class Paginator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            actualPage: 10
        };
    }
    render() {

        return (
            <div style={{display: 'flex', flex: '1', flexDirection: 'column',  justifyContent: 'center', alignItems: 'center'}}>
                <Typography>Página</Typography>
                <Pagination count={this.state.actualPage} variant="outlined" shape="rounded" />
           </div >
         );

    }

}