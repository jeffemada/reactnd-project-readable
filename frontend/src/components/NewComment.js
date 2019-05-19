import { Grid, IconButton, TextField } from '@material-ui/core';
import { Cancel, Save } from '@material-ui/icons';
import React, { Component } from 'react';
import { handleAddComment } from '../actions/comments';
import { connect } from 'react-redux';

class NewComment extends Component {
  onSubmitComment = (e) => {
    e.preventDefault();
    const { dispatch, postId } = this.props;
    const author = document.getElementById('commentAuthor').value;
    const body = document.getElementById('commentBody').value;
    dispatch(handleAddComment(author, body, postId));

    // limpa form
    document.getElementById("formNewComment").reset();
  };

  render() {
    return (
      <form id="formNewComment" onSubmit={this.onSubmitComment}>
        <fieldset>
          <legend>New comment</legend>
          <Grid container justify="flex-start">
            <Grid item xs={12}>
              <TextField id="commentAuthor" label="Author" margin="dense" required fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField id="commentBody" label="Comment" margin="dense" rows="2" required fullWidth multiline />
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                <IconButton title="Save" type="submit">
                  <Save />
                </IconButton>
                <IconButton title="Cancel" type="reset">
                  <Cancel />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </fieldset>
      </form>
    );
  }
}

export default connect()(NewComment);
