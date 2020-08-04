import React from 'react';
import { Container, Typography } from '@material-ui/core/';
import withAnimation from '../higherComponents/withAnimation';
import withNav from '../higherComponents/withNav';



const Revenda = () => {
    return (
        <>
            <Container maxWidth="lg" style={{ marginBottom: 80, paddingTop: 20 }}>
                <Typography variant="h1" >
                    Revenda
                </Typography>
                <Typography variant="h6" style={{paddingTop: 20}} >
                    Para revenda em atacado, entrar em contato diretamente por meio do telefone: (71) 3375-3856 ou celular: (71) 99123-3356.
                </Typography>


            </Container>
        </>
    );
};

export default withNav(withAnimation(Revenda));
