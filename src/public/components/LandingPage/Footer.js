import React from 'react';

const Footer = () => {

  const imgResize = {
    height: '100px',
    width: '100px'
  };

  return (
    <div className="footer-container">
      <div className="text-center center-block">
        <h4>- Meet the Developers -</h4>

        <br />

        <div className="col-md-3 meet-dev-block">
        <img className="img-rounded dev-img" src="https://res.cloudinary.com/automatedattendance/image/upload/v1493176209/testimonialimage1_ykgrzd.jpg"/>
        </div>

        <div className="col-md-3 meet-dev-block">
        2
        </div>

        <div className="col-md-3 meet-dev-block">
        3
        </div>

        <div className="col-md-3 meet-dev-block">
        4
        </div>
      </div>
    </div>
  );
};

export default Footer;

        // <a href="https://www.facebook.com/bootsnipp"><i className="fa fa-facebook-square fa-3x social"></i></a>
        // <a href="https://twitter.com/bootsnipp"><i className="fa fa-twitter-square fa-3x social"></i></a>
        // <a href="https://plus.google.com/+Bootsnipp-page"><i className="fa fa-google-plus-square fa-3x social"></i></a>
        // <a href="mailto:bootsnipp@gmail.com"><i className="fa fa-envelope-square fa-3x social"></i></a>