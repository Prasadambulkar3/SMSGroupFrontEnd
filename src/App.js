import React from "react";
import {Navbar, Breadcrumb} from "react-bootstrap";
import CityList from './city-list';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div >
        <Navbar bg="primary" variant="dark" fixed="top">
          <Navbar.Brand>SMS Group: Coding Assignment</Navbar.Brand>
        </Navbar>
        <div className="container">
        <div className="row">
          <div className="col-lg pl-lg-0 pr-lg-0 align-self-center">
          <CityList />
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
