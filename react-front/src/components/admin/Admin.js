import React, { Component } from "react";

import axios from "axios";
import Navbar from "../navbar/Navbar.js";
import InfoUser from "./users/InfoUser.js";
import Users from "./users/Users.js";
import "./Admin.css";

//https://reactstrap.github.io/?path=/docs/components-navbar--props
export default class Home extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
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
        <Navbar _parent={this} />
        <div className="body-container">
            <InfoUser/>
        </div>
      </>
    );
    
    
  }
}