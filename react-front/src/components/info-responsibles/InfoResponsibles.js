import "./Responsibles.css";
import c from "../../const.json";
import relationshipJson from "./relationship.json";
import federativeEntitiesJson from "./federativeEntities.json";

import Navbar from "../home/navbar/Navbar.js";
import UserDefault from "../../img/user/userDefault.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import axios from "axios";

export default class Responsibles extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
    // this.pwdRef = React.createRef("pwdRef");
    // this.confirmPwdRef = React.createRef("confirmPwdRef");
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.state = {
      edit: false,
      classNameAlert:"alert alert-danger mt-1",
     
      msg: "",
      formData: {
        idUser: this.userData.id_usuario,
        idResponsible: null,

        relationship: "",
        isTutor: "0",
        lastName: "",
        name: "",
        curp: "",
        sex: "",
        NPhone: "0",
        birthEntity: "",
        birthDate: "",
      },
    };
    
  }
  // https://codedamn.com/news/reactjs/useeffect-in-class-component
  // componentDidMount(prevProps, prevState){}
  componentDidUpdate(prevProps, prevState,snapshot){
    setTimeout(() => {
      if(this.props.show===true)
        if (this.props.data.id_responsable !== this.state.formData.idResponsible)
          this.getDataResponsibles();
    }, 500);
  }
  
  getDataResponsibles = (e) => {
    
    const { formData } = this.state;
    formData["idResponsible"] = this.props.data.id_responsable;

    formData["relationship"] = this.props.data.parentesco;
    formData["isTutor"] = this.props.data.es_tutor;
    formData["lastName"] = this.props.data.apellido;
    formData["name"] = this.props.data.nombre;
    formData["curp"] = this.props.data.curp;
    formData["sex"] = this.props.data.sexo;
    formData["NPhone"] = this.props.data.n_telefono;
    formData["birthEntity"] = this.props.data.entidad_nac;
    formData["birthDate"] = this.props.data.fecha_nac;

    this.setState({ formData});
    
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

  updateResponsibles = (e) => {
    e.preventDefault();//evitar que recargue el form
    this.setState({ msg: ""});
    this.setState({ isLoading: true });
    this._parent._parent.showLoading();

    const config = {
      url: c.baseUrlApi+"responsibles-update",
      method: "PUT",
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
      },
      data: JSON.stringify(this.state.formData),
    };

    axios(config)
      .then((response) => {
        //  console.log(response);
        this._parent._parent.hideLoading();

        this.setState({ 
          classNameAlert: 
                        response.data.status==="success"? "alert alert-success mt-1":"alert alert-danger mt-1",
          msg: response.data.message,
         
        });

        if(response.data.status==="success")
          this._parent.getResponsibles();

      }).catch((error) => {
        //  console.log(error);
        this._parent._parent.hideLoading();
        this.setState({ msg: error.message});
      });

      setTimeout(() => {
        this.setState({ msg: "" });
      }, 4000);
  };


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

    const {
      msg,
      classNameAlert,
    } = this.state;


    return (
      <>
        <div className="modal" style={this.props.show?{"display":"block"}:{"display":"none"}}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-sm-12 col-lg-8  mb-lg-0 p-0">
                  <div className="row g-0 m-2">
                    <div className="col-md-4 gradient-custom text-center mytext-light rounded-l">
                      <div className="center-profile">
                          <label htmlFor="select-file">
                              <img src={UserDefault} alt="Avatar" className="img-fluid rounded-circle my-4 img-profile"  />
                          </label>
                        <h5>{this.state.formData.name}</h5>
                        <p>{this.state.formData.lastName}</p>
                      </div>
                    </div>
                    <div className="col-md-8 bg-color rounded-r">
                      <form className="card-body p-4  mytext-dark" onSubmit={this.updateResponsibles}>
                        <div className="row-info">
                            <h5 className="">Informacion</h5>
                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={()=>this.handlerBtnEdit()} style={{"cursor": "hand","fontSize": "25px"}}/>
                            <button type="button" className="btn btn-danger btn-circle"
                              style={{"marginTop":"-4px","marginRight":"-10px"}}
                              onClick={()=>this._parent.modalInfoResponsibles()}
                              ><FontAwesomeIcon icon="fa-solid fa-xmark" />
                            </button>
                        </div>
                        <hr className="mt-0 mb-4"/>
                        <div className="row pt-1">
                          <div className="col-md-6 mb-3">
                            <h6>Nombre</h6>
                            <input type="text" className={classNameInput} name="name" value={this.state.formData.name} onChange={this.onChangehandler} onBlur={this.toUpperCase} disabled={DisabledInput} required={true}  />
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6>Apellido</h6>
                            <textarea type="text" className={classNameInput} name="lastName" value={this.state.formData.lastName} onBlur={this.toUpperCase} onChange={this.onChangehandler} disabled={DisabledInput} 
                            style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
                            />
                          </div>
                        </div>
                        <div className="row pt-1">
                          <div className="col-md-6 mb-3">
                            <h6>Parentesco</h6>
                            <select name="relationship"  className={classNameInput} value={this.state.formData.relationship} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                              <option hidden={true} value="">Selecciona una opcion</option>
                              {
                                Object.values(relationshipJson).map((value, i,) => (
                                  <option key={i} value={value}>{value}</option>
                                ))
                              }
                            </select>
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6>Sexo</h6>
                            <select name="sex" className={classNameInput} value={this.state.formData.sex} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                                <option hidden={true} value="">Select an option</option>
                                <option value="m">MASCULINO </option>
                                <option value="f">FEMENINO </option>
                                <option value="i">PREFIERO NO DECIRLO</option>
                            </select>
                          </div>
                        </div>
                        <div className="row pt-1">
                          <div className="col-md-6 mb-3">
                            <h6>Fecha de Nacimiento</h6>
                            <input type="date" className={classNameInput} name="birthDate" value={this.state.formData.birthDate} min={"1900-01-01T08:30"} max={"2099-06-30T16:30"}  onChange={this.onChangehandler} disabled={DisabledInput} required={true}/>
                          </div>
                          <div className="col-md-6 mb-3" >
                            <h6>Es Tutor</h6>
                            <div className="d-flex justify-content-around">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="isTutor" value="0" id="isTutor1" onChange={this.onChangehandler} 
                                checked={this.state.formData.isTutor == "0"}
                                disabled={DisabledInput}
                                />
                                <label className="form-check-label" htmlFor="isTutor1">No</label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="isTutor" value="1" id="isTutor" onChange={this.onChangehandler}
                                checked={this.state.formData.isTutor == "1"}
                                disabled={DisabledInput}
                                />
                                <label className="form-check-label" htmlFor="isTutor">Si</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row pt-1">
                          <div className="col-md-6 mb-3">
                            <h6>Curp</h6>
                            <input type="text" className={classNameInput} name="curp" value={this.state.formData.curp} onChange={this.onChangehandler} minLength={18} maxLength={20} required={true}  disabled={DisabledInput} onBlur={this.toUpperCase} />
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6>Telefono</h6>
                            <input type="text" className={classNameInput} name="NPhone" value={this.state.formData.NPhone} onChange={this.onChangehandler} minLength={10} maxLength={14} disabled={DisabledInput}/>
                          </div>
                        </div>
                        <div className="row pt-1">
                          <div className="col-md-6 mb-3">
                            <h6>Entidad de Nacimiento</h6>
                            <select name="birthEntity"  className={classNameInput} value={this.state.formData.birthEntity} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                              <option hidden={true} value="">Selecciona una opcion</option>
                              {
                                Object.values(federativeEntitiesJson).map((value, i,) => (
                                  <option key={i} value={value}>{value}</option>
                                ))
                              }
                          </select>
                          </div>
                        </div>
                        <button type="submit" className="text-center btn btn-profile w-100" hidden={HideComponents}>Guardar</button>
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
      </>
    );
    
    
  }
}