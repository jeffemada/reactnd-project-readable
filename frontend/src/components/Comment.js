import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, Delete, Edit } from '@material-ui/icons';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import { handleDeleteComment, handleVoteComment } from '../actions/comments';

class Comment extends Component {
  onClickUpVote = (e) => {
    e.preventDefault();
    const { dispatch, comment } = this.props;
    dispatch(handleVoteComment(comment.id, 'upVote'));
  };

  onClickDownVote = (e) => {
    e.preventDefault();
    const { dispatch, comment } = this.props;
    dispatch(handleVoteComment(comment.id, 'downVote'));
  };

  onClickDelete = (e) => {
    e.preventDefault();
    const { dispatch, comment } = this.props;
    dispatch(handleDeleteComment(comment.id));
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
              <IconButton title="Up vote" type="button" onClick={this.onClickUpVote}>
                <ArrowDropUp />
              </IconButton>
              <span>{voteScore}</span>
              <IconButton title="Down vote" type="button" onClick={this.onClickDownVote}>
                <ArrowDropDown />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                <IconButton title="Edit" type="button">
                  <Edit />
                </IconButton>
                <IconButton title="Delete" type="button" onClick={this.onClickDelete}>
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
