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
          <a href="https://www.linkedin.com/in/jasonochambers/"><i className="fa fa-linkedin-square fa-3x social"></i></a>
          <a href="https://github.com/Jukejc"><i className="fa fa-github-square fa-3x social"></i></a>
        </div>

        <div className="col-md-3 meet-dev-block">
          <img className="img-rounded dev-img" src="https://res.cloudinary.com/automatedattendance/image/upload/c_scale,w_200/v1492023045/rtmjuvcktfvssigjecma.png"/>
          <h4 className="testimonials-text"> Andrew Alonis </h4>
          <a href="https://www.linkedin.com/in/andrew-alonis-629842105/"><i className="fa fa-linkedin-square fa-3x social"></i></a>
          <a href="https://github.com/andrewalonis"><i className="fa fa-github-square fa-3x social"></i></a>
        </div>

        <div className="col-md-3 meet-dev-block">
          <img className="img-rounded dev-img" src="https://res.cloudinary.com/automatedattendance/image/upload/c_scale,w_200/v1492903911/hanzh.png"/>
          <h4 className="testimonials-text"> Han Zhao </h4>
          <a href="https://www.linkedin.com/in/hansheng-zhao-a0a43394/"><i className="fa fa-linkedin-square fa-3x social"></i></a>
          <a href="https://github.com/hanshengzhao1993"><i className="fa fa-github-square fa-3x social"></i></a>
        </div>

        <div className="col-md-3 meet-dev-block">
          <img className="img-rounded dev-img" src="https://res.cloudinary.com/automatedattendance/image/upload/c_scale,w_200/v1492904220/Duy12312313.png"/>
          <h4 className="testimonials-text"> Duy Nguyen </h4>
          <a href="https://www.linkedin.com/in/aiden-nguyen/"><i className="fa fa-linkedin-square fa-3x social"></i></a>
          <a href="https://github.com/nguyenaiden"><i className="fa fa-github-square fa-3x social"></i></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;