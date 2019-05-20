import { Grid } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleReceiveComments } from '../actions/comments';
import Comment from './Comment';
import Post from './Post';
import NewComment from './NewComment';

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
          /* TODO olhar bloco mensagem Material UI */
          <Grid item xs={12}>
            <p>404 - Post não foi encontrado.</p>
          </Grid>
        )}
      </Grid>
    );
  }
}

function mapStateToProps({ posts, comments }, props) {
  console.log('#####',props.match.params.id, posts[props.match.params])
  return {
    postExists: posts[props.match.params.id] !== undefined,
    comments
  };
}

export default connect(mapStateToProps)(PostDetail);
