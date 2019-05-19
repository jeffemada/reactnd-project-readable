import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleReceiveComments } from '../actions/comments';
import Comment from './Comment';
import Post from './Post';

class PostDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    const { dispatch } = this.props;
    dispatch(handleReceiveComments(id));
  }

  sort = (comments) => {
    return Object.keys(comments).sort((a, b) => comments[b].timestamp - comments[a].timestamp);
  };

  render() {
    const { id } = this.props.match.params;
    const { comments } = this.props;
    const sortedCommentIds = this.sort(comments);

    return (
      <Grid container>
        <Grid item xs={12}>
          <Post id={id} isDetail={true} />
        </Grid>
        <Grid item xs={12}>
          {sortedCommentIds.map((id) => (
            <Comment key={id} id={id} />
          ))}
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    comments
  };
}

export default connect(mapStateToProps)(PostDetail);
