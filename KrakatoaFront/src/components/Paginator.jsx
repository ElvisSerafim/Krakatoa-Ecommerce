import React, { Component } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Typography } from '@material-ui/core/';


const styles = {
  pagination: {
    fontSize: 12
  }
}
export default class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actualPage: 10,
    };
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Poppins', 
        }}
      >
        <Typography>Página</Typography>
        <Pagination
          style={styles.pagination}
          count={this.state.actualPage}
          variant="outlined"
          shape="rounded"
        />
      </div>
    );
  }
}
