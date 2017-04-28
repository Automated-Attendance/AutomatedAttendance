import React from 'react';
import CircleSpinner from 'spin.js';

export default class Spinner extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const options = {
      lines: 13, 
      length: 22,
      width: 8,
      radius: 25,
      scale: 0.75,
      corners: 1,
      color: '#0090D9',
      opacity: 0.25,
      rotate: 0, 
      direction: 1,
      speed: 0.8, 
      trail: 60, 
      fps: 20, 
      zIndex: 2e9,
      className: 'spinner',
      top: '50%', 
      left: '50%',
      shadow: false,
      hwaccel: false
    };

    this.spinner = new CircleSpinner(options);
    this.spinner.spin(document.getElementById('spinnerdiv'));
  }

  render() {
    return (
      <div id="spinnerdiv" />
    );
  }
}
