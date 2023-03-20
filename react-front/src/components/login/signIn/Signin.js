import React, { Component } from "react";
import c from "../../../const.json";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Link, NavLink, Navigate } from "react-router-dom";

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent.props._parent;
    this.state = {
      email: "",
      password: "",
      type: 0,
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
    this.setState({ 
      errMsgEmail: "",
      errMsgPwd: "",
      msg: "",
      errMsg: "",
    });
    

    this.setState({ isLoading: true });
    this._parent.showLoading();
  
    const config = {
      url: c.baseUrlApi+"user-login",
      method: 'POST',
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
          'Content-Type': 'application/json',
      },
      data: JSON.stringify({email: this.state.email, clave: this.state.password,}),
    };

    axios(config).then((response) => {
      
        this._parent.hideLoading();
        this.setState({ isLoading: false });

        if (response.data.status === 200) {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userData", JSON.stringify(response.data.data));
          this.setState({
            msg: response.data.message,
            type: response.data.data.tipo,
            redirect: true,
          });     
        }
        if (response.data.status === "failed") {
          
          if (response.data.message === "validation_error")
          {
            this.setState({
              errMsgEmail: response.data.errors.email,
              errMsgPwd: response.data.errors.clave,
            });
          }else{
            this.setState({
              errMsg: response.data.message,
            });
          }
        }
      })
      .catch((error) => {
        this._parent.hideLoading();
        this.setState({errMsg: error.message, isLoading: false });
      });
  };

  render() {
    const redirect  = this.state.redirect;
   
    if (redirect) {
      if(this.state.type)
        return (<div><Navigate to="/admin" /></div>);
      else
        return (<div><Navigate to="/home" /></div>);
      // return (<div><Navigate to="/home" push={true} /></div>);//push recarga la pagina
    }else {
      const isLoading = this.state.isLoading;
      return (
        
          <div>
          
            {/* <button onClick={this._parent.showLoading}>show</button> */}
            <Form className="containers">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="input-login"
                  value={this.state.email}
                  onChange={this.onChangehandler}
                />
              </FormGroup>
              <p className="text-danger txt-msg">{this.state.msg}</p>
              <p className="text-danger txt-msg">{this.state.errMsgEmail}</p>
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
              </FormGroup>
              <p className="text-danger txt-msg">{this.state.errMsgPwd}</p>
              <p className="text-danger">{this.state.errMsg}</p>

              <div className="row">
              <FormGroup className="col-md-6">
                <Button
                  className="text-center btn btn-login w-100"
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
              </FormGroup>
              <FormGroup className="col-md-6 text-center pt-2">
                <Link to="/modal" className="text-link">Recover password!</Link>
              </FormGroup>
            </div>

            </Form>
          </div>

      );
    }
  }
}