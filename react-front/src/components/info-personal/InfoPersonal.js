import "./InfoPersonal.css";
import c from "../../constGlobal.ts";
import Navbar from "../navbar/Navbar.js";
import UserDefault from "../../img/user/userDefault.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import axios from "axios";

//https://reactstrap.github.io/?path=/docs/components-navbar--props
export default class InfoPersonal extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
    this.pwdRef = React.createRef("pwdRef");
    this.confirmPwdRef = React.createRef("confirmPwdRef");
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.state = {
      edit: false,
      hasPersonalInfo: true,
      classNameAlert:"alert alert-danger mt-1",
      msg: "",
      msgProfile: "",
      activeMsgProfile: false,
      formData: {
        idUser: this.userData.id_usuario,
        idPersonalInfo: null,
        curp: "",
        age: "0",
        birthDate: "",
        domicile: "",
        sex: "",
        height: "0.0",
        weight: "0.0",
        phone: "0000000000",
      },
    };
    setTimeout(() => {
      this.getPersonalInfo();
    }, 500);

  }
  
  getPersonalInfo = (e) => {
    this._parent.showLoading();
    const idUser = this.userData.id_usuario;

    axios.get(c.baseUrlApi+"personalInfo-show/"+idUser)
      .then((response) => {
        // console.log(response);
        
        this._parent.hideLoading();
        if(response.data.status==="failed"){
          this.setState({ 
            hasPersonalInfo: false,
          });
        }else{
          const { formData } = this.state;
          formData["idUser"] = response.data.data[0].id_usuario;
          formData["idPersonalInfo"] = response.data.data[0].id_dato_personal;
          formData["curp"] = response.data.data[0].curp;
          formData["age"] = response.data.data[0].edad;
          formData["birthDate"] = response.data.data[0].fecha_nac;
          formData["domicile"] = response.data.data[0].domicilio_origen;
          formData["sex"] = response.data.data[0].sexo;
          formData["height"] = response.data.data[0].estatura==null?"0":response.data.data[0].estatura;
          formData["weight"] = response.data.data[0].peso==null?"0":response.data.data[0].peso;
          formData["phone"] = response.data.data[0].n_telefono==null?"0":response.data.data[0].n_telefono;

          this.setState({ formData});
        }
      }).catch((error) => {
        //  console.log(error);
        this._parent.hideLoading();
        this.setState({msg: error.message});
      });
  };

  handlerBtnEdit = ()=>{
    this.setState({
      edit : !this.state.edit,
      msg: ""
    })
  }

  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const { formData } = this.state;
    formData[name] = value;
    this.setState(formData);
  };

  onSubmitHandler = (e) => {
    this.setState({ msg: ""});
   
    e.preventDefault();
    this.setState({ isLoading: true });
    this._parent.showLoading();

    const config = {
      url: c.baseUrlApi+(this.state.hasPersonalInfo?"personalInfo-update":"personalInfo-create"),
      method: this.state.hasPersonalInfo?"PUT":"POST",
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
      },
      data: JSON.stringify(this.state.formData),
    };

    axios(config)
      .then((response) => {
        //  console.log(response);
        this._parent.hideLoading();

        this.setState({ 
          classNameAlert: 
                        response.data.status==="success"? "alert alert-success mt-1":"alert alert-danger mt-1",
          msg: response.data.message,
         
        });

        if(response.data.status==="success")
          this.getPersonalInfo();

      }).catch((error) => {
        //  console.log(error);
        this._parent.hideLoading();
        this.setState({ msg: error.message});
      });
  };

  msgProfile = (e) => {
    this.activeMsgProfile = !this.activeMsgProfile;
    this.setState({ msgProfile: this.activeMsgProfile?"Para editar dirigite a la seccion de PERFIL.":""});
  }

  toUpperCase = (e) =>{
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value.toUpperCase();
    const { formData } = this.state;
    formData[name] = value;
    this.setState(formData);
  }
  
  render() {
   
    var classNameInput = this.state.edit ? 'input-profile bordered' : 'input-profile';
    var DisabledInput = this.state.edit ? false : true;
    var HideComponents = this.state.edit ? false : true;
    var imgUser = this.userData.img==null?UserDefault:c.baseUrlApiFile+this.userData.img;

    const {
      msg,
      msgProfile,
      classNameAlert,
    } = this.state;

   
    
    return (

      <>
        <Navbar _parent={this} />
        <div className="body-container">
          <section className="vh-100-80px">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col  col-lg-8 mb-4 mb-lg-0">
                  <div className="card mb-3" style={{"borderRadius": "1rem","border": "none"}}>
                    <div className="row g-0">
                      <div className="col-md-4 gradient-custom text-center mytext-light rounded-l">
                        <div className="center-profile" onClick={()=>this.msgProfile()}>
                            <label htmlFor="select-file">
                                <img src={imgUser} alt="Avatar" className="img-fluid rounded-circle my-4 img-profile"  />
                            </label>
                        
                          <h5>{this.userData.nombre}</h5>
                          <p>{this.userData.apellido}</p>
                          {msgProfile && (
                              <div className={classNameAlert} role="alert">
                              {msgProfile}
                              </div> 
                          )}
                        </div>
                      </div>
                      <div className="col-md-8 bg-color rounded-r">
                        <form className="card-body p-4  mytext-dark">
                          <div className="row-info">
                              <h5 className="">Datos personales</h5>
                              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={()=>this.handlerBtnEdit()} style={{"cursor": "hand","fontSize": "25px"}}/>
                          </div>
                          <hr className="mt-0 mb-4"/>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Curp</h6>
                              <input type="text" className={classNameInput} name="curp" value={this.state.formData.curp} onChange={this.onChangehandler} minLength={18} maxLength={18} required={true}  disabled={DisabledInput} onKeyUp={this.toUpperCase} />
                            </div>
                            <div className="col-md-6 mb-3">
                              <h6>Sexo</h6>
                              <select name="sex"  className={classNameInput} value={this.state.formData.sex} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                                  <option hidden={true} value="">Select an option</option>
                                  <option value="m">MASCULINO</option>
                                  <option value="f">FEMENINO</option>
                                  <option value="i">PREFIERO NO DECIRLO</option>
                              </select>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Fecha de Nacimiento</h6>
                              <input type="date" className={classNameInput} name="birthDate" value={this.state.formData.birthDate} min={"1900-01-01T08:30"} max={"2099-06-30T16:30"}  onChange={this.onChangehandler} disabled={DisabledInput}/>
                            </div>
                            <div className="col-md-6 mb-3" >
                              <h6>Edad</h6>
                              <input type="number" className={classNameInput} name="age" value={this.state.formData.age} onChange={this.onChangehandler} min={0} max={150} disabled={DisabledInput}/>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Domicilio</h6>
                              <textarea type="text" className={classNameInput} name="domicile" value={this.state.formData.domicile} onChange={this.onChangehandler} onKeyUp={this.toUpperCase} disabled={DisabledInput} 
                              style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <h6>Telefono</h6>
                              <input type="text" className={classNameInput} name="phone" value={this.state.formData.phone} onChange={this.onChangehandler} minLength={10} maxLength={14} disabled={DisabledInput}/>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Peso</h6>
                              <div className={"input-group "+classNameInput} disabled={DisabledInput}>
                                  <span translate="no" > </span>
                                  <input type="number" step="0.1" min={0} max={150} className={"input-profile"} name="weight" value={this.state.formData.weight} onChange={this.onChangehandler} 
                                  style={{"width":"calc(50%)", "padding": "0px"}}
                                  /> 
                                  <span translate="no">Kg</span>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <h6>Estatura</h6>
                              <div className={"input-group "+classNameInput} disabled={DisabledInput}>
                                  <span translate="no" > </span>
                                  <input type="number" step="0.1" min={0} max={3} className={"input-profile"} name="height" value={this.state.formData.height} onChange={this.onChangehandler} 
                                  style={{"width":"calc(50%)", "padding": "0px"}}
                                  /> 
                                  <span translate="no">M</span>
                              </div>
                            </div>
                          </div>
                          <button type="submit" className="text-center btn btn-profile w-100" onClick={this.onSubmitHandler} hidden={HideComponents}>Guardar</button>
                          {msg && (
                              <div className={classNameAlert} role="alert">
                              {msg}
                              </div> 
                          )}
                        </form>
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