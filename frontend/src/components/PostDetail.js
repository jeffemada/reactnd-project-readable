import React, { Component } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaCommentAlt, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';

class PostDetail extends Component {
  render() {
    const { title, body, author, voteScore, commentCount } = this.props.post;

    return (
      <div className="row">
        <article className="col-md-12 post">
          <h3>{title}</h3>
          <p>{body}</p>
          <p>Posted by {author}</p>
          <div className="post-indicators">
            <button className="image-button">
              <FaArrowAltCircleUp />
            </button>
            <span>{voteScore}</span>
            <button className="image-button">
              <FaArrowAltCircleDown />
            </button>
            <span className="separator" />
            <FaCommentAlt />
            <span>{commentCount} Comments</span>
            <span className="separator" />
            <button className="image-button" title="Editar">
              <FaEdit />
            </button>
            <button className="image-button" title="Remover">
              <FaTrashAlt />
            </button>
          </div>
        </article>
      </div>
    );
  }
}

function mapStateToProps({ posts }, props) {
  const { id } = props.match.params;

  return {
    post: posts[id]
  };
}

export default connect(mapStateToProps)(PostDetail);
