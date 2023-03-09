import "./InfoResponsibles.css";
import c from "../../const.json";
import Navbar from "../home/navbar/Navbar.js";

import React, { Component } from "react";
import { Button } from "reactstrap";
import { Navigate, Routes, Route } from "react-router-dom";



//https://reactstrap.github.io/?path=/docs/components-navbar--props
export default class InfoResponsibles extends Component {
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
        <div className="body-container">
              hola mundo
        </div>
      </>
    );
    
    
  }
}