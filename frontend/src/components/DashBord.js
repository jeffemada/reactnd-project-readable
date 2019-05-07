import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashbordList from './DashbordList';

class DashBord extends Component {
  state = { postIds: [] };

  componentWillReceiveProps(newprops) {
    const { posts } = newprops;
    this.sort(posts, 'votes');
  }

  sort = (posts, sortMode) => {
    const postIds = Object.keys(posts).sort((a, b) =>
      sortMode === 'votes' ? posts[b].voteScore - posts[a].voteScore : posts[b].timestamp - posts[a].timestamp
    );
    this.setState(() => ({
      postIds
    }));
  };

  handleSortModeChange = (e) => {
    const sortMode = e.target.value;
    const { posts } = this.props;
    this.sort(posts, sortMode);
  };

  render() {
    const { postIds } = this.state;

    return (
      <main className="dashbord">
        <section className="dashbord-filter">
          <form>
            <ul>
              <li>
                <label htmlFor="selCategory" className="text-margin-right">
                  Categories:
                </label>
                <select name="selCategory">
                  <option value="react">react</option>
                  <option value="redux">redux</option>
                  <option value="udacity">udacity</option>
                </select>
              </li>
              <li>
                <label htmlFor="selSort" className="text-margin-right">
                  Sort:
                </label>
                <select name="selSort" onChange={this.handleSortModeChange}>
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
