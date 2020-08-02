import React, { useState } from 'react';
import { Grid, Button, TextField, Typography, Paper } from '@material-ui/core/';
import logo from '../img/logo192.png';
import { makeStyles } from '@material-ui/core/styles';
import withNav from '../higherComponents/withNav';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({

    Paper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: theme.palette.secondary.main,
        padding: 16,
        '@media (max-width: 1280px)': {
            marginTop: 64,
        },
    },
}));


const RecuperarSenha = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <>
            <Grid container justify="center" alignItems="center" direction="column" lg={12} sm={12} md={12}>
                <div style={{ paddingTop: 50 }}>
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <img

                            src={logo}
                            alt="Logo Krakatoa"
                            margintop="50px"
                            style={{ height: 80, width: 80 }}
                        />
                    </a>
                </div>
                <div style={{ paddingTop: 30 }}>
                    <Typography variant="h4">
                        Redefina sua senha
                    </Typography>
                </div>
                <Grid
                    style={{ paddingTop: 30 }}
                    item
                    lg={5}
                    md={12}
                    sm={12}
                    xs={12}

                >
                    <Paper className={classes.Paper}>
                        <Grid item lg={12} md={12} sm={12} xm={12}>
                            <Typography variant="h6" style={{ color: "white" }}>
                                Digite o endereço de e-mail verificado da sua conta de usuário e enviaremos um token de redefinição de senha.                            </Typography>
                        </Grid>
                        <Grid item style={{ paddingTop: 30 }} lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                variant="filled"
                                color="secondary"
                                style={{ backgroundColor: 'white' }}
                                label="Email"
                                fullWidth
                                placeholder="Insira seu Email"
                            />
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            container
                            justify="flex-end"
                            style={{ paddingTop: 30 }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={()=> {
                                    history.push("/redefinirSenha");
                                }}
                                fullWidth
                                style={{ borderRadius: 7, height: 50 }}
                            >
                                Enviar email de redefinição de senha
                    </Button>
                        </Grid>
                    </Paper>

                </Grid>
            </Grid>
            <Footer />
        </>
    );
};
export default RecuperarSenha;
