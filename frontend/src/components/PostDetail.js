import { Grid, SnackbarContent } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleReceiveComments } from '../actions/comments';
import Comment from './Comment';
import NewComment from './NewComment';
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
    const { comments, postExists } = this.props;
    const sortedCommentIds = this.sort(comments);

    return (
      <Grid container>
        {postExists ? (
          <Fragment>
            <Grid item xs={12}>
              <Post id={id} isDetail={true} />
            </Grid>
            <Grid item xs={12}>
              <NewComment postId={id} />
            </Grid>
            <Grid item xs={12}>
              {sortedCommentIds.map((id) => (
                <Comment key={id} id={id} />
              ))}
            </Grid>
          </Fragment>
        ) : (
          <Grid item xs={12}>
            <SnackbarContent message="Post not found!" style={{ backgroundColor: amber[700] }} />
          </Grid>
        )}
      </Grid>
    );
  }
}

function mapStateToProps({ posts, comments }, props) {
  return {
    postExists: posts[props.match.params.id] !== undefined,
    comments
  };
}

export default connect(mapStateToProps)(PostDetail);
