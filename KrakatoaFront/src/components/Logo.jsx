import React from 'react';
import { Typography, Box } from '@material-ui/core/';
import logo from '../img/logo192.png';

const Logo = () => (
  <Box
    display="flex"
    flexDirection="row"
    alignItems="center"
    flexWrap="nowrap"
    justifyContent="flex-start"
  >
    <div style={{ borderRadius: 20 }}>
      <img
        src={logo}
        alt="Logo Krakatoa"
        margintop="50px"
        style={{
          borderRadius: 5,
          height: '8vw',
          maxHeight: '60px',
          width: 'auto',
        }}
      />
    </div>
    <Typography
      variant="h3"
      style={{
        fontStyle: 'normal',
        fontSize: 'max(3vw, 40px)',
        marginTop: 0,
        marginLeft: 10,
      }}
      color="primary"
    >
      KRAKATOA
    </Typography>
  </Box>
);

export default React.memo(Logo);
