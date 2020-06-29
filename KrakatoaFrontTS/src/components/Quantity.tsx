/* eslint-disable react/prop-types */
import React from 'react';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import { Typography, Box, IconButton } from '@material-ui/core/';
import Estilos from '../Estilos';
import { Link } from 'react-router-dom';

const styles = {
  quantity: {
    height: 50,
    width: 130,
    backgroundColor: 'white',
    borderRadius: 30,
    color: 'black',
  },
};

type PropsComponent = {
  onClickPlus: any;
  onClickMinus: any;
  quantidade: number;
};

const Quantity: React.FunctionComponent<PropsComponent> = ({
  onClickPlus,
  onClickMinus,
  quantidade = 0,
}) => (
  <Box
    justifyContent="space-between"
    alignItems="center"
    style={styles.quantity}
  >
    <Box
      justifyContent="center"
      alignItems="center"
      style={{ paddingLeft: 10 }}
    >
      <IconButton onClick={onClickMinus}>
        <RemoveOutlinedIcon style={{ cursor: 'pointer' }} />
      </IconButton>
    </Box>

    <div>
      <Typography style={{ color: 'black' }}>{quantidade}</Typography>
    </div>

    <Box
      justifyContent="center"
      alignItems="center"
      style={{ paddingRight: 10 }}
    >
      <IconButton onClick={onClickPlus}>
        <AddOutlinedIcon style={{ cursor: 'pointer' }} />
      </IconButton>
    </Box>
  </Box>
);

export default Quantity;
