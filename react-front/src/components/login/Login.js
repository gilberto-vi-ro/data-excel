
import React, { Component } from "react";
import "./login.css";
import Signup from "./signUp/Signup.js";
import Signin from "./signIn/Signin.js";
import { BrowserRouter , Routes, Router, Route, NavLink} from "react-router-dom";


export default class Login extends Component {
  render() {

    function checkActive(isActive){
      let classname = isActive ? "signIn activeLink" : "signIn";
      return classname;
    }

    let navLink = (
      <div className="Tab">
        <NavLink exact="true" to="/login/in" activeclassname={"signIn active"} className="signIn">
          Sign In
        </NavLink>
        <NavLink  to="/login/up" activeclassname={"signIn active"} className="signIn">
          Sign Up
        </NavLink>
      </div>
    );
    // const login = localStorage.getItem("isLoggedIn");
    return (
      
      <div className="d-flex justify-content-center vh-100">
        <div className="m-auto col col-md-6 mx-auto">
          <div className="w-100">
            <div className="m-1">
                   {navLink}
                    <Routes>
                      <Route  path="/in/" element={<Signin />}></Route>
                      <Route  path="/up/" element={<Signup />}></Route>
                    </Routes>
            </div>
          </div>
        </div>
    </div>
    );
  }
}