import React from 'react';

const Landing = () => {
  return (
    <div>

      <div id="top-level-landing">
        <div className="container text-center">
          <img src="/images/LandingLogo.png" alt="Landing Logo"/>
          <h1 className="landing-title"> Fully Automated Attendance Tracking System </h1>
          <h4 className="landing-slogan"> Sign up.  Populate Records.  Start Camera.</h4>
          <h4> That's all it takes. </h4>
        </div>
      </div>

      <div className="how-it-works container">
        <h1 className="text-center"> How it works </h1>
        <div>
          <span className="col-md-3 works-step">
            <img src="/images/LoginLogoLanding.png" alt="Login Image" />
            <h4 className="text-center">Login or create an account.</h4>
          </span>
        </div>
      </div>

    </div>
  );
};

export default Landing;
