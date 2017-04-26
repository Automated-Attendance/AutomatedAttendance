import React from 'react';
import ReactDOM from 'react-dom';


const About = () => {
  return (
    <div className="container">
      <h3 className="header text-center">This is an automated attendance application for <a href="https://www.hackreactor.com/">Hack Reactor</a> students and staff.<br/></h3>
      <hr/>

      <div className="col-md-4">
        <ul>
          <li className="question-block">
            <a className="about-link" href="#create-account">How do I create an account?</a>
          </li>

          <li className="question-block">
            <a className="about-link" href="#admin-privs">What privileges do admins have?</a>
          </li>
        </ul>
      </div>

      <div className="col-md-8 about-answers-block">

        <div className="answer-text-block">
          <h4 id ="create-account"className="testimonials-text negative-margin-link"> How do I create an account?</h4>
          <p>To create an account, simply login with your github credentials.</p>
        </div>

        <div>
          <h4 id="admin-privs" className="testimonials-text negative-margin-link"> What privileges do Admins have?</h4>
          <p>Admins can toggle existing accounts between 'admin' and 'student' status. 
          They can also add and remove students to classes. 
          Admins can create and delete classes.</p>
        </div>


        <h4>Daily Use:</h4>
        <p>
          As an admin, log in and navigate to the camera page.<br/>
          Select class(es) and a 'late' cutoff time for today.<br/>
          Click 'Start Today's Attendance'.<br/>
          The attached webcam begins running, taking photos of the entryway once per second.<br/>
          Attendance records are populated for all students in each selected class, giving them a 'pending' status.<br/>
          Using facial recognition, students' attendance status is updated as they enter.<br/>
          Students receive a confirmation email upon recognition.<br/>
          Students receive late warnings and absent notices if not checked in.<br/>
          The camera shuts off and all 'pending' students are marked 'absent' 30 minutes after the specified cutoff time.
        </p><br/>
        <h4>View Attendance:</h4>
        <p>
          Admins can view and edit attendance records for all students and classes.<br/>
          Students can view their personal attendance records.<br/>
          Attendance records can be sorted, filtered, and exported.
        </p>
        <hr/>
        <h4>Developed by the AAAllstars:</h4>
        <p>
          Andrew Alonis<br/>
          Jason Chambers<br/>
          Duy Nguyen<br/>
          Han Zhou
        </p>
      </div>
    </div>
  );
};

export default About;