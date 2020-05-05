/* Produto em Si */

import React, { PureComponent } from 'react';
import ComboBox from '../components/ComboBox';
import { Container, Grid, Typography } from '@material-ui/core/';
import Navbar from '../components/Nav';
import Topo from '../components/Topo';
import theme from '../themes';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { green } from '@material-ui/core/colors';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Radio from '@material-ui/core/Radio';
const styles = {
  foto: {
    backgroundColor: '#C3C3C3',
    borderRadius: 5,
    height: 122,
    marginTop: 10,
    maxWidth: 116,
  },
  quadradao1: {
    backgroundColor: '#C3C3C3',
    borderRadius: 10,
    height: 700,
    marginTop: 40,
  },
  quadradao2: {
    backgroundColor: '#D0D0D0',
    borderRadius: 10,
    height: 700,
    marginTop: 40,
  },
  marginDiv: {
    marginTop: 40,
  },
  promo: {
    backgroundColor: 'red',
    borderRadius: '10px 0px 20px 0px',
    height: 33,
    width: '150px',
  },
  promoText: {
    color: 'white',
    paddingLeft: 25,
    paddingTop: 4,
  },
  flexRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: '50',
  },
  product: { marginLeft: 310, marginTop: 30, color: '#F0F0F0' },
  num: { paddingLeft: 350, color: '#F0F0F0' },
  lore: { paddingTop: 30, paddingLeft: 90, color: 'white', fontSize: '2.25em' },
  price: {
    paddingLeft: 90,
    paddingTop: 30,
    fontWeight: '500',
  },
};
export default class Produto extends PureComponent {
  render() {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <Topo />
            <Navbar />
            <Grid container spacing={2} diretion="row" justify="flex-start">
              <Grid item Lg={1} md={1}>
                <div style={styles.marginDiv}>
                  <div style={styles.foto}>
                    <Typography color="primary"></Typography>
                  </div>
                  <div style={styles.foto}>
                    <Typography style={{}} color="primary"></Typography>
                  </div>
                  <div style={styles.foto}>
                    <Typography style={{}} color="primary"></Typography>
                  </div>
                </div>
              </Grid>
              <Grid item lg={4} md={4}>
                <div style={styles.quadradao1}></div>
              </Grid>
              <Grid item lg={1} md={1} />
              <Grid item lg={6} md={6}>
                <div style={styles.quadradao2}>
                  <div style={styles.flexRow}>
                    <div style={styles.promo}>
                      <Typography style={styles.promoText} variant="body1">
                        Promoção
                      </Typography>
                    </div>
                    <div>
                      <Typography style={styles.product}>
                        Product ID:
                      </Typography>
                      <Typography style={styles.num}>261311</Typography>
                    </div>
                  </div>
                  <Typography style={styles.lore}>LOREM IPSUM</Typography>
                  <Typography
                    style={styles.price}
                    variant="h5"
                    color="primary"
                    id="price"
                  >
                    R$ 89,90
                  </Typography>
                  <div style={{ paddingTop: 80, paddingLeft: 400 }}>
                    <div style={styles.flexRow}>
                      <LocalShippingOutlinedIcon
                        style={{ paddingTop: 10, paddingRight: 20 }}
                        color="secondary"
                      />
                      <div>
                        <a href="#" style={{ textDecoration: 'none' }}>
                          <Typography variant="body1" color="secondary">
                            Entrega Normal
                          </Typography>
                        </a>
                        <Typography
                          variant="body1"
                          style={{ color: '#F0F0F0' }}
                        >
                          Prazo de N dias
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <Typography
                    style={{ paddingLeft: 100 }}
                    variant="h6"
                    color="secondary"
                  >
                    {' '}
                    Cores:
                  </Typography>
                  <div style={styles.flexRow}>
                    <FormControlLabel
                      style={{ paddingLeft: 100 }}
                      value="pink"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      style={{ paddingLeft: 20 }}
                      value="red"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      style={{ paddingLeft: 20 }}
                      value="yellow"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      style={{ paddingLeft: 20 }}
                      value="black"
                      control={<Radio />}
                    />
                  </div>
                  <div style={{ paddingTop: 54, paddingLeft: 400 }}>
                    <div style={styles.flexRow}>
                      <LocalShippingIcon
                        style={{ paddingTop: 10, paddingRight: 20 }}
                        color="secondary"
                      />
                      <div>
                        <a href="#" style={{ textDecoration: 'none' }}>
                          <Typography variant="body1" color="secondary">
                            Entrega Rápida
                          </Typography>
                        </a>
                        <Typography
                          variant="body1"
                          style={{ color: '#F0F0F0' }}
                        >
                          Prazo de N dias
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div style={{ paddingLeft: '70px', paddingTop: 30 }}>
                    <ComboBox color="Secondary" />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </MuiThemeProvider>
      </>
    );
  }
}
