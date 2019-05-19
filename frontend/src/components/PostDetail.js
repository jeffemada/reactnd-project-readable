import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';

class PostDetail extends Component {
  render() {
    const { id } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Post id={id} isDetail={true} />
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps({ posts }, props) {
  const { id } = props.match.params;

  return {
    id,
    post: posts[id]
  };
}

export default connect(mapStateToProps)(PostDetail);
