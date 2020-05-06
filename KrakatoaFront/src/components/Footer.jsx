import React, { PureComponent } from 'react';
import { Typography, Container, Box, Grid } from '@material-ui/core/';
import logo from '../img/logoVermelha.jpg';
import fbBranco from '../img/fbBranco.png';
import instaBranco from '../img/instaBranco.png';

const styles = {
  fundo: {
    backgroundColor: 'black',
    width: '100%',
    marginTop: '64px',
  },
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
class Topo extends PureComponent {
  render() {
    return (
      <div style={styles.fundo}>
        <Container maxWidth="lg">
          <Box>
            <Grid container spacing={2} direction="row" justify="flex-start">
              <Grid item Lg={4} md={4}>
                <div style={styles.nomeElogo}>
                  <img
                    src={logo}
                    style={styles.logostyle}
                    alt="Logo Krakatoa"
                  />
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
              </Grid>
              <Grid item Lg={4} md={4}>
                <div style={{ marginTop: 40, marginLeft: 20 }}>
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
                    <a
                      href="/tipo/pagamento"
                      style={{ textDecoration: 'none' }}
                    >
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
              <Grid item Lg={4} md={4}>
                <div style={{ marginTop: 40 }}>
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
                      Designer{' '}
                    </Typography>
                    <Typography style={styles.lore}>
                      Gustavo, Gabriel e Elvis
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Container>
          <hr style={styles.hrstyle} />
        </Container>
        <div style={{ backgroundColor: 'black', color: 'black' }}>a</div>
      </div>
    );
  }
}
export default Topo;
