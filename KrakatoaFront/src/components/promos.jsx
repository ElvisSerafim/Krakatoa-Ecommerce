import React, { PureComponent } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Button,
} from '@material-ui/core/';
import './bgCard.css';
import card1 from '../img/card1.jpg';
import card2 from '../img/card2.jpg';
import card3 from '../img/card3.jpg';

const styles = {
  root: {
    width: 'auto',
    height: '373px',
    boxShadow: 'none',
    borderRadius: 0,
    backgroundColor: '#B1B1B1',
    color: 'white',
    marginTop: '50px',
  },
  container: {
    marginTop: '220px',
  },
};

const data = [
  {
    quarter: 'card1',
    title: 'Coleção de Verão!',
    size: 5,
    img: card1,
  },
  {
    quarter: 'card2',
    title: 'Kangas \n a Partir de \n R$29,99',
    size: 3,
    img: card2,
  },
  {
    quarter: 'card3',
    title: 'Descontos da \n Semana!',
    size: 4,
    img: card3,
  },
];

export default class Promos extends PureComponent {
  render() {
    return (
      <div style={styles.promo}>
        <Grid container spacing={2} direction="row" justify="space-around">
          {data.map((elem) => (
            <Grid
              item
              lg={elem.size}
              md={4}
              sm={4}
              xs={12}
              key={data.indexOf(elem)}
            >
              <Card
                style={styles.root}
                className={elem.quarter}
                backgroundColor={elem.img}
              >
                <CardActionArea>
                  <CardContent style={styles.container}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {elem.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="medium"
                    variant="contained"
                    className="saibaMais"
                  >
                    Saiba Mais
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
