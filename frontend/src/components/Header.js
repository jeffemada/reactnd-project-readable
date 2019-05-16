import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed-top header-text">
      <nav className="navbar navbar-expand-md bg-light navbar-light">
        <NavLink to="/" exact className="navbar-brand" alt="Go to home page" title="Home page">
          <img className="title-logo" src="../../images/logo.svg" alt="J Readable logo" />
        </NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/new" exact className="navbar-brand" alt="Go to create port page" title="Create post page">
              Create post
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
