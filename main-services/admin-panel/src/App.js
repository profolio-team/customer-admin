import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Welcome from "./Welcome";
import Secured from "./Secured";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <ul>
            <li>
              <Link to="/">public components</Link>
            </li>
            <li>
              <Link to="/secured">secured component</Link>
            </li>
          </ul>
          <Routes>
            <Route exac path="/" element={<Welcome />} />
            <Route exac path="/publick" element={<Welcome />} />
            <Route path="secured" element={<Secured />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
