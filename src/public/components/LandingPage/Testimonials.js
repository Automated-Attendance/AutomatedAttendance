import React from 'react';

const Testimonials = () => {
  return (
    <div className="testimonials-container">

      <div className="container">

        <h1 className="text-center testimonials-text testimonials-title"> See what people are saying </h1>

        <div className="block works-step works-step-right">
          <div className="row">
            <div className="span4">
              <img className="img-left img-circle" src="https://res.cloudinary.com/automatedattendance/image/upload/v1493176209/testimonialimage1_ykgrzd.jpg" alt="testimonial one" />
              <div className="content-heading testimonials-text"><h4>Jason Chambers, Software Engineer</h4></div>
              <hr/>
              <p className="testimonials-text testimonials-text-p">
                Not having to check in every morning has increased my morning productivity by a thousand times.
                As soon as I walk through the door I get an email saying I have been checked in for the day.
                It's one less thing to tackle every morning which is great.
                This app is the greatest thing since the internet.
              </p>
            </div>
          </div>
        </div>

        <div className="block works-step works-step-right">
          <div className="row">
            <div className="span4">
              <img className="img-left img-circle" src="https://res.cloudinary.com/automatedattendance/image/upload/c_scale,w_200/v1492023045/rtmjuvcktfvssigjecma.png" alt="testimonial two" />
              <div className="content-heading testimonials-text"><h4>Andrew Alonis, Software Engineer</h4></div>
              <hr/>
              <p className="testimonials-text testimonials-text-p">
                I'm so excited to begin work in the morning that I hate wasting time manually signing in.
                With Automated Attendance I can get straight to work without distraction.
                My productivity levels have sky-rocketed.
                I'd recommend this app to anyone with a brain.
              </p>
            </div>
          </div>
        </div>

        <div className="block works-step works-step-right">
          <div className="row">
            <div className="span4">
              <img className="img-left img-circle" src="https://res.cloudinary.com/automatedattendance/image/upload/c_scale,w_200/v1492903911/hanzh.png" alt="testimonial three" />
              <div className="content-heading testimonials-text"><h4>Han Zhao, Software Engineer</h4></div>
              <hr/>
              <p className="testimonials-text testimonials-text-p">
                The camera loves me, and I love the camera.
                Just knowing that my handsome mug is being recorded every morning excites me.
                It gives me such a kick.
                They should call this app Automated Mood Booster.
              </p>
            </div>
          </div>
        </div>

        <div className="block works-step works-step-right">
          <div className="row">
            <div className="span4">
              <img className="img-left img-circle" src="https://res.cloudinary.com/automatedattendance/image/upload/c_scale,w_200/v1492904220/Duy12312313.png" alt="testimonial four" />
              <div className="content-heading testimonials-text"><h4>Duy Nguyen, Software Engineer</h4></div>
              <hr/>
              <p className="testimonials-text testimonials-text-p">
                Being able to save extra time in my morning routine really makes a difference.
                I can drink an extra cup of coffee or run an errand on my way to work.
                Yesterday, I even took the stairs.
                The possibilities are endless!
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Testimonials;
