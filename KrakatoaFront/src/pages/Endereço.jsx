import React, { PureComponent } from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import Footer from '../components/Footer';
import TextField from '../components/TextField'
const styles = {
    title: {
        fontSize: "2.5em",
        textAlign: "center",
        color: "#FF5757",
        fontWeight: '700'
    },
}
export default class Endereco extends PureComponent {

    render() {
        const { children, style, classes, onClick } = this.props

        return (
            <>
                <Container maxWidth="lg">
                    <Topo />
                    <Navbar />
                    <div style={{ display: 'flex', flex: '1', flexDirection: 'row', marginTop: "64px", justifyContent: 'space-between' }}>
                        <Typography style={styles.title}>Endereço</Typography>
                        <div>
                            <p>Elvis</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px'}}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div style={{ width: '40%' }}>
                                    <TextField label='Nome' />
                                </div>
                                <div style={{ width: '40%' }}>
                                    <TextField label='Sobrenome' />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '20px' }}>

                                <div style={{ width: '40%' }}>
                                    <TextField label='CEP' numberOnly/>
                                </div>
                                <div style={{ width: '40%' }}>
                                    <TextField label='Cidade' />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',  paddingTop: '20px' }}>
                                <div style={{ width: '40%' }}>
                                    <TextField label='Endereço' />
                                </div>
                                <div style={{ width: '40%' }}>
                                    <TextField label='Celular' numberOnly />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',  paddingTop: '20px'}}>
                                <div style={{ width: '40%' }}>
                                    <TextField label='Email' email />
                                </div>
                               
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                        </div>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }
}
