/* eslint-disable react/prop-types */
import React from 'react';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import { Typography } from '@material-ui/core/';
import Estilos from '../Estilos';

const styles = {
  quantity: {
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Estilos.flexRowStandard2,
    height: 50,
    width: 130,
    backgroundColor: 'white',
    borderRadius: 30,
    color: 'black',
  },
};

const Quantity = ({ onClickPlus, onClickMinus, quantidade = 0 }) => (
  <div style={styles.quantity}>
    <div style={{ ...Estilos.flexRowCenter2, paddingLeft: 10 }}>
      <RemoveOutlinedIcon
        style={{ cursor: 'pointer' }}
        onClick={onClickMinus}
      />
    </div>

    <div>
      <Typography style={{ color: 'black' }}>{quantidade}</Typography>
    </div>

    <div style={{ ...Estilos.flexRowCenter2, paddingRight: 10 }}>
      <AddOutlinedIcon style={{ cursor: 'pointer' }} onClick={onClickPlus} />
    </div>
  </div>
);

export default React.memo(Quantity);
