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
        <div className="body-container">
            <div className="step-progress">
              <div className="step activated">
                <span className="step-circle">1</span>
                <span className="step-title">Datos personal</span>
              </div>
              <div className="step activated">
                <span className="step-circle">2</span>
                <span className="step-title">Datos escolar</span>
              </div>
              <div className="step">
                <span className="step-circle">3</span>
                <span className="step-title">Responsables</span>
              </div>
              <div className="step">
                <span className="step-circle">4</span>
                <span className="step-title">Datos Indigena</span>
              </div>
            </div>
        </div>
      </>
    );
    
    
  }
}