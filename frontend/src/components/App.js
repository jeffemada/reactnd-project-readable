import React, { Component } from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import DashBord from './DashBord';
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
          <Route path="/" exact component={DashBord} />
          <Route path="/:category" component={DashBord} />
          <footer className="text-center footer-text">
            <div className="row">
              <div className="col-md-12 social">
                <a href="https://twitter.com/jeffemada" alt="Developer Twitter page" title="Twitter">
                  <FaTwitter />
                </a>
                <a href="https://github.com/jeffemada" alt="Developer GitHub page" title="GitHub">
                  <FaGithub />
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p>©Copyright 2018 by JeffeMada. All rights reversed.</p>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
