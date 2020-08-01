import React, { PureComponent } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  CardMedia,
  Button,
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
    quarter: 'card',
    title: 'Coleção de Verão!',
    size: 6,
  },
  {
    quarter: 'card2',
    title: 'Kangas \n a Partir de \n R$29,99',
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
    backgroundImage: 'http://64.227.106.165/imgs/sobre/card.jpg'
  },
  txt: {
    padding: 5,
    color: theme.palette.background.color,
  },
}));

const Promos = () => {
  const url = 'http://64.227.106.165/imgs/sobre';
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2} direction="row" justify="space-between">

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
              classes={classes.card}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image="http://64.227.106.165/imgs/sobre/card.jpg"
                />
              </CardActionArea>
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
            </Card>
          </Grid>
        ))}
          </Grid>
    </div >
  );
}

export default Promos;
