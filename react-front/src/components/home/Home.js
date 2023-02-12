import React, { Component } from "react";
import { Button } from "reactstrap";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      data: JSON.parse(localStorage.getItem("userData")),
      errMsg:"",
    };
  }

  onLogoutHandler = () => {
    localStorage.clear();
    this.setState({
      redirect: true,
    });

  };
  render() {
    const user = this.state.data;
    const navigate = this.state.redirect;
    if (navigate) {
      return (
        <div>
          <Navigate to="/login/" push={true} />
        </div>
      )
      // window.location.href = "/login";
    }else {
      return (
        <div className="container  border">
          <h3> HomePage</h3>
          <div className="row">
            <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
              <h5> Welcome, {user.nombre} </h5> You have Logged in
              successfully.
            </div>
            <div className="col-xl-3 col-sm-12 col-md-3">
              <Button
                className="btn btn-primary text-right"
                onClick={this.onLogoutHandler}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      );
    }
    
  }
}