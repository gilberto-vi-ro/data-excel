import React, { Component, useRef } from "react";
import "./App.css";
import Login from "./components/login/Login.js";
import Loader from "./components/loader/Loader.js";
import Home from "./components/home/Home.js";
import { BrowserRouter , Routes, Router, Route, Navigate} from "react-router-dom";


// https://sweetalert2.github.io/

export default class App extends Component {
  
  constructor() {
    super();
    this.loadingRef = React.createRef("loading");
    this.state  = {
      activeLoader: false,
    };
  }

  baseUrlApi = (route="") => {
    return "http://localhost:8000/api/"+route;
  }
  
  showLoading = () => {
    //  console.log(this.loadingRef)
    // this.loadingRef.current.style.display = 'block';
    this.setState({activeLoader: true});
  }

  hideLoading = () => {
    // console.log(this.loadingRef)
    // this.loadingRef.current.style = {"display": 'none'};
    this.setState({activeLoader: false});
  }

  render() {
    
    const login = localStorage.getItem("isLoggedIn");

    return (
      <>
        {/* <button onClick={this.showLoading}>show</button>
        <button onClick={() => this.hideLoading() }>hide</button> */}
        {/* <div ref = { this.loadingRef } className="loading"></div> */}
        <Loader show={this.state.activeLoader} />
        
        <BrowserRouter>
            <Routes>
              <Route exact path="/" element={!login?(<Navigate to="/login/in/" />):(<Navigate to="/home/" />) } ></Route>
              <Route path="/login/" element={<Navigate to="/login/in/" />} ></Route>
              <Route path="/login//*" element={<Login  _parent={this} />}></Route>
              {/* <Route path="/login/" element={<Login isLogged={Home} onLogout={Login} /> } />  */}
              {/* <Route path="/home/" element={<Login isLogged={Home} onLogout={Login} /> } /> */}
              <Route path="/home//*" element={login?(<Home />):(<Navigate to="/login/in/" />) } />
            </Routes>
        </BrowserRouter>
      </>
    );
  }
}
