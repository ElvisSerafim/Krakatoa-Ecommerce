import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import withNav from '../higherComponents/withNav';

const Loading = () => (
  <div style={{ width: '100%' }}>
    <LinearProgress color="secondary" />
  </div>
);

export default withNav(Loading);
