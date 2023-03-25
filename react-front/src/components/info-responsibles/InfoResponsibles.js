import "./Responsibles.css";
import c from "../../const.json";
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
        idResponsibles: null,

        relationship: "",
        isTutor: "",
        lastName: "null",
        name: "null",
        curp: "",
        sex: "",
        NPhone: "0000000000",
        birthEntity: "",
        birthDate: "",
      },
    };
    // setTimeout(() => {
    //   this.getResponsibles();
    // }, 500);

  }
  
  dataResponsibles = (e) => {
    
    const idUser = this.props.data.idUser;

    axios.get(c.baseUrlApi+"responsibles-show/"+idUser)
      .then((response) => {
        // console.log(response);
        
        this._parent.hideLoading();
        if(response.data.status==="failed"){
          this.setState({ 
            hasResponsibles: false,
          });
        }else{
          this.setState({ 
            dataResponsibles : response.data.data,
          });
          
          const { formData } = this.state;
          formData["idUser"] = this.props.data.id_usuario;
          formData["idResponsibles"] = this.props.data.id_responsable;

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
        }
      }).catch((error) => {
        //  console.log(error);
        this._parent.hideLoading();
        this.setState({msg: error.messisTutor});
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

  updateResponsibles = (e) => {
    this.setState({ msg: ""});
   
    e.preventDefault();
    this.setState({ isLoading: true });
    this._parent.showLoading();

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
        this._parent.hideLoading();

        this.setState({ 
          classNameAlert: 
                        response.data.status==="success"? "alert alert-success mt-1":"alert alert-danger mt-1",
          msg: response.data.messisTutor,
         
        });

        if(response.data.status==="success")
          this.getResponsibles();

      }).catch((error) => {
        //  console.log(error);
        this._parent.hideLoading();
        this.setState({ msg: error.messisTutor});
      });
  };


  toUpperCase = (e) =>{
     e.target.value = e.target.value.toUpperCase();
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
              <div className="col  col-lg-8 mb-4 mb-lg-0">
                <div className="card mb-3" style={{"borderRadius": "1rem","border": "none"}}>
                  <div className="row g-0">
                    <div className="col-md-4 gradient-custom text-center mytext-light rounded-l">
                      <div className="center-profile" onClick={()=>this.msgProfile()}>
                          <label htmlFor="select-file">
                              <img src={UserDefault} alt="Avatar" className="img-fluid rounded-circle my-4 img-profile"  />
                          </label>
                      
                        <h5>{this.state.formData.name}</h5>
                        <p>{this.state.formData.lastName}</p>
                      
                      </div>
                    </div>
                    <div className="col-md-8 bg-color rounded-r">
                      <form className="card-body p-4  mytext-dark">
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
                            <input type="text" className={classNameInput} name="name" value={this.state.formData.name} onChange={this.onChangehandler} required={true}  disabled={DisabledInput} onKeyUp={this.toUpperCase} />
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6>Apellido</h6>
                            <textarea type="text" className={classNameInput} name="lastName" value={this.state.formData.lastName} onChange={this.onChangehandler} disabled={DisabledInput} 
                            style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
                            />
                          </div>
                        </div>
                        <div className="row pt-1">
                          <div className="col-md-6 mb-3">
                            <h6>Parentesco</h6>
                            <input type="text" className={classNameInput} name="relationship" value={this.state.formData.relationship} onChange={this.onChangehandler} minLength={18} maxLength={18} required={true}  disabled={DisabledInput} onKeyUp={this.toUpperCase} />
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6>Sexo</h6>
                            <select name="sex"  className={classNameInput} value={this.state.formData.sex} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                                <option hidden={true} value="">Select an option</option>
                                <option value="m">Masculino </option>
                                <option value="f">Femenino </option>
                                <option value="i">Prefiero no decirlo</option>
                            </select>
                          </div>
                        </div>
                        <div className="row pt-1">
                          <div className="col-md-6 mb-3">
                            <h6>Fecha de Nacimiento</h6>
                            <input type="date" className={classNameInput} name="birthDate" value={this.state.formData.birthDate} min={"1900-01-01T08:30"} max={"2099-06-30T16:30"}  onChange={this.onChangehandler} disabled={DisabledInput}/>
                          </div>
                          <div className="col-md-6 mb-3" >
                            <h6>Es Tutor</h6>
                            <input type="number" className={classNameInput} name="isTutor" value={this.state.formData.isTutor} onChange={this.onChangehandler} min={0} max={150} disabled={DisabledInput}/>
                          </div>
                        </div>
                        <div className="row pt-1">
                          <div className="col-md-6 mb-3">
                            <h6>Curp</h6>
                            <input type="text" className={classNameInput} name="curp" value={this.state.formData.curp} onChange={this.onChangehandler} minLength={18} maxLength={20} required={true}  disabled={DisabledInput} onKeyUp={this.toUpperCase} />
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6>Telefono</h6>
                            <input type="text" className={classNameInput} name="NPhone" value={this.state.formData.NPhone} onChange={this.onChangehandler} minLength={10} maxLength={14} disabled={DisabledInput}/>
                          </div>
                        </div>
                        
                        <div className="row pt-1">
                        
                          <div className="col-md-6 mb-3">
                            <h6>Entidad de Nacimiento</h6>
                            <input type="text" className={classNameInput} name="birthEntity" value={this.state.formData.birthEntity} onChange={this.onChangehandler} required={true}  disabled={DisabledInput} onKeyUp={this.toUpperCase} />
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
        </div>
      </>
    );
    
    
  }
}