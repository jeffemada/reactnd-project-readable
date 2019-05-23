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

    //navega para categoria
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
    const { categories, posts } = this.props;
    const sortedPostIds = this.sort(posts, sortMode);

    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="flex-start" spacing={24}>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="selCategory" shrink>
                  Category
                </InputLabel>
                <Select name="selCategory" value={category} onChange={this.handleFilterByCategory} autoWidth native>
                  <option value="">all</option>
                  {Object.keys(categories).map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="selSort" shrink>
                  Sort
                </InputLabel>
                <Select name="selSort" value={sortMode} onChange={this.handleSortModeChange} autoWidth native>
                  <option value="votes">by votes</option>
                  <option value="date">by date</option>
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

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  };
}

export default connect(mapStateToProps)(DashBord);
