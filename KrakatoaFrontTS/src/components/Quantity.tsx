/* eslint-disable react/prop-types */
import React from 'react';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import { Typography, Box } from '@material-ui/core/';
import Estilos from '../Estilos';

const styles = {
  quantity: {
    height: 50,
    width: 130,
    backgroundColor: 'white',
    borderRadius: 30,
    color: 'black',
  },
};

const Quantity = ({ onClickPlus, onClickMinus, quantidade = 0 }) => (
  <Box justifyContent="space-between" alignItems="center" style={styles.quantity}>
    <Box justifyContent="center" alignItems="center" style={{ paddingLeft: 10 }}>
      <RemoveOutlinedIcon
        style={{ cursor: 'pointer' }}
        onClick={onClickMinus}
      />
    </Box>

    <div>
      <Typography style={{ color: 'black' }}>{quantidade}</Typography>
    </div>

    <Box justifyContent="center" alignItems="center" style={{ paddingRight: 10 }}>
      <AddOutlinedIcon style={{ cursor: 'pointer' }} onClick={onClickPlus} />
    </Box>
  </Box>
);

export default Quantity;
