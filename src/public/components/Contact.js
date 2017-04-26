import React from 'react';

const Contact = () => {
  return (
    <div className="container center-block text-center">
      <h3 className="header">Running Late? Or ran into a bug?</h3>
      <hr/>
      <h4>For attendance or account issues, contact:</h4>
      <a href="mailto:communication@hackreactor.com?Subject=Automated%20Attendance%20Support">communication@hackreactor.com</a>
      <br/><br/>
      <h4>For technical issues, contact:</h4>
      <a href="mailto:AAAllstars@gmail.com?Subject=Automated%20Attendance%20Support">AAAllstars@gmail.com</a>
      <br/>
      <br/>
      <h4>Developed by the AAAllstars: <a className="about-link" href="/#meet-devs">Meet the Developers</a></h4>
    </div>
  );
};

export default Contact;
