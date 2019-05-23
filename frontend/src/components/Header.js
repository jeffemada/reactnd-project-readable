import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="grow">
      <AppBar position="static">
        <Toolbar>
          <IconButton title="Home" component={NavLink} to="/" color="inherit">
            <img className="title-logo" src="../../images/logo.svg" alt="J Readable logo" />
          </IconButton>
          <Typography variant="h6" color="inherit" className="grow">
            readable
          </Typography>
          <IconButton title="New post" component={NavLink} to="/new" color="inherit">
            <AddCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
