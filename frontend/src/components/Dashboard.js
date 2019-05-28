import { FormControl, Grid, InputLabel, Select, SnackbarContent } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PostList from './PostList';

class Dashboard extends Component {
  state = {
    category: '',
    sortMode: 'votes'
  };

  componentDidMount() {
    const category = this.props.match.params.category;
    this.setState(() => ({
      category
    }));
  }

  sort = (postIds, sortMode) => {
    const { posts } = this.props;
    return postIds.sort((a, b) =>
      sortMode === 'votes' ? posts[b].voteScore - posts[a].voteScore : posts[b].timestamp - posts[a].timestamp
    );
  };

  filter = (category) => {
    const { posts } = this.props;
    return category ? Object.keys(posts).filter((id) => posts[id].category === category) : Object.keys(posts);
  };

  handleFilterByCategory = (e) => {
    const category = e.target.value;
    this.setState(() => ({
      category
    }));

    //navega para categoria
    this.props.history.push(`/${category}`);
  };

  handleSortModeChange = (e) => {
    const sortMode = e.target.value;

    this.setState(() => ({
      sortMode
    }));
  };

  render() {
    const { category, sortMode } = this.state;
    const { categories, categoryExists } = this.props;
    const filteredPostIds = this.filter(category);
    const sortedPostIds = this.sort(filteredPostIds, sortMode);

    return (
      <Grid container>
        {categoryExists ? (
          <Fragment>
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
          </Fragment>
        ) : (
          <Grid item xs={12}>
            <SnackbarContent message="Category not found!" style={{ backgroundColor: amber[700] }} />
          </Grid>
        )}
      </Grid>
    );
  }
}

function mapStateToProps({ categories, posts }, props) {
  return {
    categories,
    posts,
    categoryExists: props.match.params.category === undefined || categories[props.match.params.category] !== undefined
  };
}

export default connect(mapStateToProps)(Dashboard);
