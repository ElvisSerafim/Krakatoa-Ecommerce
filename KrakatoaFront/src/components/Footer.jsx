import React from 'react';
import { Typography, Container, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../img/logoBranca.png';
import fbBranco from '../img/fbBranco.png';
import instaBranco from '../img/instaBranco.png';
import visa from '../img/visa.png';
import elo from '../img/elo.png';
import mastercard from '../img/mastercard.png';
import boleto from '../img/boleto.png';

const styles = {
  shoppingEcontato: {
    color: 'white',
    fontSize: '1.625em',
    fontWeight: 'bold',
    marginBottom: '27px',
  },
  lore: {
    color: '#E8E8E8',
    fontSize: '1.0em',
  },
  loreKrak: {
    marginTop: 12,
  },
  marginDiv: {
    marginTop: 40,
  },
  marginPar: {
    marginTop: 40,
  },
  loreDesigner: {
    color: 'white',
    fontSize: '1.625em',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: '27px',
  },
  loreContato: {
    color: 'white',
    fontSize: '1.625em',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: '27px',
  },
  logostyle: {
    marginTop: 10,
    marginRight: 10,
    borderRadius: 12,
    width: '50px',
  },
  social: {
    marginTop: 10,
    marginRight: 10,
    height: 25,
    marginBottom: 15,
  },
  hrstyle: {
    marginTop: 50,
    color: '#E8E8E8',
    backgroundColor: '#E8E8E8',
    height: 0.5,
    borderColor: '#E8E8E8',
  },
  nomeElogo: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
};

const useStyles = makeStyles((theme) => ({
  GridContainer: {
    '@media (min-width: 960px)': {
      justifyContent: 'center',
      padding: theme.spacing(2),
      alignItems: 'center',
    },
  },
  Fundo: {
    backgroundColor: theme.palette.background.color,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.Fundo}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-between"
          className={classes.GridContainer}
          width="100%"
          style={{ marginTop: 60 }}
        >
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <div style={styles.nomeElogo}>
              <img src={logo} style={styles.logostyle} alt="Logo Krakatoa" />
              <Typography
                style={{ margin: 0, width: '100%', height: '100%' }}
                variant="h4"
                color="textSecondary"
              >
                KRAKATOA
              </Typography>
            </div>
            <div style={styles.loreKrak}>
              <div>
                <Typography color="textSecondary" variant="body1">
                  Rua do Palame, nº 43 – Itapõa
                </Typography>
                <Typography color="textSecondary" variant="body1">
                  CEP.: 41610-200 – Salvador/BA
                </Typography>
                <Typography color="textSecondary" variant="body1">
                  Email: contato@krakotoacangas.com.br
                </Typography>
                <Typography color="textSecondary" variant="body1">
                  Telefone: (71) 3375-3856
                </Typography>
              </div>
            </div>
          </Grid>

          <Grid item lg={6} md={6} sm={12}>
            <div>
              <div>
                <a href="/sobre" style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" color="textSecondary">
                    Quem Somos
                  </Typography>
                </a>
                <a href="/prazoEntrega" style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" color="textSecondary">
                    Prazo de Entrega
                  </Typography>
                </a>
                <a href="/politicasdaloja" style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" color="textSecondary">
                    Nossas Políticas
                  </Typography>
                </a>
                <a href="/revenda" style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" color="textSecondary">
                    Revenda
                  </Typography>
                </a>
                <a href="/contato" style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" color="textSecondary">
                    Fale Conosco
                  </Typography>
                </a>
              </div>
            </div>
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12} style={{ width: '100%' }}>
            <div>
              <div style={styles.marginDiv}>
                <Typography variant="h6" color="textSecondary">
                  Nossas Redes Sociais
                </Typography>
                <a href="https://www.facebook.com/profile.php?id=100013226432242">
                  <img
                    src={fbBranco}
                    style={styles.social}
                    alt="Logo facebook"
                  />
                </a>
                <a href="https://www.instagram.com/krakatoacangas/?hl=pt-br">
                  <img
                    src={instaBranco}
                    style={styles.social}
                    alt="Logo Instagram"
                  />
                </a>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12} style={{ width: '100%' }}>
            <div>
              <div style={styles.marginDiv}>
                <Typography variant="h6" color="textSecondary">
                  Meios de Pagamento
                </Typography>
                <a href="https://www.facebook.com/profile.php?id=100013226432242">
                  <img src={visa} style={styles.social} alt="Cartão Visa" />
                </a>
                <a href="https://www.instagram.com/krakatoacangas/?hl=pt-br">
                  <img
                    src={mastercard}
                    style={styles.social}
                    alt="Cartão Mastercard"
                  />
                </a>
                <a href="https://www.instagram.com/krakatoacangas/?hl=pt-br">
                  <img src={elo} style={styles.social} alt="Cartão Elo" />
                </a>
                <a href="https://www.instagram.com/krakatoacangas/?hl=pt-br">
                  <img src={boleto} style={styles.social} alt="Boleto" />
                </a>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <hr style={styles.hrstyle} />
      </Container>
      <div style={{ backgroundColor: '#FF6961', color: '#FF6961' }}>a</div>
    </div>
  );
};
export default React.memo(Footer);
