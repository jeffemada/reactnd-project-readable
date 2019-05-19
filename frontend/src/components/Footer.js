import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { Grid } from '@material-ui/core';

export default function Footer() {
  return (
    <footer className="footer grow">
      <Grid container className="social">
        <Grid item xs={12} style={{ padding: 0 }}>
          <a href="https://twitter.com/jeffemada" alt="Developer Twitter page" title="Developer Twitter">
            <FaTwitter />
          </a>
          <a href="https://github.com/jeffemada" alt="Developer GitHub page" title="Developer GitHub">
            <FaGithub />
          </a>
        </Grid>
        <Grid item xs={12} style={{ padding: 0 }}>
          <p>©Copyright 2018 by JeffeMada. All rights reversed.</p>
        </Grid>
      </Grid>
    </footer>
  );
}
