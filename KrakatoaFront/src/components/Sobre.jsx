import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActionArea,
} from '@material-ui/core/';
import '../pages/Sobre.css';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: 'auto',
    height: '300px',
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
    quarter: 'card',
    title: 'Frente da Loja',
  },
  {
    quarter: 'card2',
    title: 'Parte interna',
  },
  {
    quarter: 'card3',
    title: 'Display de Produtos',
  },
  {
    quarter: 'card4',
    title: 'Venha conhecer!',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: '50%',
    objectFit: 'cover',
    maxHeight: 345,
  },
  img: {
    width: '100%',
    maxHeight: 222,
  },
  txt: {
    padding: 5,
    color: theme.palette.background.color,
  },
  GridContainer: {
    '@media (min-width: 1024px)': {
      justifyContent: 'flex-start',
    },
  },
}));

const url = 'http://64.227.106.165/imgs/sobre';

const Sobre = () => {
  const classes = useStyles();
  return (
    <div style={styles.sobre}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-around"
        className={classes.GridContainer}
      >
        {data.map((elem) => (
          <Grid item lg={3} md={6} sm={6} xm={12} key={data.indexOf(elem)}>
            <Card
              className={classes.root}
              backgroundColor={`url(${url}/${elem.quarter})`}
            >
              <CardActionArea>
                <CardMedia className={classes.media}>
                  <img
                    src={`${url}/${elem.quarter}.jpg`}
                    alt="Fotos da loja"
                    className={classes.img}
                  />
                </CardMedia>
                <CardContent>
                  <div>
                    <Typography
                      variant="h5"
                      component="h2"
                      className={classes.txt}
                    >
                      {elem.title}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default Sobre;
