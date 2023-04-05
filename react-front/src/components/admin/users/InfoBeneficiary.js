
import c from "../../../const.json";
import relationshipJson from "../../relationship.json";
import federativeEntitiesJson from "../../federativeEntities.json";

import UserDefault from "../../../img/user/userDefault.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import axios from "axios";

export default class InfoBeneficiary extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
   
    this.state = {
      classNameAlert:"alert alert-danger mt-1",
      msg: "",
      infoData: {
        idUser: null,
        DataResponsibles: null
      },
    };
    
  }
  // https://codedamn.com/news/reactjs/useeffect-in-class-component
  // componentDidMount(prevProps, prevState){}
  componentDidUpdate(prevProps, prevState,snapshot){
    setTimeout(() => {
      if(this.props.show===true)
        if (this.props.data.id_usuario !== this.state.infoData.idUser)
          this.getResponsiblesBeneficiary();
    }, 500);
  }
  
  getResponsiblesBeneficiary = (e) => {
    
    const { infoData } = this.state;
    infoData["idUser"] = this.props.data.id_usuario;
    this.setState({ infoData});

    this.getDataResponsiblesBeneficiary();
    
  };


  closeInfoBeneficiary = (e) => {
    this.setState({
      msg: ""
    })
    this._parent.modalInfoBeneficiary();
  };

  getDataResponsiblesBeneficiary = () => {
    this.setState({ msg: ""});
    this.setState({ isLoading: true });
    this._parent._parent.showLoading();

    const config = {
      url: c.baseUrlApi+"admin-getResponsibleBeneficiaries/"+this.state.infoData.idUser,
      method: "GET",
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
      },
      data: JSON.stringify(this.state.infoData),
    };

    axios(config)
      .then((response) => {
        //  console.log(response);
        this._parent._parent.hideLoading();
        const { infoData } = this.state;
        infoData["DataResponsibles"] = response.data.data;
        this.setState({ 
          classNameAlert: 
                        response.data.status==="success"? "alert alert-success mt-1":"alert alert-danger mt-1",
          msg: response.data.message,
          infoData
        });

      }).catch((error) => {
        //  console.log(error);
        this._parent._parent.hideLoading();
        this.setState({ msg: error.message});
      });

      setTimeout(() => {
        this.setState({ msg: "" });
      }, 4000);
  };

  
  render() {
  
    const {
      msg,
      classNameAlert,
    } = this.state;
    var ultima_vez = "";
    var created_at = "";
    var fecha_nacimiento = "";
    if (this.props.show){
      ultima_vez = this.props.data.ultima_vez==null?"":this.props.data.ultima_vez.slice(0, 16);
      created_at = this.props.data.created_at==null?"":this.props.data.created_at.slice(0, 16);
      fecha_nacimiento = this.props.data.fecha_nacimiento==null?"":this.props.data.fecha_nacimiento.slice(0, 16);
    }
    

    return (
      this._parent.state.activeModalInfoBeneficiary&&this.props.show?(
        <>
          <div className="modal" style={this.props.show?{"display":"block"}:{"display":"none"}}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-sm-12 col-md-8 mb-lg-0">
                <div className="col-md-12 bg-color m-2" style={{"borderRadius":"1rem"}}>
                    <form className="card-body p-4  mytext-dark" onSubmit={this.updateBeneficiary}>
                      <div className="row-info">
                          <h5 className="text-modal-title">Informacion Personal</h5>
                          
                          <button type="button" className="btn btn-danger btn-circle"
                            style={{"marginTop":"-4px","marginRight":"-10px"}}
                            onClick={()=>this.closeInfoBeneficiary()}
                            ><FontAwesomeIcon icon="fa-solid fa-xmark" />
                          </button>
                      </div>
                      <hr className="mt-0 mb-4"/>
                      <div className="row pt-1">
                        <div className="col-md-4 mb-3">
                          <h6>Nombre</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.nombre==null?"":this.props.data.nombre} disabled={true} required={true}  />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Apellido</h6>
                          <textarea type="text" className={"input-profile"} name="lastName" value={this.props.data.apellido==null?"":this.props.data.apellido} disabled={true} 
                          style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Email</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.email==null?"":this.props.data.email} disabled={true} required={true}  />
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-md-4 mb-3">
                          <h6>Estado de solicitud</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.estado_de_solicitud==null?"":this.props.data.estado_de_solicitud} disabled={true} required={true}  />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Fecha de recepcion</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.fecha_de_recepcion==null?"":this.props.data.fecha_de_recepcion} disabled={true} required={true}  />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>descripcion</h6>
                          <textarea type="text" className={"input-profile"} name="lastName" value={this.props.data.descripcion==null?"":this.props.data.descripcion} disabled={true} 
                          style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
                          />
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-md-4 mb-3">
                          <h6>Curp</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.curp==null?"":this.props.data.curp} disabled={true} required={true}  />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Edad</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.edad==null?"":this.props.data.edad} disabled={true} required={true}  />
                        </div>
                        <div className="col-md-3 mb-3">
                          <h6>Telefono</h6>
                          <input type="text" className={"input-profile"} name="NPhone" value={this.props.data.n_telefono==null?"":this.props.data.n_telefono}  minLength={10} maxLength={14} disabled={true}/>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-md-4 mb-3">
                          <h6>Sexo</h6>
                          <select name="sex" className={"input-profile"} value={this.props.data.sexo==null?"":this.props.data.sexo}  disabled={true} required={true}>
                              <option hidden={true} value="">Select an option</option>
                              <option value="m">MASCULINO </option>
                              <option value="f">FEMENINO </option>
                              <option value="i">PREFIERO NO DECIRLO</option>
                          </select>
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Estatura</h6>
                          <input type="text" className={"input-profile"} name="NPhone" value={this.props.data.estatura==null?"":this.props.data.estatura}   disabled={true}/>
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Peso</h6>
                          <input type="text" className={"input-profile"} name="NPhone" value={this.props.data.peso==null?"":this.props.data.peso}   disabled={true}/>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-md-12 mb-3">
                          <h6>Domicilio</h6>
                          <textarea type="text" className={"input-profile"} name="lastName" value={this.props.data.domicilio_origen==null?"":this.props.data.domicilio_origen} disabled={true} 
                          style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
                          />
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-md-4 mb-3">
                          <h6>Fecha de nacimiento</h6>
                          <input type="date" className={"input-profile"} name="created_at" value={fecha_nacimiento} min={"1900-01-01T08:30"} max={"2099-06-30T16:30"}   disabled={true} required={true}/>
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Ultima vez</h6>
                          <input type="datetime-local" className={"input-profile"} name="created_at" value={ultima_vez} min={"1900-01-01T08:30"} max={"2099-06-30T16:30"}   disabled={true} required={true}/>
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Creado</h6>
                          <input type="datetime-local" className={"input-profile"} name="created_at" value={created_at} min={"1900-01-01T08:30"} max={"2099-06-30T16:30"}   disabled={true} required={true}/>
                        </div>
                      </div>

                      <div className="row-info">
                          <h5 className="text-modal-title">Informacion Escolar</h5>
                      </div>
                      <hr className="mt-0 mb-4"/>

                      <div className="row pt-1">
                        <div className="col-md-4 mb-3">
                          <h6>Nombre de la escuela</h6>
                          <textarea type="text" className={"input-profile"} name="lastName" value={this.props.data.nombre_escuela==null?"":this.props.data.nombre_escuela} disabled={true} 
                          style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Clave escolar</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.clave_escolar==null?"":this.props.data.clave_escolar} disabled={true} required={true}  />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Escolaridad</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.escolaridad==null?"":this.props.data.escolaridad} disabled={true} required={true}  />
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-md-4 mb-3">
                          <h6>Modalidad</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.modalidad==null?"":this.props.data.modalidad} disabled={true} required={true}  />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Grado</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.grado==null?"":this.props.data.grado} disabled={true} required={true}  />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Ultima calificacion</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.ultima_calificacion==null?"":this.props.data.ultima_calificacion} disabled={true} required={true}  />
                        </div>
                      </div>

                      <div className="row-info">
                          <h5 className="text-modal-title">Informacion Indigena</h5>
                      </div>
                      <hr className="mt-0 mb-4"/>

                      <div className="row pt-1">
                        <div className="col-md-4 mb-3">
                          <h6>Se considera</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.se_considera==null?"":this.props.data.se_considera} disabled={true} required={true}  />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Pueblo indigena</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.pueblo_indigena==null?"":this.props.data.pueblo_indigena} disabled={true} required={true}  />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Lengua indigena</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.lengua_indigena==null?"":this.props.data.lengua_indigena} disabled={true} required={true}  />
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-md-4 mb-3">
                          <h6>Nivel que habla</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.nivel_que_habla==null?"":this.props.data.nivel_que_habla} disabled={true} required={true}  />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Nivel que escribe</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.nivel_que_escribe==null?"":this.props.data.nivel_que_escribe} disabled={true} required={true}  />
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6>Nivel que pronuncia</h6>
                          <input type="text" className={"input-profile"} name="name" value={this.props.data.nivel_que_pronuncia==null?"":this.props.data.nivel_que_pronuncia} disabled={true} required={true}  />
                        </div>
                      </div>
                    
                      <>{
                        this.state.infoData.DataResponsibles&&this.state.infoData.DataResponsibles.map((value, i,) => (
                          
             
                            <div className="" key={i} >
                              <div className="row-info">
                                  <h5 className="text-modal-title">Responsable {i+1}</h5>
                              </div>
                              <hr className="mt-0 mb-4"/>

                              <div className="row pt-1">
                                <div className="col-md-4 mb-3">
                                  <h6>Parentesco del responsable</h6>
                                  <input type="text" className={"input-profile"} name="name" value={value.responsable_parentesco} disabled={true} required={true}  />
                                </div>
                                <div className="col-md-4 mb-3">
                                  <h6>Es_tutor</h6>
                                  <select name="sex" className={"input-profile"} value={value.responsable_es_tutor}  disabled={true} required={true}>
                                      <option hidden={true} value="">Select an option</option>
                                      <option value="0">NO </option>
                                      <option value="1">SI </option>
                                  </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                  <h6>Nombre del responsable_</h6>
                                  <input type="text" className={"input-profile"} name="name" value={value.responsable_nombre} disabled={true} required={true}  />
                                </div>
                              </div>
                              <div className="row pt-1">
                                <div className="col-md-4 mb-3">
                                  <h6>Apellido del responsable</h6>
                                  <input type="text" className={"input-profile"} name="name" value={value.responsable_apellido} disabled={true} required={true}  />
                                </div>
                                <div className="col-md-4 mb-3">
                                  <h6>CURP del responsable</h6>
                                  <input type="text" className={"input-profile"} name="name" value={value.responsable_curp} disabled={true} required={true}  />
                                </div>
                                <div className="col-md-4 mb-3">
                                  <h6>Sexo del responsable</h6>
                                  <select name="sex" className={"input-profile"} value={value.responsable_sexo}  disabled={true} required={true}>
                                      <option hidden={true} value="">Select an option</option>
                                      <option value="f">FEMENINO </option>
                                      <option value="m">MASCULINO </option>
                                      <option value="i">INDEFINIDO </option>
                                  </select>
                                </div>
                              </div>

                              <div className="row pt-1">
                                <div className="col-md-4 mb-3">
                                  <h6>Telefono del responsable</h6>
                                  <input type="text" className={"input-profile"} name="name" value={value.responsable_n_telefono} disabled={true} required={true}  />
                                </div>
                                <div className="col-md-4 mb-3">
                                  <h6>Entidad de nacimiento</h6>
                                  <input type="text" className={"input-profile"} name="name" value={value.responsable_entidad_nacimiento} disabled={true} required={true}  />
                                </div>
                                <div className="col-md-4 mb-3">
                                  <h6>Fecha de acimiento</h6>
                                  <input type="text" className={"input-profile"} name="name" value={value.responsable_fecha_nacimiento} disabled={true} required={true}  />
                                </div>
                              </div>
                            </div>
                          
                        ))
                      }</>
                     

                    
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
      
      ):(<></>)
    );
    
  }
}