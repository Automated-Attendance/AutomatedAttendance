import React from 'react';

const HowItWorks = () => {
  return (
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

      <div className="block works-step works-step-left">
        <div className="row">
          <div className="span4">
            <img className="img-right" src="/images/Relax.png" alt="Create Class Image" />
            <div className="content-heading landing-title"><h2>Now relax</h2></div>
            <hr/>
            <p className="step-text step-text-right"> Sit back and relax as we take care of the rest. Our system will automatically 
              compare students images against your class gallery and check them in as they arrive in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;