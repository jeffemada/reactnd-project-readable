import { Grid } from '@material-ui/core';
import React from 'react';
import Post from './Post';

function PostList(props) {
  const { postIds } = props;

  return (
    <Grid item xs={12}>
      {postIds.map((id) => (
        <Post key={id} id={id} isDetail={false} />
      ))}
    </Grid>
  );
}

export default PostList;
