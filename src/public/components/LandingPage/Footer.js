import React from 'react';

const Footer = () => {

  const imgResize = {
    height: '100px',
    width: '100px'
  };

  return (
    <div className="footer-container">
      <div className="container text-center center-block">
        <h4>- Meet the Developers -</h4>

        <br />

        <div className="col-md-3 meet-dev-block">
          <img className="img-rounded dev-img" src="https://res.cloudinary.com/automatedattendance/image/upload/v1493176209/testimonialimage1_ykgrzd.jpg"/>
          <h4 className="testimonials-text"> Jason Chambers </h4>
        </div>

        <div className="col-md-3 meet-dev-block">
          <img className="img-rounded dev-img" src="https://res.cloudinary.com/automatedattendance/image/upload/c_scale,w_200/v1492023045/rtmjuvcktfvssigjecma.png"/>
          <h4 className="testimonials-text"> Andrew Alonis </h4>
        </div>

        <div className="col-md-3 meet-dev-block">
          <img className="img-rounded dev-img" src="https://res.cloudinary.com/automatedattendance/image/upload/c_scale,w_200/v1492903911/hanzh.png"/>
          <h4 className="testimonials-text"> Han Zhao </h4>
        </div>

        <div className="col-md-3 meet-dev-block">
          <img className="img-rounded dev-img" src="https://res.cloudinary.com/automatedattendance/image/upload/c_scale,w_200/v1492904220/Duy12312313.png"/>
          <h4 className="testimonials-text"> Duy Nguyen </h4>
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