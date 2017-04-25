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
        <h1 className="text-center landing-title"> How it works </h1>
        <div className="block">
          <div className="row">
            <div className="span4">
              <img className="img-left" src="/images/LoginLogoLanding.png" alt="Login Image" />
              <div className="content-heading"><h2>Login or create an account</h2></div>
              <hr/>
              <p className="step-text"> Login with your Github <i className="fa fa-github fa-4" aria-hidden="true"></i> to automatically generate and account
                and be able to check on your attendance status in real time.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Landing;
