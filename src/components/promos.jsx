import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
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
    quarter: 'card5',
    title: 'Corra para Krakatoa',
    size: 6,
  },
  {
    quarter: 'card6',
    title: 'E venha conhecer nossos Produtos!',
    size: 5,
  },
];
const useStyles = makeStyles((theme) => ({
  media: {
    height: '80%',
    objectFit: 'cover',
    maxHeight: 345,
  },
  img: {
    width: '100%',
    maxHeight: 300,
  },
  card: {
    height: 373,
    '@media (max-width: 400px)': {
      height: 300,
    },
  },
  txt: {
    padding: 5,
    color: theme.palette.background.color,
  },
}));

const Promos = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2} direction="row" justify="space-between">
        {data.map((elem) => (
          <Grid
            item
            lg={elem.size}
            md={6}
            sm={12}
            xs={12}
            key={data.indexOf(elem)}
          >
            <Card style={styles.root} className={classes.card}>
              <CardActionArea>
                <CardMedia
                  style={{ maxHeight: 300, objectPosition: 'top' }}
                  component="img"
                  image={`https://testekrakatoa.tk/imgs/sobre/${elem.quarter}.jpg`}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.txt}
                  >
                    {elem.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Promos;
