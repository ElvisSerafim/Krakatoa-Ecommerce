import React from 'react';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import { Typography } from '@material-ui/core/';

const styles = {
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: 130,
    backgroundColor: 'white',
    borderRadius: 30,
    color: 'black',
  },
};

const Quantity = ({ onClickPlus, onClickMinus, quantidade = 0 }) => (
  <div style={styles.quantity}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
      }}
    >
      <RemoveOutlinedIcon
        style={{ cursor: 'pointer' }}
        onClick={onClickMinus}
      />
    </div>

    <div>
      <Typography style={{ color: 'black' }}>{quantidade}</Typography>
    </div>

    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
      }}
    >
      <AddOutlinedIcon style={{ cursor: 'pointer' }} onClick={onClickPlus} />
    </div>
  </div>
);

export default Quantity;
