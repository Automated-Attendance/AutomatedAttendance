'use strict';

import React from 'react';
import ReactDOM from 'react-dom';


export default class About extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3 className="header">What are we doing here?</h3>
        <p>
          We are creating an automated attendance system for Hack Reactor...
        </p>
        <h5>
          Developed by:
        </h5>
        <p>
          Andrew Alonis<br></br>
          Jason Chambers<br></br>
          Duy Nguyen<br></br>
          Han Zhou
        </p>
      </div>
    );
  }
}