'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class CameraPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const camera = new JpegCamera('#camera');
  }

  render() {
    return (
      <div>
        <div id="camera" />
      </div>
    );
  }
}

ReactDOM.render(<CameraPage />, document.getElementById('main'));