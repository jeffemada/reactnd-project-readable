import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, Delete, Edit } from '@material-ui/icons';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';

class Comment extends Component {
  render() {
    const { author, body, voteScore, timestamp } = this.props.comment;
    return (
      <Card className="comment">
        <CardHeader
          className="card"
          subheader={
            <span>
              Posted by {author} <TimeAgo date={timestamp} />
            </span>
          }
        />
        <CardContent className="card">
          <Typography paragraph>{body}</Typography>
        </CardContent>
        <CardActions disableActionSpacing className="card">
          <Grid container style={{ fontSize: '14px' }}>
            <Grid item xs={6}>
              <IconButton aria-label="Up vote">
                <ArrowDropUp />
              </IconButton>
              <span>{voteScore}</span>
              <IconButton aria-label="Down vote">
                <ArrowDropDown />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <IconButton aria-label="Edit">
                  <Edit />
                </IconButton>
                <IconButton aria-label="Delete">
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps({ comments }, { id }) {
  const comment = comments[id];

  return {
    comment
  };
}

export default connect(mapStateToProps)(Comment);
