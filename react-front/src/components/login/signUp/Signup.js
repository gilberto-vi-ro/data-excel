import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Signup extends Component {
  // userData;
  constructor(props) {
    super(props);
    this._parent = this.props._parent.props._parent;
    this.state = {
      signupData: {
        nombre_completo: "",
        email: "",
        clave: "",
        isLoading: "",
      },
      status: "",
      err:{name_c:"",email:"",clave:""},
      msg: "",
    };
  }

  onChangehandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  onSubmitHandler = (e) => {
    this.setState({ 
      msg: "",
      err:{
        name_c: "",
        email: "",
        clave: "",
      }
  
    });
    e.preventDefault();
    this.setState({ isLoading: true });
    this._parent.showLoading();

    axios
      .post("http://localhost:8000/api/user-signup", this.state.signupData)
      .then((response) => {
        console.log(response);

        this._parent.hideLoading();
        this.setState({ isLoading: false });

        if (response.data.status === 200) {
          this.setState({
            msg: response.data.message,
            signupData: {
              nombre_completo: "",
              email: "",
              clave: "",
            },
          });
          // setTimeout(() => {
          //   this.setState({ msg: "" });
          // }, 4000);
        }

        if (response.data.status === "failed") {
          this.setState({ 
            status: "failed",
          });
          if (response.data.message === "validation_error")
          {
              this.setState({ 
              msg: "Ha ocurrido un Error hhh.",
              err:{
                name_c: response.data.errors.nombre_completo,
                email: response.data.errors.email,
                clave: response.data.errors.clave,
              }
            });
          }else{
            this.setState({ 
              msg: response.data.message,
            });
          }
            

          
          // setTimeout(() => {
          //   this.setState({ msg: "" });
          // }, 4000);
        }
      }).catch((error) => {
        console.log(error);
        this._parent.hideLoading();
        this.setState({ isLoading: false, status: "failed", });

        this.setState({ 
          msg: "Ha ocurrido un Error.",
        });
      });
  };
  render() {
    const isLoading = this.state.isLoading;
    return (
      <div>
        <Form className="containers">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="name"
              name="nombre_completo"
              placeholder="Enter name"
              className="input-login"
              value={this.state.signupData.nombre_completo}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <p className="text-danger">{this.state.err.name_c}</p>
          <FormGroup>
            <Label for="email">Email id</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              className="input-login"
              value={this.state.signupData.email}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <p className="text-danger">{this.state.err.email}</p>
          <FormGroup>
            <Label for="clave">Password</Label>
            <Input
              type="password"
              name="clave"
              placeholder="Enter password"
              className="input-login"
              value={this.state.signupData.clave}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <p className="text-danger">{this.state.err.clave}</p>
          {this.state.status==="failed"?
            (<p className="text-danger">{this.state.msg}</p>) : 
            (<p className="text-success">{this.state.msg}</p>)
          }
          
          <Button
            className="text-center mb-4 btn-login"
            onClick={this.onSubmitHandler}
          >
            Sign Up
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
          <Link to="/login/in/" className="text-white ml-5">I'm already member</Link>
        </Form>
      </div>
    );
  }
}