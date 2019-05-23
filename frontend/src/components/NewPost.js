import { FormControl, Grid, IconButton, InputLabel, Select, TextField } from '@material-ui/core';
import { Cancel, Save } from '@material-ui/icons';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddPost } from '../actions/posts';

class NewPost extends Component {
  onSubmitPost = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const title = document.getElementById('newPostTitle').value;
    const body = document.getElementById('newPostBody').value;
    const author = document.getElementById('newPostAuthor').value;
    const category = document.getElementById('newPostCategory').value;
    dispatch(handleAddPost(title, body, author, category));

    // limpa form
    document.getElementById('formNewPost').reset();
    // volta para home
    this.props.history.push(`/`);
  };

  render() {
    const { categories } = this.props;

    return (
      <form id="formNewPost" onSubmit={this.onSubmitPost}>
        <fieldset>
          <legend>New post</legend>
          <Grid container justify="flex-start">
            <Grid item xs={12}>
              <TextField id="newPostTitle" label="Title" margin="dense" required fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField id="newPostBody" label="Text" margin="dense" rows="4" required fullWidth multiline />
            </Grid>
            <Grid item xs={12}>
              <TextField id="newPostAuthor" label="Author" margin="dense" required fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormControl margin="dense" required fullWidth>
                <InputLabel htmlFor="newPostCategory" shrink>
                  Category
                </InputLabel>
                <Select id="newPostCategory" margin="dense" native>
                  {Object.keys(categories).map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))}
                </Select>
              </FormControl>
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

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

export default connect(mapStateToProps)(NewPost);
