import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';

class DashBord extends Component {
  render() {
    return (
      <main className="dashbord">
        <ul>
          {this.props.postIds.map((id) => (
            <li key={id}>
              <Post id={id} />
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

/*
<main style={{ marginTop: '80px' }}>
          <div className="row">
            <article className="col-md-12 post">
              <h3>Post teste 1</h3>
              <p>Posted by Pedro 19 hours ago</p>
              <p className="post-indicators">
                <span className="fontawesome-arrow-up" />
                <span>3</span>
                <span className="fontawesome-arrow-down separator" />
                <span className="fontawesome-comment" />
                <span>25 Comments</span>
              </p>
            </article>
          </div>
          <div className="row">
            <article className="col-md-12 post">
              <h3>Post teste 2</h3>
              <p>Posted by Ana 3 hours ago</p>
              <p className="post-indicators">
                <span className="fontawesome-arrow-up" />
                <span>0</span>
                <span className="fontawesome-arrow-down separator" />
                <span className="fontawesome-comment" />
                <span>0 Comments</span>
              </p>
            </article>
          </div>
        </main>
*/

function mapStateToProps({ posts }) {
  return {
    postIds: Object.keys(posts).sort((a, b) => posts[b].voteScore - posts[a].voteScore)
  };
}

export default connect(mapStateToProps)(DashBord);
