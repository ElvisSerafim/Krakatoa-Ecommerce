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
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import withAnimation from '../higherComponents/withAnimation';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    '@media (max-width: 640px)': {
      width: 270,
    },
    '@media (max-width: 360px)': {
      width: 155,
    },
  },

  nameProduct: {
    display: 'flex', 
    minHeight: 52,
    '@media (max-width: 360px)': {
      minHeight: 90
    }
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
  },
});

const CardMediaMod = withAnimation(CardMedia);

const Produto = ({ produto, title, addItem, update }) => {
  const { id, nome, preco, colecao } = produto;
  const [promoPrice, setpromoPrice] = useState('');
  const [Imageurl, setImageurl] = useState('');
  const [type, setType] = useState(title);
  const classes = useStyles();
  useEffect(() => {
    if (produto.imagens.length !== 0) {
      if (produto.categoria !== undefined && title !== 'pesquisa') {
        setImageurl(
          `http://64.227.106.165/imgs/${produto.categoria}/${produto.imagens[0]}.jpg`,
        );
      } else if (title === 'pesquisa') {
        setImageurl(
          `http://64.227.106.165/imgs/${produto.categoria}/${produto.imagens[0]}.jpg`,
        );
      }
    }
  }, []);
  const FuncCapitalize = (str) => {
    str = str.split(' ');
    for (let i = 0, x = str.length; i < x; i++) {
      if (str[i] != '') {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
    }
    return str.join(' ');
  };
  const product = {
    nome,
    colecao,
    preco,
    promoPrice,
    Imageurl,
  };


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <a href={`/${produto.categoria}/${id}`}>
          <CardMediaMod
            className={classes.media}
            image={Imageurl}
            title={nome}
            component="img"
          />
        </a>
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
              <AddShoppingCartIcon
                color="primary"
                style={{ paddingTop: 5 }}
                onClick={() => {
                  addItem(product);
                }}
              />
            </div>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default withAnimation(Produto);
