import React, { Component } from "react";
import { Button } from "reactstrap";
import { Navigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar/Navbar.js";

//https://reactstrap.github.io/?path=/docs/components-navbar--props
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      data: JSON.parse(localStorage.getItem("userData")),
      errMsg:"",
    };
  }

  
  render() {
    const user = this.state.data;
    
    return (

      <>
        <Navbar />
        <div style={{"backgroundColor":"var(--text-color)","minHeight":"calc(100vh)","paddingTop":"80px",}}>
              <Routes>
                <Route  path="/home/info-tutor/" element={<div><h1>bienvenido a info tutor</h1></div>}></Route>
                <Route  path="/home/info-escolar/" element={<h1>benvenido a info escolar</h1>}></Route>
                <Route  path="/home/info-personal/" element={<h1>bienvenido a info personal</h1>}></Route>
                <Route  path="/home/perfil/" element={<h1>bienvenido a perfil</h1>}></Route>
              </Routes>
        </div>
      </>
    );
    
    
  }
}