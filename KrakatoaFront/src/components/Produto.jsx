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

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
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

const Produto = ({ produto, title, addItem, update }) => {
  const { id, nome, preco, colecao } = produto;
  const [promoPrice, setpromoPrice] = useState('');
  const [Imageurl, setImageurl] = useState('');
  const [type, setType] = useState(title);
  const classes = useStyles();
  useEffect(() => {
    if(produto.imagens.length != 0){
      console.log(produto.imagens[0]);
      setImageurl(`http://localhost:4000/static/imgs/${produto.imagens[0]}.jpeg`);
    }else {
      setImageurl(`http://localhost:4000/static/imgs/${id}.jpeg`);
    }
   
  }, []);
  const FuncCapitalize = (str) => {
    str = str.split(' ');
    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
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
        <a href={`/${title}/${id}`}>
          <CardMedia
            className={classes.media}
            image={Imageurl}
            title={nome}
            component="img"
          />
        </a>
        <div>
          <CardContent
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="primary"
              >
                {FuncCapitalize(nome)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                R$ {preco}
                {colecao}
              </Typography>
            </div>
            <AddShoppingCartIcon
              color="primary"
              onClick={() => {
                addItem(product);
              }}
            />
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default Produto;
