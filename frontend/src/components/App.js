import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import DashBord from './DashBord';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div className="container">
        <header className="fixed-top header-text">
          <nav className="navbar navbar-expand-md bg-light navbar-light">
            <a className="navbar-brand" href="/" alt="Go to home page" title="Home page">
              <img className="title-logo" src="../../images/logo.svg" alt="J Readable logo" />
            </a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="/">Create post</a>
                </li>                
              </ul>
            </div>
          </nav>
        </header>
        <DashBord/>
        <footer className="text-center footer-text">
          <div className="row">
            <div className="col-md-12 social">
              <a
                href="https://twitter.com/jeffemada"
                className="fontawesome-twitter"
                alt="Developer Twitter page"
                title="Twitter"
              />
              <a
                href="https://github.com/jeffemada"
                className="fontawesome-github"
                alt="Developer GitHub page"
                title="GitHub"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p>©Copyright 2018 by JeffeMada. All rights reversed.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default connect()(App);
