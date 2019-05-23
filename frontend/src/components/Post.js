import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, Cancel, Comment, Delete, Edit, Save } from '@material-ui/icons';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { handleDeletePost, handleEditPost, handleVotePost } from '../actions/posts';

class Post extends Component {
  state = {
    editMode: false
  };

  onClickUpVote = (e) => {
    e.preventDefault();
    const { dispatch, post } = this.props;
    dispatch(handleVotePost(post.id, 'upVote'));
  };

  onClickDownVote = (e) => {
    e.preventDefault();
    const { dispatch, post } = this.props;
    dispatch(handleVotePost(post.id, 'downVote'));
  };

  onClickDelete = (e) => {
    e.preventDefault();
    const { dispatch, post } = this.props;
    dispatch(handleDeletePost(post.id));
    // volta para home
    this.props.history.push(`/`);
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

  onSubmitPost = (e) => {
    e.preventDefault();
    const { dispatch, post } = this.props;
    const title = document.getElementById('editPostTitle').value;
    const body = document.getElementById('editPostBody').value;
    dispatch(handleEditPost(post.id, title, body));

    // limpa form
    document.getElementById('formEditPost').reset();

    //sair do modo de edição
    this.setState(() => ({
      editMode: false
    }));
  };

  render() {
    const { id, title, body, author, timestamp, voteScore, commentCount, category } = this.props.post;
    const { isDetail } = this.props;
    const { editMode } = this.state;

    return (
      <Card className="post">
        {editMode ? (
          <form id="formEditPost" onSubmit={this.onSubmitPost}>
            <Grid container justify="flex-start">
              <Grid item xs={12}>
                <TextField
                  id="editPostTitle"
                  label="Title"
                  defaultValue={title}
                  margin="dense"
                  required
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="editPostBody"
                  label="Text"
                  defaultValue={body}
                  margin="dense"
                  rows="4"
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
            <Link to={`/${category}/${id}`} className="row">
              <CardHeader
                className="card"
                title={title}
                subheader={
                  <span>
                    Posted by {author} <TimeAgo date={timestamp} /> - {category}
                  </span>
                }
              />
            </Link>
            {isDetail && (
              <CardContent className="card">
                <Typography paragraph>{body}</Typography>
              </CardContent>
            )}
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
                  <div style={{ verticalAlign: 'middle', display: 'inline-flex', padding: '6px 0' }}>
                    <Comment />
                  </div>
                  <span style={{ paddingLeft: '3px' }}>{commentCount} comments</span>
                </Grid>
                {isDetail && (
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
                )}
              </Grid>
            </CardActions>
          </Fragment>
        )}
      </Card>
    );
  }
}

function mapStateToProps({ posts }, { id }) {
  const post = posts[id];

  return {
    post
  };
}

export default withRouter(connect(mapStateToProps)(Post));
