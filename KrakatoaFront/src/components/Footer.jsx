import React from 'react';
import { Typography, Container, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import logo from '../img/logoVermelha.jpg';
import fbBranco from '../img/fbBranco.png';
import instaBranco from '../img/instaBranco.png';

const styles = {
  shoppingEcontato: {
    color: 'white',
    fontSize: '1.625em',
    fontWeight: 'bold',
    marginBottom: '27px',
  },
  nomeElogo: {
    display: 'flex',
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
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
    height: '16px',
    marginBottom: 15,
  },
  hrstyle: {
    marginTop: 50,
    color: '#E8E8E8',
    backgroundColor: '#E8E8E8',
    height: 0.5,
    borderColor: '#E8E8E8',
  },
};

const useStyles = makeStyles((theme) => ({
  GridContainer: {
    '@media (min-width: 960px)': {
      justifyContent: 'flex-start',
      padding: theme.spacing(2),
      alignItems: 'center',
    },
  },
  Fundo: {
    backgroundColor: theme.palette.background.color,
  },
}));

const Topo = (theme) => {
  const classes = useStyles(theme);
  return (
    <div className={classes.Fundo}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-around"
          className={classes.GridContainer}
          width="100%"
        >
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <div style={styles.nomeElogo}>
              <img src={logo} style={styles.logostyle} alt="Logo Krakatoa" />
              <Typography variant="h4" color="secondary">
                KRAKATOA
              </Typography>
            </div>
            <div style={styles.loreKrak}>
              <Typography variant="body1" color="secondary">
                Krakatoa, sua marca feita pra aquele dia de praia
              </Typography>
              <Typography variant="body1" color="secondary">
                no sol forte de Salvador! Seja com nossas Kangas
              </Typography>
              <Typography variant="body1" color="secondary">
                ou com nossa linha de roupa de Praia
              </Typography>
              <a href="https://www.facebook.com/profile.php?id=100013226432242">
                <img src={fbBranco} style={styles.social} alt="Logo facebook" />
              </a>
              <a href="https://www.instagram.com/krakatoacangas/?hl=pt-br">
                <img
                  src={instaBranco}
                  style={styles.social}
                  alt="Logo Instagram"
                />
              </a>
            </div>
          </Grid>
          <Hidden smDown="true">
            <Grid item lg={4} md={4} sm={12}>
              <div>
                <Typography variant="h4" color="secondary">
                  Shopping Online
                </Typography>
                <div style={styles.marginPar}>
                  <a
                    href="/minhaconta/pedidos"
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography style={styles.lore} variant="body1">
                      Pedidos
                    </Typography>
                  </a>
                  <a
                    href="/tipo/entrega"
                    style={{ textDecoration: 'none' }}
                    variant="body1"
                  >
                    <Typography style={styles.lore}>Entregas</Typography>
                  </a>
                  <a
                    href="/politicas"
                    style={{ textDecoration: 'none' }}
                    variant="body1"
                  >
                    <Typography style={styles.lore}>
                      Políticas da Loja
                    </Typography>
                  </a>
                  <a href="/tipo/pagamento" style={{ textDecoration: 'none' }}>
                    <Typography style={styles.lore} variant="body1">
                      Opções de pagamento
                    </Typography>
                  </a>
                  <a href="/contato" style={{ textDecoration: 'none' }}>
                    <Typography style={styles.lore} variant="body1">
                      Contatos
                    </Typography>
                  </a>
                </div>
              </div>
            </Grid>
          </Hidden>
          <Grid item lg={4} md={4} sm={6} xs={12} style={{ width: '100%' }}>
            <div>
              <Typography variant="h4" color="secondary">
                Contato
              </Typography>
              <div>
                <Typography style={styles.lore} variant="body1">
                  Email: contato@krakotoacangas.com.br
                </Typography>
                <Typography style={styles.lore} variant="body1">
                  Telefone: (71) 3375-3856
                </Typography>
              </div>
              <div style={styles.marginDiv}>
                <Typography variant="h4" color="secondary">
                  Designer
                </Typography>
                <Typography style={styles.lore}>
                  Gustavo, Gabriel e Elvis
                </Typography>
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
export default Topo;
