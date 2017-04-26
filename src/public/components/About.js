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

          <li className="question-block">
            <a className="about-link" href="#admin-how-do-i-use">I'm an admin, how do I use your app?</a>
          </li>

          <li className="question-block">
            <a className="about-link" href="#student-how-do-i-use">I'm a student, how do I use your app?</a>
          </li>
        </ul>
      </div>

      <div className="col-md-8 about-answers-block">

        <div className="answer-text-block">
          <h4 id ="create-account"className="testimonials-text negative-margin-link"> How do I create an account?</h4>
          <p>To create an account, simply login with your github credentials.</p>
        </div>

        <div className="answer-text-block">
          <h4 id="admin-privs" className="testimonials-text negative-margin-link"> What privileges do Admins have?</h4>
          <p>Admins can toggle existing accounts between 'admin' and 'student' status. 
          They can also add and remove students to classes. 
          Admins can create and delete classes.</p>
        </div>

        <div className="answer-text-block">
          <h4 id="admin-how-do-i-use" className="testimonials-text negative-margin-link"> I'm an admin, how do I use your app?</h4>
          <p>Log in and navigate to the camera page.
          Select a class and a 'late' cutoff time for todays attendance. <br/>
          Click 'Start Today's Attendance'. <br/>
          The attached webcam will begin running, taking photos of the entryway once per second.
          Attendance records are populated for all students for the selected class, giving them a 'pending' status. <br/>
          Using facial recognition, the students' attendance status is updated in real time as they enter the room.</p>
        </div>

        <div className="answer-text-block">
          <h4 id="student-how-do-i-use" className="testimonials-text negative-margin-link"> I'm an student, how do I use your app?</h4>
          <p> Log in to the application with github account to view your own attendance records. When checking in every morning, all
          you need to do is walk through the entryway and the facial recognition will do the rest. You will receive an e-mail for every
          successful checkin. If you're running late you will receive a warning e-mail stating that class is about to start.</p>
        </div>

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