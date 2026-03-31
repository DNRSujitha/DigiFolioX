import React from 'react';
import Header from './Header';
import About from './About';
import Contactus from './Contactus';
import Footer from './Footer';

function HomePage({ data }) {
  return (
    <div>
      <Header data={data} />
      <About data={data} />
      <Contactus data={data} />
      <Footer data={data} />
    </div>
  );
}

export default HomePage;