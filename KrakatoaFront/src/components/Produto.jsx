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
    '@media (max-width: 640px)': {
      width: 270,
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
  },
});

const Produto = ({ produto, title, addItem, update }) => {
  const { id, nome, preco, colecao } = produto;
  const [promoPrice, setpromoPrice] = useState('');
  const [Imageurl, setImageurl] = useState('');
  const [type, setType] = useState(title);
  const classes = useStyles();
  useEffect(() => {
    console.log(produto);
    if (produto.imagens.length !== 0) {
      if(produto.categoria == 'mandalas'){
        setImageurl(
          `http://localhost:4000/static/imgs/${produto.imagens[0]}.jpg`,
        );
      }else {
        setImageurl(
          `http://64.227.106.165/api/static/imgs/${produto.imagens[0]}.jpeg`,
        );
      }
    } else {
      setImageurl(`http://64.227.106.165/api/static/imgs/${id}.jpeg`);
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
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
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
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  R$ {preco}
                </Typography>
                <AddShoppingCartIcon
                  color="primary"
                  style={{paddingTop: 5}}
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

export default Produto;
