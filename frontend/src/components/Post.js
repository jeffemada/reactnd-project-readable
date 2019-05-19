import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, Comment, Delete, Edit } from '@material-ui/icons';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { handleVotePost } from '../actions/posts';

class Post extends Component {
  handleUpVoteClick = (e) => {
    e.preventDefault();
    const { dispatch, post } = this.props;
    dispatch(handleVotePost(post.id, 'upVote'));
  };

  handleDownVoteClick = (e) => {
    e.preventDefault();
    const { dispatch, post } = this.props;
    dispatch(handleVotePost(post.id, 'downVote'));
  };

  render() {
    const { id, title, body, author, timestamp, voteScore, commentCount, category } = this.props.post;
    const { isDetail } = this.props;

    return (
      <Card className="post">
        <Link to={`/${category}/${id}`} className="row">
          <CardHeader
            className="card"
            title={title}
            subheader={
              <span>
                Posted by {author} <TimeAgo date={timestamp} /> - {category}
              </span>
            }
          />
        </Link>
        {isDetail && (
          <CardContent className="card">
            <Typography paragraph>{body}</Typography>
          </CardContent>
        )}
        <CardActions disableActionSpacing className="card">
          <Grid container style={{ fontSize: '14px' }}>
            <Grid item xs={6}>
              <IconButton aria-label="Up vote" onClick={this.handleUpVoteClick}>
                <ArrowDropUp />
              </IconButton>
              <span>{voteScore}</span>
              <IconButton aria-label="Down vote" onClick={this.handleDownVoteClick}>
                <ArrowDropDown />
              </IconButton>
              <div style={{ verticalAlign: 'middle', display: 'inline-flex', padding: '6px 0' }}>
                <Comment />
              </div>
              <span style={{ paddingLeft: '3px' }}>{commentCount} comments</span>
            </Grid>
            {isDetail && (
              <Grid item xs={6}>
                <Grid container justify="flex-end">
                  <IconButton aria-label="Edit">
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="Delete">
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            )}
          </Grid>
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps({ posts }, { id }) {
  const post = posts[id];

  return {
    post
  };
}

export default withRouter(connect(mapStateToProps)(Post));
