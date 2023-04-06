
import c from "../../../const.json";
import relationshipJson from "../../relationship.json";
import federativeEntitiesJson from "../../federativeEntities.json";

import UserDefault from "../../../img/user/userDefault.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import axios from "axios";

export default class EditBeneficiary extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
    this.pwdRef = React.createRef("pwdRef");
    this.confirmPwdRef = React.createRef("confirmPwdRef");
   
    this.state = {
      edit: false,
      classNameAlert:"alert alert-danger mt-1",
      showConfirmPwd: false,
      msg: "",
      formData: {
        id: null,
        img: "",
        name: "",
        lastName: "",
        email: "",
        pwd: "default",
        confirmPwd: "default",
        lastTime: "",
        created_at: "",
        requestStatus: "",
        receptionDate: "",
        description: "",
      },
    };
    
  }
  // https://codedamn.com/news/reactjs/useeffect-in-class-component
  // componentDidMount(prevProps, prevState){}
  componentDidUpdate(prevProps, prevState,snapshot){
    setTimeout(() => {
      if(this.props.show===true)
        if (this.props.data.id_usuario !== this.state.formData.id)
          this.getDataBeneficiary();
      
    }, 500);
  }
  
  getDataBeneficiary = (e) => {
    
    const { formData } = this.state;
    formData["id"] = this.props.data.id_usuario==null?"":this.props.data.id_usuario;
    formData["img"] = this.props.data.img==null?UserDefault:c.baseUrlApiFile+this.props.data.img;
    formData["name"] = this.props.data.nombre==null?"":this.props.data.nombre;
    formData["lastName"] = this.props.data.apellido==null?"":this.props.data.apellido;
    formData["email"] = this.props.data.email==null?"":this.props.data.email;
    formData["lastTime"] = this.props.data.ultima_vez==null?"":this.props.data.ultima_vez.slice(0, 16);
    formData["created_at"] = this.props.data.created_at==null?"":this.props.data.created_at.slice(0, 16);
    formData["requestStatus"] = this.props.data.estado_de_solicitud==null?"":this.props.data.estado_de_solicitud;
    formData["receptionDate"] = 
          this.props.data.fecha_de_recepcion==null?"":this.props.data.fecha_de_recepcion.slice(0, 16);
    formData["description"] = this.props.data.descripcion==null?"":this.props.data.descripcion;

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

  closeEditBeneficiary = (e) => {
    this.setState({
      edit : !this.state.edit,
      msg: ""
    })
    this._parent.modalEditBeneficiary();
  };

  verifyPassword = ()=>{
    if (this.state.pwd !== this.state.confirmPwd){
      this.pwdRef.current.style.border = '1px solid red';
      this.confirmPwdRef.current.style.border =  '1px solid red';
      this.setState({ 
        classNameAlert: "alert alert-danger mt-1",
        msg: "Passwords do not match",
      });
      return false;
    }else{
      this.pwdRef.current.style = null;
      this.confirmPwdRef.current.style = null;
      this.setState({ msg: ""});
    }
    return true;
  }

  showConfirmPwd = () => {
    const { formData } = this.state;
    formData["pwd"]="";
    formData["confirmPwd"]="";

    if(!this.state.showConfirmPwd){
      this.setState({
        showConfirmPwd : true,
        formData
      });
    }
  }

  updateBeneficiary = (e) => {
    e.preventDefault();//evitar que recargue el form
    this.setState({ msg: ""});
    this.setState({ isLoading: true });
    this._parent._parent.showLoading();

    const config = {
      url: c.baseUrlApi+"admin-updateBeneficiary",
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
          this._parent.getBeneficiaries();

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
    var HideConfirmPwd = this.state.edit&&this.state.showConfirmPwd ? false : true;

    const {
      msg,
      classNameAlert,
    } = this.state;


    return (
      <>
        <div className="modal" style={this.props.show?{"display":"block"}:{"display":"none"}}>
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col  col-lg-6 mb-4 mb-lg-0">
                  <div className="card mb-3" style={{"borderRadius": "1rem","border": "none"}}>
                    <div className="row g-0">
                      <div className="col-md-4 gradient-custom text-center mytext-light rounded-l">
                        <label htmlFor="select-file">
                            <img src={this.state.formData.img} alt="Avatar" className="img-fluid rounded-circle my-4 img-profile"  />
                        </label>
                        <h5>{this.state.formData.name}</h5>
                        <p>{this.state.formData.lastName}</p>
                      </div>
                      <div className="col-md-8 bg-color rounded-r">
                        <div className="card-body p-4  mytext-dark">
                          <div className="row-info">
                            <h5 className="">Informacion</h5>
                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={()=>this.handlerBtnEdit()} style={{"cursor": "hand","fontSize": "25px"}}/>
                            <button type="button" className="btn btn-danger btn-circle"
                              style={{"marginTop":"-4px","marginRight":"-10px"}}
                              onClick={()=>this.closeEditBeneficiary()}
                              ><FontAwesomeIcon icon="fa-solid fa-xmark" />
                            </button>
                          </div>
                          <hr className="mt-0 mb-4"/>
                          <div className="row pt-1" hidden={HideComponents}>
                            <div className="col-md-6 mb-3">
                              <h6>Nombre</h6>
                              <input className={classNameInput} name="name" value={this.state.formData.name} onChange={this.onChangehandler} onKeyUp={this.toUpperCase} disabled={DisabledInput}/>
                            </div>
                            <div className="col-md-6 mb-3" >
                              <h6>Apellido</h6>
                              <input className={classNameInput} name="lastName" value={this.state.formData.lastName} onChange={this.onChangehandler} onKeyUp={this.toUpperCase} disabled={DisabledInput}/>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Email</h6>
                              <input className={"input-profile"} name="email" value={this.state.formData.email} onChange={this.onChangehandler} disabled={true}/>
                            </div>
                            <div className="col-md-6 mb-3">
                              <h6>Última vez</h6>
                              <input className={"input-profile"} name="lastTime" value={this.state.formData.lastTime} onChange={this.onChangehandler} disabled={true}/>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Contraseña</h6>
                              <input ref={this.pwdRef} type="password" className={classNameInput} name="pwd" value={this.state.formData.pwd} onChange={this.onChangehandler} disabled={DisabledInput} 
                              onKeyUp={()=>this.verifyPassword()} 
                              onFocus={()=>this.showConfirmPwd()}
                              />
                            </div>
                            <div className="col-md-6 mb-3" hidden={HideConfirmPwd}>
                              <h6>Confirmar Contraseña</h6>
                              <input ref={this.confirmPwdRef} type="password" className={classNameInput} name="confirmPwd" value={this.state.formData.confirmPwd} onChange={this.onChangehandler} disabled={DisabledInput}
                              onKeyUp={()=>this.verifyPassword()} 
                              />
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Descripcion</h6>
                              <textarea type="text" className={classNameInput} name="description" value={this.state.formData.description} onChange={this.onChangehandler} disabled={DisabledInput} 
                              style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <h6>Fecha de recepcion</h6>
                              <input type="date" className={classNameInput} name="receptionDate" value={this.state.formData.receptionDate} min={"1900-01-01T08:30"} max={"2099-06-30T16:30"}  onChange={this.onChangehandler} disabled={DisabledInput} required={true}/>
                            </div>
                          </div>

                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Estado de solicitud</h6>
                              <select name="requestStatus" className={classNameInput} value={this.state.formData.requestStatus} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                                <option hidden={true} value="">Seleciona una opcion</option>
                                <option value="ACEPTADO">ACEPTADO</option>
                                <option value="RECHAZADO">RECHAZADO</option>
                                <option value="PENDIENTE">PENDIENTE</option>
                                <option value="OTRO">OTRO</option>
                              </select>
                            </div>
                            <div className="col-md-6 mb-3">
                              <h6>Se registro</h6>
                              <input type="datetime-local" className={"input-profile"} name="created_at" value={this.state.formData.created_at} min={"1900-01-01T08:30"} max={"2099-06-30T16:30"}  onChange={this.onChangehandler} disabled={true} required={true}/>
                            </div>
                          </div>
                          <button className="text-center btn btn-profile w-100" onClick={this.updateBeneficiary} hidden={HideComponents}>Guardar</button>
                          {msg && (
                              <div className={classNameAlert} role="alert">
                              {msg}
                              </div> 
                          )}
                        </div>
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