import "./Responsibles.css";
import c from "../../const.json";
import relationshipJson from "../relationship.json";
import federativeEntitiesJson from "../federativeEntities.json";

import UserDefault from "../../img/user/userDefault.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import axios from "axios";

export default class Responsibles extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
    // this.formRef = React.createRef("formRef");
    this.state = {
      classNameAlert:"alert alert-danger mt-1",
      msg: "",
      activeModal : false,
      formData: {
        idUser: this.props.idUser,
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

  resetForm  = (e) => {
    const { formData } = this.state;
  
    formData["idResponsible"] = null;

    formData["relationship"] = "";
    formData["isTutor"] = "0";
    formData["lastName"] = "";
    formData["name"] = "";
    formData["curp"] = "";
    formData["sex"] = "";
    formData["NPhone"] = "0"
    formData["birthEntity"] = "";
    formData["birthDate"] = "";

    this.setState({ formData});
  }
  
  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const { formData } = this.state;
    formData[name] = value;
    this.setState(formData);
  };

  
  createResponsibles = (e) => {

    e.preventDefault();//evitar que recargue el form

    this.setState({ msg: ""});
    this._parent._parent.showLoading();
    const config = {
      url: c.baseUrlApi+"responsibles-create",
      method: "POST",
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
      },
      data: JSON.stringify(this.state.formData),
    };

    axios(config)
      .then((response) => {
        // console.log(response);
        this._parent._parent.hideLoading();

        this.setState({ 
          classNameAlert: 
                        response.data.status==="success"? "alert alert-success mt-1":"alert alert-danger mt-1",
          msg: response.data.message,
        });

        if(response.data.status==="success"){
          this.resetForm();
          this._parent.getResponsibles();
        }
          
      }).catch((error) => {
        //  console.log(error);
        this._parent._parent.hideLoading();
        this.setState({ msg: error.message});
      });
    
  };

  toUpperCase = (e) =>{
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value.toUpperCase();
    const { formData } = this.state;
    formData[name] = value;
    this.setState(formData);
  }

  showModal = () =>{
    this.setState({ activeModal: !this.state.activeModal,msg: ""});
  }


  render() {
    const {
      msg,
      classNameAlert,
    } = this.state;
   
    return (
      <>
        <div className="center-btn-add">
          <button type="button" className="btn btn-primary btn-circle btn-xl" onClick={this.showModal}>
            <FontAwesomeIcon icon="fa-solid fa-plus" />
          </button>
        </div>

        <div className="modal" style={this.state.activeModal?{"display":"block"}:{"display":"none"}}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-sm-12 col-md-8 mb-lg-0">
             
                  <div className="col-md-12 bg-color m-2" style={{"borderRadius":"1rem"}}>
                    <form  className="card-body p-4  mytext-dark" 
                      onSubmit={this.createResponsibles}
                      >
                      <div className="row-info">
                          <h5 className="">Tu Responsable</h5>
                          <button type="button" className="btn btn-danger btn-circle" onClick={this.showModal}
                          style={{"marginTop":"-5px"}}>
                              <FontAwesomeIcon icon="fa-solid fa-xmark" />
                          </button>
                      </div>
                      <hr className="mt-0 mb-4"/>
                      <div className="row pt-1">
                        <div className="col-md-6 mb-3">
                          <h6>Nombre</h6>
                          <input type="text" className="input-profile bordered" name="name" value={this.state.formData.name} onChange={this.onChangehandler} onKeyUp={this.toUpperCase} required={true}  />
                        </div>
                        <div className="col-md-6 mb-3">
                          <h6>Apellido</h6>
                          <textarea type="text" className="input-profile bordered" name="lastName" value={this.state.formData.lastName} onKeyUp={this.toUpperCase} onChange={this.onChangehandler} 
                          style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
                          />
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-md-6 mb-3">
                          <h6>Parentesco</h6>
                          <select name="relationship"  className="input-profile bordered" value={this.state.formData.relationship} onChange={this.onChangehandler} required={true}>
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
                          <select name="sex" className="input-profile bordered" value={this.state.formData.sex} onChange={this.onChangehandler} required={true}>
                              <option hidden={true} value="">Selecciona una opcion</option>
                              <option value="m">MASCULINO </option>
                                <option value="f">FEMENINO </option>
                                <option value="i">PREFIERO NO DECIRLO</option>
                          </select>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-md-6 mb-3">
                          <h6>Fecha de Nacimiento</h6>
                          <input type="date" className="input-profile bordered" name="birthDate" value={this.state.formData.birthDate} min={"1900-01-01T08:30"} max={"2099-06-30T16:30"}  onChange={this.onChangehandler} required={true}/>
                        </div>
                        <div className="col-md-6 mb-3" >
                          <h6>Es Tutor</h6>
                          <div className="d-flex justify-content-around">
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="isTutor" value="0" id="isTutor1" onChange={this.onChangehandler} 
                              checked={this.state.formData.isTutor === "0"}
                              />
                              <label className="form-check-label" htmlFor="isTutor1">No</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="isTutor" value="1" id="isTutor" onChange={this.onChangehandler}
                              checked={this.state.formData.isTutor === "1"}
                              />
                              <label className="form-check-label" htmlFor="isTutor">Si</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-md-6 mb-3">
                          <h6>Curp</h6>
                          <input type="text" className="input-profile bordered" name="curp" value={this.state.formData.curp} onChange={this.onChangehandler} minLength={18} maxLength={20} required={true}  onKeyUp={this.toUpperCase} />
                        </div>
                        <div className="col-md-6 mb-3">
                          <h6>Telefono</h6>
                          <input type="text" className="input-profile bordered" name="NPhone" value={this.state.formData.NPhone} onChange={this.onChangehandler} minLength={10} maxLength={14}/>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-md-6 mb-3">
                          <h6>Entidad de Nacimiento</h6>
                          <select name="birthEntity"  className="input-profile bordered" value={this.state.formData.birthEntity} onChange={this.onChangehandler} required={true}>
                              <option hidden={true} value="">Selecciona una opcion</option>
                              {
                                Object.values(federativeEntitiesJson).map((value, i,) => (
                                  <option key={i} value={value}>{value}</option>
                                ))
                              }
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="text-center btn btn-profile w-100" >Agregar</button>
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
          
      </>
    );
    
    
  }
}