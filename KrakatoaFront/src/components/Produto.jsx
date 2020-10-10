/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@material-ui/core/';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import withAnimation from '../higherComponents/withAnimation';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    '@media (max-width: 640px)': {
      width: 160,
    },
    '@media (max-width: 360px)': {
      width: 140,
    },
    '@media (max-width: 280px)': {
      width: 120,
    },
  },

  nameProduct: {
    display: 'flex',
    minHeight: 50,
    '@media (max-width: 360px)': {
      minHeight: 90,
    },
  },

  media: {
    maxHeight: 290,
    objectFit: 'cover',
    objectPosition: 'center top',
    transition: '.2s ease-out',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: '.2s ease-out',
    },
    '@media (max-width: 500px)': {
      maxHeight: 200,
    },
  },
  skeleton: {
    height: 300,
  },
});

const CardMediaMod = withAnimation(CardMedia);

const Produto = ({ produto, title }) => {
  const loading = useSelector((state) => state.products.loading);
  const { _id, nome, preco } = produto;
  const [Imageurl, setImageurl] = useState('');
  const classes = useStyles();
  useEffect(() => {
    if (produto.imagens.length !== 0) {
      if (produto.categoria !== undefined && title !== 'pesquisa') {
        setImageurl(
          `https://testekrakatoa.tk/imgs/${produto.categoria}/${produto.imagens[0]}.jpg`,
        );
      } else if (title === 'pesquisa') {
        setImageurl(
          `https://testekrakatoa.tk/imgs/${produto.categoria}/${produto.imagens[0]}.jpg`,
        );
      }
    }
  }, [produto, title]);
  const FuncCapitalize = (str) => {
    str = str.split(' ');
    for (let i = 0, x = str.length; i < x; i += 1) {
      if (str[i] !== '') {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
    }
    return str.join(' ');
  };

  return (
    <a href={`/${produto.categoria}/${_id}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.root}>
        <CardActionArea>
          {loading === true ? (
            <Skeleton
              animation="wave"
              variant="rect"
              className={classes.skeleton}
            />
          ) : (
            <CardMediaMod
              className={classes.media}
              image={Imageurl}
              title={nome}
              component="img"
            />
          )}

          <div>
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div className={classes.nameProduct}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  color="primary"
                >
                  {FuncCapitalize(nome)}
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="body2" color="secondary" component="p">
                  R$ {preco}
                </Typography>
              </div>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    </a>
  );
};

export default withAnimation(Produto);
