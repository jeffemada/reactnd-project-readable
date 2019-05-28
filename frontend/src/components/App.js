import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import Footer from './Footer';
import Header from './Header';
import NewPost from './NewPost';
import PostDetail from './PostDetail';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <LoadingBar />
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/new" exact component={NewPost} />
            <Route path="/:category" exact component={Dashboard} />
            <Route path="/:category/:id" exact component={PostDetail} />
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default connect()(App);
