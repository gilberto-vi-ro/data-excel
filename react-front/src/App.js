import React, { Component, useRef } from "react";
import "./App.css";
import Login from "./components/login/Login.js";
import Home from "./components/home/Home.js";
import { BrowserRouter , Routes, Router, Route, Navigate} from "react-router-dom";


// https://sweetalert2.github.io/

export default class App extends Component {
  
  constructor() {
    super()
    this.loadingRef = React.createRef("loading")
  }
  
  showLoading = () => {
    //  console.log(this.loadingRef)
    this.loadingRef.current.style.display = 'block';
  }

  hideLoading = () => {
    // console.log(this.loadingRef)
    this.loadingRef.current.style = {"display": 'none'};
  }

  render() {
    
    const login = localStorage.getItem("isLoggedIn");

    return (
      <>
        {/* <button onClick={this.showLoading}>show</button>
        <button onClick={() => this.hideLoading() }>hide</button> */}
        <div ref = { this.loadingRef } className="loading">
          <div className="loadingio-spinner-spinner-i2tz3ns254l">
            <div className="ldio-p150pq3wp2e">
              <div></div><div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
        </div>
        <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Navigate to="/login/in/" />} ></Route>
              <Route path="/login/" element={<Navigate to="/login/in/" />} ></Route>
              <Route path="/login//*" element={<Login  _parent={this} />}></Route>
              {/* <Route path="/login/" element={<Login isLogged={Home} onLogout={Login} /> } />  */}
              {/* <Route path="/home/" element={<Login isLogged={Home} onLogout={Login} /> } /> */}
              <Route path="/home/" element={<Home /> } />
            </Routes>
        </BrowserRouter>
      </>
    );
  }
}
