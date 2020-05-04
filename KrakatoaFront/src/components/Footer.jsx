import React, { PureComponent } from 'react';
import { Typography, Container, Box } from '@material-ui/core/';
import logo from '../img/logoVermelha.jpg';
import fbBranco from '../img/fbBranco.png';
import instaBranco from '../img/instaBranco.png';

const styles = {
  fundo: {
    backgroundColor: 'gray',
    width: '100%',
    marginTop: '64px',
  },
  krakatoa: {
    color: 'white',
    fontSize: '2.0em',
  },
  titlesFlex: {
    display: 'flex',
    paddingTop: 64,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  lore: {
    color: '#E8E8E8',
    fontSize: '1.0em',
  },
  loreKrak: {
    color: '#E8E8E8',
    fontSize: '1.0em',
    marginTop: 12,
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
  fb: {
    marginTop: 10,
    marginRight: 10,
    width: '10px',
    marginBottom: 15,
  },
  insta: {
    marginTop: 10,
    marginBottom: 15,
    width: '15px',
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
            <div style={styles.titlesFlex}>
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" alignItems="center">
                  <img src={logo} style={styles.logostyle}></img>
                  <Typography style={styles.krakatoa}>KRAKATOA</Typography>
                </Box>
                <div style={styles.loreKrak}>
                  <Typography>
                    Krakatoa, sua marca feita pra aquele dia de praia
                  </Typography>
                  <Typography>
                    no sol forte de Salvador! Seja com nossas Kangas
                  </Typography>
                  <Typography>ou com nossa linha de roupa de Praia</Typography>
                  <a href="#">
                    <img src={fbBranco} style={styles.fb}></img>
                  </a>
                  <a href="#">
                    <img src={instaBranco} style={styles.insta}></img>
                  </a>
                </div>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography style={styles.shoppingEcontato}>
                  Shopping Online
                </Typography>
                <div>
                  <a href="#" style={{ textDecoration: 'none' }}>
                    <Typography style={styles.lore}>Pedidos</Typography>
                  </a>
                  <a href="#" style={{ textDecoration: 'none' }}>
                    <Typography style={styles.lore}>Entregas</Typography>
                  </a>
                  <a href="#" style={{ textDecoration: 'none' }}>
                    <Typography style={styles.lore}>
                      Política de retorno
                    </Typography>
                  </a>
                  <a href="#" style={{ textDecoration: 'none' }}>
                    <Typography style={styles.lore}>
                      Opções de pagamento
                    </Typography>
                  </a>
                  <a href="#" style={{ textDecoration: 'none' }}>
                    <Typography style={styles.lore}>Contatos</Typography>
                  </a>
                </div>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography style={styles.loreContato}>Contato</Typography>
                <div>
                  <Typography style={styles.lore}>
                    Email: contato@krakotoacangas.com.br
                  </Typography>
                  <Typography style={styles.lore}>
                    Telefone: (71) 3375-3856
                  </Typography>
                </div>
                <Typography style={styles.loreDesigner}>Designer </Typography>
                <Typography style={styles.lore}>
                  Gustavo, Gabriel e Elvis
                </Typography>
              </Box>
            </div>
          </Box>
        </Container>
        <Container>
          <hr style={styles.hrstyle} />
        </Container>
        <div style={{ backgroundColor: 'gray', color: 'gray' }}>a</div>
      </div>
    );
  }
}
export default Topo;
