import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { NavLink, Navigate } from "react-router-dom";

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent.props._parent;
    this.state = {
      email: "",
      password: "",
      msg: "",
      isLoading: false,
      redirect: false,
      errMsgEmail: "",
      errMsgPwd: "",
      errMsg: "",
    };
  }
  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    this.setState(data);
  };

  onSignInHandler = () => {
    this.setState({ errMsgEmail: "", errMsgPwd: "" });
    this.setState({ errMsgEmail: "", errMsgPwd: "" });

    this.setState({ isLoading: true });
    this._parent.showLoading();


    axios.post("http://localhost:8000/api/user-login", {
        email: this.state.email,
        clave: this.state.password,
    }).then((response) => {
        
        console.log(response);
        this._parent.hideLoading();
        this.setState({ isLoading: false });

        if (response.data.status === 200) {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userData", JSON.stringify(response.data.data));
          this.setState({
            msg: response.data.message,
            redirect: true,
          });      
        }
        if (
          response.data.status === "failed" &&
          response.data.success === undefined
        ) {
          this.setState({
            errMsgEmail: response.data.validation_error.email,
            errMsgPwd: response.data.validation_error.clave,
          });
          // setTimeout(() => {
          //   this.setState({ errMsgEmail: "", errMsgPwd: "" });
          // }, 4000);
        } else if (
          response.data.status === "failed" &&
          response.data.success === false
        ) {
          this.setState({
            errMsg: response.data.message,
          });
          // setTimeout(() => {
          //   this.setState({ errMsg: "" });
          // }, 4000);
        }
      })
      .catch((error) => {
        console.log(error);
        this._parent.hideLoading();
        this.setState({ isLoading: false });
      });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/home" />;
    }
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      return <Navigate to="/home" />
    }
    const isLoading = this.state.isLoading;

    return (
      
        <div>
         
          {/* <button onClick={this._parent.showLoading}>show</button> */}
          <Form className="containers">
            <FormGroup>
              <Label for="email">Email id</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                className="input-login"
                value={this.state.email}
                onChange={this.onChangehandler}
              />
              <span className="text-danger">{this.state.msg}</span>
              <span className="text-danger">{this.state.errMsgEmail}</span>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                className="input-login"
                value={this.state.password}
                onChange={this.onChangehandler}
              />
              <span className="text-danger">{this.state.errMsgPwd}</span>
            </FormGroup>
            <p className="text-danger">{this.state.errMsg}</p>
            <Button
              className="text-center mb-4 btn-login"
              onClick={this.onSignInHandler}
            >
              Sign In
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm ml-5"
                  role="status"
                  aria-hidden="true"
                ></span>
                
              ) : (
                <span></span>
              )}
            </Button>
          </Form>
        </div>

    );
  }
}