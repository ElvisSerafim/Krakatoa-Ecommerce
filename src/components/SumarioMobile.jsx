import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Avatar,
  ListItem,
  ListItemAvatar,
  List,
  Divider,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  text: {
    fontWeight: '700',
  },
};


const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  root: {
    width: '100%',
    minWidth: 320,
    backgroundColor: '#D2C9C7',
  },
}));


const SumarioMobile = ({ actualTotal }) => {
  const allProducts = useSelector((state) => state.productsCart);

  const classes = useStyles();
  useEffect(() => {
    const totais = [];
    allProducts.forEach((item) => {
      totais.push(item.preco * item.quantidadePedido);
    });
    actualTotal(totais);
  }, [allProducts]);
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <List className={classes.root}>
        {allProducts.map((row, i, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={row.ImageUrl} className={classes.large} />
            </ListItemAvatar>

            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography style={styles.text}>
                  {row.nome}
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Typography style={styles.text}>
                    Tam: {row.tamanhoEscolhido}
                  </Typography>
                  <Typography style={styles.text}>
                    Qnt: {row.quantidadePedido}
                  </Typography>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Typography style={styles.text}>
                  R$ {row.preco}
                </Typography>
              </div>
            </div>
            <Divider variant="inset" />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SumarioMobile;
