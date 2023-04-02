import React, { Component } from "react";
import c from "../../../const.json";
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
        apellido: "",
        nombre: "",
        email: "",
        clave: "",
        confirmar_clave: "",
        isLoading: "",
      },
      errApellido:"",
      errNombre:"",
      errEmail:"",
      errClave:"",
      status: "",
      msg: "",
    };
  }

  clearMsgs = ()=>{
    this.setState({ 
      errApellido:"",
      errNombre:"",
      errEmail:"",
      errClave:"",
      status: "",
      msg: "",
    });
  }

  verifyPassword = ()=>{
    if (this.state.signupData.clave !== this.state.signupData.confirmar_clave){
      this.setState({ 
        errClave: "Las contraseñas no coinciden.",
      });
      return false;
    }
    return true;
  }

  onChangehandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  onSubmitHandler = (e) => {
    this.clearMsgs();
    if(!this.verifyPassword())
        return;

    e.preventDefault();
    this.setState({ isLoading: true });
    this._parent.showLoading();

    axios.post(c.baseUrlApi+"user-signup", this.state.signupData)
      .then((response) => {
        // console.log(response);
        this._parent.hideLoading();
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          this.clearMsgs();
          this.setState({
            msg: response.data.message,
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
                errApellido: response.data.errors.apellido,
                errNombre: response.data.errors.nombre,
                errEmail: response.data.errors.email,
                errClave: response.data.errors.clave,
                msg: "Ha ocurrido un Error.",
            });
          }else{
            this.setState({ 
              msg: response.data.message,
            });
          }
        }
      }).catch((error) => {
        //  console.log(error);
        this._parent.hideLoading();
        this.setState({ isLoading: false, status: "failed", msg: error.message});
      });
  };
  render() {
    const isLoading = this.state.isLoading;
    return (
      <>
        <Form className="containers">
          <FormGroup>
            <Label for="name">Nombre</Label>
            <Input
              type="name"
              name="nombre"
              placeholder="Introdusca su nombre"
              className="input-login"
              value={this.state.signupData.nombre}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <p className="text-danger txt-msg">{this.state.errNombre}</p>
          <FormGroup>
            <Label for="name">Apellido</Label>
            <Input
              type="name"
              name="apellido"
              placeholder="Introdusca su apellido"
              className="input-login"
              value={this.state.signupData.apellidodo}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <p className="text-danger txt-msg">{this.state.errApellido}</p>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Introdusca su email"
              className="input-login"
              value={this.state.signupData.email}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <p className="text-danger txt-msg">{this.state.errEmail}</p>
          <div className="row mt-3">
            <FormGroup className="col-md-6">
              <Label for="clave">Contraseña</Label>
              <Input
                type="password"
                name="clave"
                maxLength="10"
                placeholder="Introdusca una contraseña"
                className="input-login"
                value={this.state.signupData.clave}
                onChange={this.onChangehandler}
              />
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label for="confirmar_clave">Confirmar contraseña</Label>
              <Input
                type="password"
                name="confirmar_clave"
                maxLength="10"
                placeholder="Confirmar contraseña"
                className="input-login"
                value={this.state.signupData.confirmar_clave}
                onChange={this.onChangehandler}
              />
            </FormGroup>
          </div>
          {/* <div className="row mt-3">
            <div className="col-md-6">
                <label className="text-color">Concept</label>
                <input className="input-login" type="text" name="item_description" maxLength="100" defaultValue="item 1" placeholder="paying 1 USD" required=""/>
            </div>
            <div className="col-md-6">
                <label className="text-color">Amount</label>
                <input type="number" step="0.1" className="input-login" name="item_total" defaultValue="1" placeholder="1" required=""/>
            </div>
        </div> */}



          <p className="text-danger txt-msg">{this.state.errClave}</p>
          {this.state.status==="failed"?
            (<p className="text-danger">{this.state.msg}</p>) : 
            (<p className="text-success">{this.state.msg}</p>)
          }
          
          <div className="row">
            <FormGroup className="col-md-6">
              <Button
                className="text-center btn btn-login w-100"
                onClick={this.onSubmitHandler}
              >
                Registrar
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
              <Link to="/login/in/" className="text-link">Ya me he Registrado</Link>
            </FormGroup>
          </div>
        </Form>
      </>
    );
  }
}