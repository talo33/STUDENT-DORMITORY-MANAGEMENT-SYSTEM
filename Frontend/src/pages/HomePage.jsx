import React from 'react';
import Home from '../components/Home/Home';
import About from '../components/Home/About';
import Menu from '../components/MenuCard/Menu';
import Banner from 'components/Banner';

const HomePage = () => {
  return (
    <>
      <div className="home">
        <Home />
      </div>
      {/* About Page */}
      <About />
      <Banner />
      {/* Home Page Menu */}
      <Menu />
    </>
  );
};

export default HomePage;
