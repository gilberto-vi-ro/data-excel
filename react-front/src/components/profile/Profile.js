import "./Profile.css";
import ImgMale from "../../img/user/female.jpg";
import ImgFemale from "../../img/user/male.png";
import c from "../../const.json";
import Navbar from "../home/navbar/Navbar.js";
import UploadImages from "./UploadImages.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";




//https://reactstrap.github.io/?path=/docs/components-navbar--props
export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.pwdRef = React.createRef("pwdRef");
    this.confirmPwdRef = React.createRef("confirmPwdRef");
    this.state = {
      edit: false,
      show_confirm_pwd: false,
      redirect: false,
      data: JSON.parse(localStorage.getItem("userData")),
      name: "loading...",
      last_name: "loading...",
      email: "loading...",
      pwd: "default",
      confirm_pwd: "default",
      last_time:"loading...",
      isLoading: false,
      msg: "loading...",
    };
    
  }
  handlerEdit = ()=>{
    this.setState({
      edit : !this.state.edit,
      show_confirm_pwd : false,
      pwd: "default",
      confirm_pwd: "default",
    })
    this.pwdRef.current.style = null;
    this.confirmPwdRef.current.style = null;
  }

  verifyPassword = ()=>{
    if (this.state.pwd !== this.state.confirm_pwd){
      this.pwdRef.current.style.border = '1px solid red';
      this.confirmPwdRef.current.style.border =  '1px solid red';
      this.setState({ 
        msg: "Passwords do not match",
      });
      return false;
    }else{
      this.pwdRef.current.style = null;
      this.confirmPwdRef.current.style = null;
    }
    return true;
  }

  showConfirmPwd = () => {
    if(!this.state.show_confirm_pwd){
      this.setState({
        show_confirm_pwd : true,
        pwd: "",
        confirm_pwd: "",
      });
    }
  }
  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    this.setState(data);
  };

  onSubmitHandler = ()=>{
    console.log(this.state.data);
  }

  
  render() {
    const user = this.state.data;
    var classNameInput = this.state.edit ? 'input-profile bordered' : 'input-profile';
    var DisabledInput = this.state.edit ? false : true;
    var HideComponents = this.state.edit ? false : true;
    var HideConfirmPwd = this.state.edit&&this.state.show_confirm_pwd ? false : true;
    
    return (

      <>
        <Navbar />
        <div className="body-container">
          <section className="vh-100-80px">
            {/* <UploadImages /> */}
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-8 mb-4 mb-lg-0">
                  <div className="card mb-3" style={{"borderRadius": "1rem","border": "none"}}>
                    <div className="row g-0">
                      <div className="col-md-4 gradient-custom text-center mytext-light rounded-l">
                        <div>
                          <img src={ImgFemale} alt="Avatar" className="img-fluid rounded-circle my-4" style={{"width": "80px"}} />
                          <FontAwesomeIcon icon="fa-solid fa-camera" className="img-edit" />
                        </div>
                        <h5>{this.state.name}</h5>
                        <p>{this.state.last_name}</p>
                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={()=>this.handlerEdit()} style={{"cursor": "hand","fontSize": "25px"}}/>
                      </div>
                      <div className="col-md-8 bg-color rounded-r">
                        <div className="card-body p-4  mytext-dark">
                          <div className="row-info">
                              <h5 className="">Informacion de sesion</h5>
                              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={()=>this.handlerEdit()} style={{"cursor": "hand","fontSize": "25px"}}/>
                          </div>
                          <hr className="mt-0 mb-4"/>
                          <div className="row pt-1" hidden={HideComponents}>
                            <div className="col-md-6 mb-3">
                              <h6>Name</h6>
                              <input className={classNameInput} name="name" value={this.state.name} onChange={this.onChangehandler} disabled={DisabledInput}/>
                            </div>
                            <div className="col-md-6 mb-3" >
                              <h6>Last Name</h6>
                              <input className={classNameInput} name="last_name" value={this.state.last_name} onChange={this.onChangehandler} disabled={DisabledInput}/>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Email</h6>
                              <input className={classNameInput} name="email" value={this.state.email} onChange={this.onChangehandler} disabled={DisabledInput}/>
                            </div>
                            <div className="col-md-6 mb-3">
                              <h6>Ultima vez</h6>
                              <input className={classNameInput} name="last_time" value={this.state.last_time} onChange={this.onChangehandler} disabled/>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Contraseña</h6>
                              <input ref={this.pwdRef} type="password" className={classNameInput} name="pwd" value={this.state.pwd} onChange={this.onChangehandler} disabled={DisabledInput} 
                              onKeyUp={()=>this.verifyPassword()} 
                              onClick={()=>this.showConfirmPwd()}
                              />
                            </div>
                            <div className="col-md-6 mb-3" hidden={HideConfirmPwd}>
                              <h6>Confirmar Contraseña</h6>
                              <input ref={this.confirmPwdRef} type="password" className={classNameInput} name="confirm_pwd" value={this.state.confirm_pwd} onChange={this.onChangehandler} disabled={DisabledInput}
                              onKeyUp={()=>this.verifyPassword()} 
                              />
                            </div>
                          </div>
                          <button className="text-center btn btn-profile w-100" onClick={this.onSubmitHandler} hidden={HideComponents}>Guardar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
    
    
  }
}