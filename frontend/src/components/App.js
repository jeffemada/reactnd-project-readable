import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Dashbord from './Dashbord';
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
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={Dashbord} />
            <Route path="/new" exact component={NewPost} />
            <Route path="/:category" exact component={Dashbord} />
            <Route path="/:category/:id" exact component={PostDetail} />
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default connect()(App);
