import React, { Component, useState } from 'react';
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

const Quantity = ({ onClickPlus, onClickMinus, quantidade = 0 }) => {
  return (
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
        /* onClick={(event) => 
          console.log(event.key);
          setQuantidade(quantidade - 1);
        }}
*/
        onClick={onClickMinus}
        />
      </div>

      <div>
        <Typography style={{ color: 'black' }}>
          {quantidade}
        </Typography>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: 10,
        }}
      >
        <AddOutlinedIcon
          style={{ cursor: 'pointer' }}
          /* onClick={(event) => {
            setQuantidade(quantidade + 1);
          }} */
          onClick={onClickPlus}

        />
      </div>
    </div>
  );
}

export default Quantity;
/*
export default class Quantity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantidade: 0,
    };
  }

  render() {
    return (
      <div style={styles.quantity} key={this.props.reactKey}>
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
            onClick={(event) => {
              console.log(event.key);
              this.setState({ quantidade: this.state.quantidade - 1 });
            }}
          />
        </div>

        <div>
          <Typography style={{ color: 'black' }}>
            {this.state.quantidade}
          </Typography>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 10,
          }}
        >
          <AddOutlinedIcon
            style={{ cursor: 'pointer' }}
            onClick={(event) => {
              this.setState({ quantidade: this.state.quantidade + 1 });
            }}
          />
        </div>
      </div>
    );
  }
}
 */