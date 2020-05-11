import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Box } from '@material-ui/core';

const color1 = {
    bgcolor: 'red',
    borderColor: 'red',
    m: 1,
    border: 1,
    style: { width: '1rem', height: '1rem' },
};
const color2 = {
    bgcolor: 'white',
    borderColor: 'white',
    m: 1,
    border: 1,
    style: { width: '1rem', height: '1rem' },
};
const color3 = {
    bgcolor: 'yellow',
    borderColor: 'yellow',
    m: 1,
    border: 1,
    style: { width: '1rem', height: '1rem' },
};
const color4 = {
    bgcolor: 'orange',
    borderColor: 'orange',
    m: 1,
    border: 1,
    style: { width: '1rem', height: '1rem' },
};



const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function CustomizedMenus({ itens, getValue }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                Cores Disponíveis
          </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

            {itens.map((item, i) => (
                 <StyledMenuItem onClick={() => { console.log('Fui clicado') }}>
                 <div style={{display: 'flex', flex: '1', width: 130}}>
                     <Box borderRadius={2} {...item} />
                 </div>
             </StyledMenuItem>
            ))}
            </StyledMenu>
        </div>
    );
}

