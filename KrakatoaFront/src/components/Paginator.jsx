import React, { Component } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Typography } from '@material-ui/core/';
import Estilos from '../Estilos';

const styles = {
  pagination: {
    fontSize: 12,
  },
};
export default class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actualPage: 10,
    };
  }

  render() {
    const { actualPage } = this.state;
    return (
      <div style={{ ...Estilos.flexColumnCENTER, fontFamily: 'Poppins' }}>
        <Typography>Página</Typography>
        <Pagination
          style={styles.pagination}
          count={actualPage}
          variant="outlined"
          shape="rounded"
        />
      </div>
    );
  }
}
