import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, Cancel, Delete, Edit, Save } from '@material-ui/icons';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import { handleDeleteComment, handleEditComment, handleVoteComment } from '../actions/comments';

class Comment extends Component {
  state = {
    editMode: false
  };

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

  onClickEdit = (e) => {
    e.preventDefault();
    this.setState(() => ({
      editMode: true
    }));
  };

  onClickCancel = (e) => {
    e.preventDefault();
    this.setState(() => ({
      editMode: false
    }));
  };

  onSubmitComment = (e) => {
    e.preventDefault();
    const { dispatch, comment } = this.props;
    const body = document.getElementById('editCommentBody').value;
    dispatch(handleEditComment(comment.id, body));

    // limpa form
    document.getElementById('formEditComment').reset();

    //sair do modo de edição
    this.setState(() => ({
      editMode: false
    }));
  };

  render() {
    const { author, body, voteScore, timestamp } = this.props.comment;
    const { editMode } = this.state;

    return (
      <Card className="comment">
        {editMode ? (
          <form id="formEditComment" onSubmit={this.onSubmitComment}>
            <Grid container justify="flex-start">
              <Grid item xs={12}>
                <TextField
                  id="editCommentBody"
                  label="Text"
                  defaultValue={body}
                  margin="dense"
                  rows="2"
                  required
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <IconButton title="Save" type="submit">
                    <Save />
                  </IconButton>
                  <IconButton title="Cancel" type="reset" onClick={this.onClickCancel}>
                    <Cancel />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Fragment>
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
                    <IconButton title="Edit" type="button" onClick={this.onClickEdit}>
                      <Edit />
                    </IconButton>
                    <IconButton title="Delete" type="button" onClick={this.onClickDelete}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </CardActions>
          </Fragment>
        )}
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
