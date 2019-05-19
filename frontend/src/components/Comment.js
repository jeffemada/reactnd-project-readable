import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, Delete, Edit } from '@material-ui/icons';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import { handleVoteComment } from '../actions/comments';

class Comment extends Component {
  handleUpVoteClick = (e) => {
    e.preventDefault();
    const { dispatch, comment } = this.props;
    dispatch(handleVoteComment(comment.id, 'upVote'));
  };

  handleDownVoteClick = (e) => {
    e.preventDefault();
    const { dispatch, comment } = this.props;
    dispatch(handleVoteComment(comment.id, 'downVote'));
  };

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
              <IconButton aria-label="Up vote" onClick={this.handleUpVoteClick}>
                <ArrowDropUp />
              </IconButton>
              <span>{voteScore}</span>
              <IconButton aria-label="Down vote" onClick={this.handleDownVoteClick}>
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
