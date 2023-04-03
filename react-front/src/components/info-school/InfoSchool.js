import "./InfoSchool.css";
import c from "../../const.json";
import Navbar from "../navbar/Navbar.js";
import logoSchool from "../../img/logo/logoSchool.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import axios from "axios";


//https://reactstrap.github.io/?path=/docs/components-navbar--props
export default class InfoSchool extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
    this.pwdRef = React.createRef("pwdRef");
    this.confirmPwdRef = React.createRef("confirmPwdRef");
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.state = {
      edit: false,
      hasSchoolInfo: true,
      classNameAlert:"alert alert-danger mt-1",
      msg: "",
     
      formData: {
        idUser: this.userData.id_usuario,
        idSchoolInfo: null,
        scholarship: "",
        schoolName: "null",
        schoolKey: "null",
        modality: "",
        degree: "",
        lastQualification: "0.0",
      },
    };
    setTimeout(() => {
      this.getPersonalInfo();
    }, 500);

  }
  
  getPersonalInfo = (e) => {
    this._parent.showLoading();
    const idUser = this.userData.id_usuario;

    axios.get(c.baseUrlApi+"schoolInfo-show/"+idUser)
      .then((response) => {
        // console.log(response);
        
        this._parent.hideLoading();
        if(response.data.status==="failed"){
          this.setState({ 
            hasSchoolInfo: false,
          });
        }else{
          const { formData } = this.state;
          formData["idUser"] = response.data.data[0].id_usuario;
          formData["idSchoolInfo"] = response.data.data[0].id_info_escolar;
          formData["scholarship"] = response.data.data[0].escolaridad;
          formData["schoolName"] = response.data.data[0].nombre_escuela;
          formData["schoolKey"] = response.data.data[0].clave_escolar;
          formData["modality"] = response.data.data[0].modalidad;
          formData["degree"] = response.data.data[0].grado;
          formData["lastQualification"] = 
              response.data.data[0].ultima_calificacion==null?"0":response.data.data[0].ultima_calificacion;

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
      url: c.baseUrlApi+(this.state.hasSchoolInfo?"schoolInfo-update":"schoolInfo-create"),
      method: this.state.hasSchoolInfo?"PUT":"POST",
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

  toUpperCase = (e) =>{
     e.target.value = e.target.value.toUpperCase();
  }
  
  render() {
   
    var classNameInput = this.state.edit ? 'input-profile bordered' : 'input-profile';
    var DisabledInput = this.state.edit ? false : true;
    var HideComponents = this.state.edit ? false : true;

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
                        <div className="center-profile">
                            <label htmlFor="select-file">
                                <img src={logoSchool} alt="Avatar" className="img-fluid rounded-circle my-4 img-profile"  />
                            </label>
                        
                          <h5>{this.state.formData.schoolName}</h5>
                          <p>{this.state.formData.schoolKey}</p>
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
                              <h5 className="">Datos Escolar</h5>
                              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={()=>this.handlerBtnEdit()} style={{"cursor": "hand","fontSize": "25px"}}/>
                          </div>
                          <hr className="mt-0 mb-4"/>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Nombre de la Escuela</h6>
                              <textarea type="text" className={classNameInput} name="schoolName" value={this.state.formData.schoolName} onChange={this.onChangehandler} disabled={DisabledInput} 
                              style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <h6>Escolaridad</h6>
                              <select name="scholarship" className={classNameInput} value={this.state.formData.scholarship} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                                  <option hidden={true} value="">Seleciona una opcion</option>
                                  <option value="Bimestral">Bimestral</option>
                                  <option value="Trimestral">Trimestral</option>
                                  <option value="Cuatrimestral">Cuatrimestral</option>
                                  <option value="Semestral">Semestral</option>
                                  <option value="Anual">Anual</option>
                                  <option value="Otro">Otro</option>
                              </select>
                            </div>
                          </div>

                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Clave Escolar</h6>
                              <input type="text" className={classNameInput} name="schoolKey" value={this.state.formData.schoolKey} onChange={this.onChangehandler} minLength={10} maxLength={20} required={true}  disabled={DisabledInput} onKeyUp={this.toUpperCase} />
                            </div>
                            <div className="col-md-6 mb-3">
                              <h6>Modalidad</h6>
                              <select name="modality" className={classNameInput} value={this.state.formData.modality} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                                  <option hidden={true} value="">Seleciona una opcion</option>
                                  <option value="Preescolar">Preescolar </option>
                                  <option value="Primaria">Primaria </option>
                                  <option value="Secundaria">Secundaria</option>
                                  <option value="Bachillerato">Bachillerato </option>
                                  <option value="Superior">Superior </option>
                                  <option value="Otro">Otro</option>
                              </select>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3" >
                              <h6>Grado</h6>
                              <select name="degree" className={classNameInput} value={this.state.formData.degree} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                                  <option hidden={true} value="">Seleciona una opcion</option>
                                  <option value="1">1 </option>
                                  <option value="2">2 </option>
                                  <option value="3">3</option>
                                  <option value="4">4 </option>
                                  <option value="5">5 </option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8 </option>
                                  <option value="9">9 </option>
                                  <option value="10">10</option>
                                  <option value="11">11 </option>
                                  <option value="12">12 </option>
                                  <option value="13">13</option>
                                  <option value="14">14 </option>
                                  <option value="15">15 </option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                  <option value="18">18 </option>
                                  <option value="19">19 </option>
                                  <option value="20">20</option>
                              </select>
                            </div>
                            <div className="col-md-6 mb-3" >
                              <h6>Ultima Calificacion</h6>
                              <input type="number" step="0.1" min={0} max={10} className={classNameInput} name="lastQualification" value={this.state.formData.lastQualification} onChange={this.onChangehandler} disabled={DisabledInput}/>
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