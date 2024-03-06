import React, { Component } from 'react';
import Footer from './components/Footer';
import Slider from './components/Slider';
import NavBar from './components/NavBar';
import TopBar from './components/TopBar';
import HomeHero from './components/HomeHero';
import LatestNewsGrid from './components/LatestNewsGrid';

class App extends Component {
  render() {
    return (
      <div className="text-center bg-white">
        <TopBar className="" />
        <NavBar className="" />
        {/* <Slider className="" /> */}
        <HomeHero className="" />
        <LatestNewsGrid className="" />
        <Footer className="" />
      </div>
    );
  }
}

export default App;
