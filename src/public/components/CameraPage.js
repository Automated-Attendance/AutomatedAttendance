import React from 'react';
import Webcam from 'react-webcam';
import keydown, { Keys } from 'react-keydown';
import { queryGallery } from './requests/gallery';
import Select from 'react-select';
import Spinner from './Spinner';

export default class CameraPage extends React.Component {

  constructor(props) {
    super(props);
    
    ['takeScreenshot'].forEach((method) => {
      this[method] = this[method].bind(this);
    });

    this.state = {
      spinner: false,
      disabled: false,
      checkedinUser: null,
      selectedTimeCutoff: null,
      noClassSelected: true
    };
  }

  componentWillMount() {
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  @keydown('space')
  async takeScreenshot() {
    const screenshot = this.refs.webcam.getScreenshot();
    this.setState({ spinner: true });
    console.log( await queryGallery(screenshot) );
    this.setState({ spinner: false, checkedinUser: 'hardcoded guy checked in' });
  }

  render() {
    return (
      <div>

        { this.state.mounted && <div><Webcam ref='webcam'/></div> }

        <h1> Screenshots </h1>
        
        <div>
          <button className="screenShotButton" onClick={this.takeScreenshot}>Take Screenshot</button>


        </div>

        {this.state.spinner && <Spinner/>}
        {this.state.checkedinUser}

      </div>
    );
  }
}
