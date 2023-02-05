////login.js file
require('./bootstrap');

////import React2 from 'react';
import ReactDOM from 'react-dom';
////import './css/bootstrap.min.css';
////import 'bootstrap/dist/css/bootstrap.min.css';
////import * as serviceWorker from './serviceWorker';

//// function App() {    
////   return <h1> Laravel con React.js</h1>
//// }


import React, { Component } from "react";
import "../css/app.css";
import Signup from "./components/signUp/Signup.js";
import Signin from "./components/signIn/Signin.js";
import Home from "./components/home/Home.js";
import { BrowserRouter as Routes, Router, Route, NavLink} from "react-router-dom";





export default class Login extends Component {
  render() {

    function checkActive(isActive){
      let classname = isActive ? "signIn activeLink" : "signIn";
      return classname;
    }

    let navLink = (
      <div className="Tab">
        <NavLink to="/sign-in"  className={({ isActive }) => checkActive(isActive)}>
          Sign In
        </NavLink>
        <NavLink exact="true" to="/"  className={({ isActive }) =>isActive ? "signIn activeLink" : "signIn"}>
          Sign Up
        </NavLink>
      </div>
    );
   
    return (
       
          <div className="my_container">
        
            {
            //<Router history={history}>
            <Routes>
                 {navLink}
                  {/* <Route  path="/" element={<Signup />}></Route> */}
                  {/* <Route exact path="/sign-in" component={ Signin } /> */}
                  {/* <Route exact path="/sign-in" element={<Signin />} /> */}
                  {/* <Route path="/home" component={Home}></Route> */}
            </Routes>
            // </Router>
            }
           
          </div>
       
    );
  }
}

ReactDOM.render(<Login />, document.getElementById('root_login'));