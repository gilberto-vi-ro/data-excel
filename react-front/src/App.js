import React, { Component } from "react";
import "./App.css";
import Login from "./components/login/Login.js";
import Home from "./components/home/Home.js";
import { BrowserRouter , Routes, Router, Route, Navigate} from "react-router-dom";


export default class App extends Component {
  render() {

    return (
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Navigate to="/login/in/" />} ></Route>
            <Route path="/login/" element={<Navigate to="/login/in/" />} ></Route>
            <Route path="/login//*" element={<Login />}></Route>
            {/* <Route path="/login/" element={<Login isLogged={Home} onLogout={Login} /> } />  */}
            <Route path="/home/" element={<Home />}></Route>
          </Routes>
      </BrowserRouter>
    );
  }
}
