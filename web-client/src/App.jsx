import React, { Component } from 'react';
import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar className="" />
        <NavBar className="" />
      </div>
    );
  }
}

export default App;
