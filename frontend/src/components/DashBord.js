import { FormControl, Grid, InputLabel, Select } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleReceivePosts, handleReceivePostsByCategory } from '../actions/posts';
import PostList from './PostList';

class DashBord extends Component {
  state = {
    category: '',
    sortMode: 'votes'
  };

  sort = (posts, sortMode) => {
    return Object.keys(posts).sort((a, b) =>
      sortMode === 'votes' ? posts[b].voteScore - posts[a].voteScore : posts[b].timestamp - posts[a].timestamp
    );
  };

  handleFilterByCategory = (e) => {
    const category = e.target.value;
    const { dispatch, posts } = this.props;
    const { sortMode } = this.state;

    if (category) {
      dispatch(handleReceivePostsByCategory(category));
    } else {
      dispatch(handleReceivePosts());
    }

    this.sort(posts, sortMode);
    this.props.history.push(`/${category}`);

    this.setState(() => ({
      category
    }));
  };

  handleSortModeChange = (e) => {
    const sortMode = e.target.value;

    this.setState(() => ({
      sortMode
    }));
  };

  render() {
    const { category, sortMode } = this.state;
    const { posts } = this.props;
    const sortedPostIds = this.sort(posts, sortMode);

    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="flex-start" spacing={24}>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="selCategory">Category</InputLabel>
                <Select native name="selCategory" value={category} onChange={this.handleFilterByCategory}>
                  <option value="" />
                  <option value="react">react</option>
                  <option value="redux">redux</option>
                  <option value="udacity">udacity</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="selSort">Sort</InputLabel>
                <Select native name="selSort" value={sortMode} onChange={this.handleSortModeChange}>
                  <option value="votes">votes</option>
                  <option value="date">date</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <PostList postIds={sortedPostIds} />
      </Grid>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  };
}

export default connect(mapStateToProps)(DashBord);
