import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashbordList from './DashbordList';
import { handleReceivePosts, handleReceivePostsByCategory } from '../actions/posts';

class DashBord extends Component {
  state = {
    category: '',
    postIds: [],
    sortMode: 'votes'
  };

  componentWillReceiveProps(newprops) {
    const { posts } = newprops;
    const { sortMode } = this.state;
    this.sort(posts, sortMode);
  }

  sort = (posts, sortMode) => {
    const postIds = Object.keys(posts).sort((a, b) =>
      sortMode === 'votes' ? posts[b].voteScore - posts[a].voteScore : posts[b].timestamp - posts[a].timestamp
    );
    this.setState(() => ({
      postIds,
      sortMode
    }));
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
    const { posts } = this.props;
    this.sort(posts, sortMode);
  };

  render() {
    const { category, postIds, sortMode } = this.state;

    return (
      <main className="dashbord">
        <section className="dashbord-filter">
          <form>
            <ul>
              <li>
                <label htmlFor="selCategory" className="text-margin-right">
                  Category:
                </label>
                <select name="selCategory" value={category} onChange={this.handleFilterByCategory}>
                  <option value="" />
                  <option value="react">react</option>
                  <option value="redux">redux</option>
                  <option value="udacity">udacity</option>
                </select>
              </li>
              <li>
                <label htmlFor="selSort" className="text-margin-right">
                  Sort:
                </label>
                <select name="selSort" value={sortMode} onChange={this.handleSortModeChange}>
                  <option value="votes">votes</option>
                  <option value="date">date</option>
                </select>
              </li>
            </ul>
          </form>
        </section>
        <DashbordList postIds={postIds} />
      </main>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  };
}

export default connect(mapStateToProps)(DashBord);
