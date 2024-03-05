import React, { Component } from 'react';
import Footer from './components/Footer';
import Slider from './components/Slider';
import NavBar from './components/NavBar';
import TopBar from './components/TopBar';
import MainPageHero from './components/MainPageHero';

class App extends Component {
  render() {
    return (
      <div className="text-center bg-neutral-300">
        <TopBar className="" />
        <NavBar className="" />
        {/* space for navbar and topbar */}
        <div className="h-[213px] lg:h-[136px]" />
        <Slider className="" />
        {/* space*/}
        <div className="h-6" />
        <MainPageHero className="" />
        <Footer className="" />
      </div>
    );
  }
}

export default App;
