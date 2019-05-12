import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import DashBord from './DashBord';
import Footer from './Footer';
import Header from './Header';

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
          <Route path="/" component={DashBord} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
