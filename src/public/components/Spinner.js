import React from 'react';
import CircleSpinner from 'spin.js';

export default class Spinner extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const options = {
      lines: 13,
      length: 28,
      width: 14,
      radius: 42,
      scale: 1,
      corners: 1,
      color: '#000',
      opacity: 0.1,
      rotate: 0,
      direction: 1,
      speed: 0.8,
      trail: 60,
      fps: 20,
      zIndex: 2e9,
      className: 'spinner',
      top: '50%',
      left: '50%',
      shadow: true,
      hwaccel: false,
      position: 'relative'
    };

    this.spinner = new CircleSpinner(options);
    this.spinner.spin(this.refs.spinnercircle);
  }

  render() {
    return (<div ref="spinnercircle"/>);
  }
}
