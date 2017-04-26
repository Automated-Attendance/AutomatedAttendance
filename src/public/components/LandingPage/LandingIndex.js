import React from 'react';
import TopLevel from './TopLevel';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';

const Landing = () => {
  return (
    <div>

    <TopLevel />

    <HowItWorks />

    <Testimonials className="container"/>

    </div>
  );
};

export default Landing;
