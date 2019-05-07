import React, { Component } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaCommentAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';

class Post extends Component {
  render() {
    const { title, author, timestamp, voteScore, commentCount, category } = this.props.post;
    return (
      <div className="row">
        <article className="col-md-12 post">
          <h3>{title}</h3>
          <p>
            Posted by {author} <TimeAgo date={timestamp} />.
          </p>
          <p className="post-indicators">
            <FaArrowAltCircleDown />
            <span>{voteScore}</span>
            <FaArrowAltCircleUp />
            <span className="separator" />
            <FaCommentAlt />
            <span>{commentCount} Comments</span>
            <span className="separator" />
            <span>{category}</span>
          </p>
        </article>
      </div>
    );
  }
}

function mapStateToProps({ posts }, { id }) {
  const post = posts[id];

  return {
    post
  };
}

export default connect(mapStateToProps)(Post);
