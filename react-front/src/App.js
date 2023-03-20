import React, { Component, useRef } from "react";
import "./App.css";
import "./components/font-awesome/FontAwesome.js";

import c from "./const.json";
import Login from "./components/login/Login.js";
import Loader from "./components/loader/Loader.js";
import Home from "./components/home/Home.js";
import InfoResponsibles from "./components/info-responsibles/InfoResponsibles.js";
import InfoSchool from "./components/info-school/InfoSchool.js";
import InfoPersonal from "./components/info-personal/InfoPersonal.js";
import Profile from "./components/profile/Profile.js";

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
    return c.baseUrlApi+route;
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
        
        <BrowserRouter basename={c.baseRoute}>
            <Routes>
              <Route exact path="/" element={!login?(<Navigate to={"/login/in/"} />):(<Navigate to="/home/" />) } ></Route>
              <Route path="/login/" element={<Navigate to="/login/in/" />} ></Route>
              <Route path="/login//*" element={<Login  _parent={this} />}></Route>
              {/* <Route path="/login/" element={<Login isLogged={Home} onLogout={Login} /> } />  */}
              {/* <Route path="/home/" element={<Login isLogged={Home} onLogout={Login} /> } /> */}
              <Route path="/home//*" element={login?(<Home />):(<Navigate to="/login/in/" />) } />
              <Route  path="/info-responsables//*" element={
                login?(<InfoResponsibles _parent={this} />):(<Navigate to="/login/in/" />) 
              }></Route>
              <Route  path="/info-escolar//*" element={
                login?(<InfoSchool _parent={this} />):(<Navigate to="/login/in/" />) 
              }></Route>
              <Route  path="/info-personal//*" element={
                login?(<InfoPersonal _parent={this} />):(<Navigate to="/login/in/" />) 
              }></Route>
              <Route  path="/perfil//*" element={
                login?(<Profile _parent={this} />):(<Navigate to="/login/in/" />) 
              }></Route>
            </Routes>
        </BrowserRouter>
      </>
    );
  }
}
