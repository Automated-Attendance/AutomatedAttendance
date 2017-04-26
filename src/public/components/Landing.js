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

        <div className="block works-step works-step-right">
          <div className="row">
            <div className="span4">
              <img className="img-left" src="/images/LoginLogoLanding.png" alt="Login Image" />
              <div className="content-heading landing-title"><h2>Login or create an account</h2></div>
              <hr/>
              <p className="step-text"> Login with your Github <i className="fa fa-github fa-4" aria-hidden="true"></i> to automatically generate and account
                and be able to check on your attendance status in real time.
              </p>
            </div>
          </div>
        </div>

        <div className="block works-step works-step-left">
          <div className="row">
            <div className="span4">
              <img className="img-right" src="/images/CreateClass.png" alt="Create Class Image" />
              <div className="content-heading landing-title"><h2>Create a class</h2></div>
              <hr/>
              <p className="step-text step-text-right"> Search through the database of students to create your class and be able to track their
                attendance habits on a day to day basis.
              </p>
            </div>
          </div>
        </div>

        <div className="block works-step works-step-right">
          <div className="row">
            <div className="span4">
              <img className="img-left img-record" src="/images/PopulateRecordsImage.png" alt="Populate Records Image" />
              <div className="content-heading landing-title"><h2>Populate your attendance records</h2></div>
              <hr/>
              <p className="step-text"> Once your class has been set up, head on over to the camera page to populate the attendance records
                for the day.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Landing;
