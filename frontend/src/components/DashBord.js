import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashbordList from './DashbordList';
import { handleReceivePosts, handleReceivePostsByCategory } from '../actions/posts';

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
      <div>
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
        <DashbordList postIds={sortedPostIds} />
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  };
}

export default connect(mapStateToProps)(DashBord);
