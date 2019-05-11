import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
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
  );
}
