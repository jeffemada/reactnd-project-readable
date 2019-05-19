import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="grow">
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" component={NavLink} to="/">
            <img className="title-logo" src="../../images/logo.svg" alt="J Readable logo" />
          </IconButton>
          <Typography variant="h6" color="inherit" className="grow">
            readable
          </Typography>
          <Button color="inherit" component={NavLink} to="/new">
            Create post
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
