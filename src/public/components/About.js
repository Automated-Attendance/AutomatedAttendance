import React from 'react';
import ReactDOM from 'react-dom';


const About = () => {
  return (
    <div>
      <h3 className="header">This is an automated attendance application for <a href="https://www.hackreactor.com/">Hack Reactor</a> students and staff.<br/></h3>
      <hr/>
      <h4>Accounts:</h4>
      <p>
        To create an account, simply log in with your GitHub credentials.<br/>
        Admin(istrator)s can toggle existing accounts between 'admin' and 'student' status.<br/>
        Admins can add and remove students to classes.<br/>
        Admins can create and delete classes.
      </p><br/>
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
  );
};

export default About;