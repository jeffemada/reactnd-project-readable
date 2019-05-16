import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Dashbord from './Dashbord';
import Footer from './Footer';
import Header from './Header';
import PostDetail from './PostDetail';
import NewPost from './NewPost';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <main className="main">
            <Switch>
              <Route path="/" exact component={Dashbord} />
              <Route path="/new" exact component={NewPost} />
              <Route path="/:category" exact component={Dashbord} />
              <Route path="/:category/:id" exact component={PostDetail} />
            </Switch>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
