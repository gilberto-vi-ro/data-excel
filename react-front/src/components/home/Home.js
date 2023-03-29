import React, { Component } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar/Navbar.js";
import "./Home.css";

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
        <div className="body-container2" style={{"marginTop":"80px"}}>
          <div className="">
            <div className="container-progressbar">
              <div className="step active-step">
                <span className="step-circle">1</span>
                <li >Datos personal</li>
              </div>
              <div className="step active-step">
                <span className="step-circle">2</span>
                <li >Datos escolar</li>
                <span className="step-line"></span>
              </div>
              <div className="step">
                <span className="step-circle ">3</span>
                <li >Responsables</li>
                <span className="step-line"></span>
              </div>
              <div className="step">
                <span className="step-circle">4</span>
                <li >Datos Indigena</li>
                <span className="step-line"></span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
    
    
  }
}