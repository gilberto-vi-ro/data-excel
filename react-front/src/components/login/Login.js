
import React, { Component } from "react";
import c from "../../const.json";
import BG from "../../img/bg/bg3.jpg";
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
          Acceso
        </NavLink>
        <NavLink  to="/login/up" activeclassname={"signIn active"} className="signIn">
          Resgistrarse
        </NavLink>
      </div>
    );
    
    return (
      <>
        <div className="container-img-background">
          <img src={BG} alt="jpg" className="img-background" />
        </div>
        <div className="d-flex justify-content-center vh-100">
          <div className="m-auto col col-md-6 col-lg-4 mx-auto">
            <div className="w-100 p-2">
              <div className="m-1 login-container">
                    
                    {navLink}
                      <Routes>
                        <Route  path="/in/" element={<Signin _parent={this} />}></Route>
                        <Route  path="/up/" element={<Signup _parent={this} />}></Route>
                      </Routes>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}