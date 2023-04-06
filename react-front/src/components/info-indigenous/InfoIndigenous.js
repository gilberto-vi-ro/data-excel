import "./InfoIndigenous.css";
import c from "../../const.json";
import Navbar from "../navbar/Navbar.js";
import logoIndigenous from "../../img/logo/logoIndigenous.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import axios from "axios";


//https://reactstrap.github.io/?path=/docs/components-navbar--props
export default class InfoIndigenous extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.state = {
      edit: false,
      hasIndigenousInfo: true,
      classNameAlert:"alert alert-danger mt-1",
      msg: "",
     
      formData: {
        idUser: this.userData.id_usuario,
        idIndigenousInfo: null,
        descent: "",
        indigenousTown: "null",
        indigenousLanguage: "null",
        levelThatSpeaking: "",
        levelThatWrites: "",
        levelThatPronounces: "",
      },
    };
    setTimeout(() => {
      this.getPersonalInfo();
    }, 500);

  }
  
  getPersonalInfo = (e) => {
    this._parent.showLoading();
    const idUser = this.userData.id_usuario;

    axios.get(c.baseUrlApi+"indigenousInfo-show/"+idUser)
      .then((response) => {
        // console.log(response);
        
        this._parent.hideLoading();
        if(response.data.status==="failed"){
          this.setState({ 
            hasIndigenousInfo: false,
          });
        }else{
          
          const { formData } = this.state;
          formData["idUser"] = response.data.data[0].id_usuario;
          formData["idIndigenousInfo"] = response.data.data[0].id_info_indigena;
          formData["descent"] = response.data.data[0].decendencia;
          formData["indigenousTown"] = response.data.data[0].pueblo_indigena;
          formData["indigenousLanguage"] = response.data.data[0].lengua_indigena;
          formData["levelThatSpeaking"] = 
              response.data.data[0].nivel_que_habla==null?"":response.data.data[0].nivel_que_habla;
          formData["levelThatWrites"] = 
              response.data.data[0].nivel_que_escribe==null?"":response.data.data[0].nivel_que_escribe;
          formData["levelThatPronounces"] =
              response.data.data[0].nivel_que_pronuncia==null?"":response.data.data[0].nivel_que_pronuncia;

          this.setState({ formData });
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
      url: c.baseUrlApi+(this.state.hasIndigenousInfo?"indigenousInfo-update":"indigenousInfo-create"),
      method: this.state.hasIndigenousInfo?"PUT":"POST",
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
                                <img src={logoIndigenous} alt="Avatar" className="img-fluid rounded-circle my-4 img-profile"  />
                            </label>
                          <h5>{this.state.formData.indigenousLanguage}</h5>
                          <p>{this.state.formData.descent}</p>
                        </div>
                      </div>
                      <div className="col-md-8 bg-color rounded-r">
                        <form className="card-body p-4  mytext-dark">
                          <div className="row-info">
                              <h5 className="">Informacion Indigena</h5>
                              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={()=>this.handlerBtnEdit()} style={{"cursor": "hand","fontSize": "25px"}}/>
                          </div>
                          <hr className="mt-0 mb-4"/>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Pueblo Indigena</h6>
                              <textarea type="text" 
                              className={classNameInput} name="indigenousTown" 
                              value={this.state.formData.indigenousTown} 
                              onChange={this.onChangehandler}
                              disabled={DisabledInput} 
                              style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
                              onKeyUp={this.toUpperCase}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <h6>Te consideras</h6>
                              <select name="descent" className={classNameInput} value={this.state.formData.descent} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                                  <option hidden={true} value="">Seleciona una opcion</option>
                                  <option value="INDIGENA">INDIGENA</option>
                                  <option value="AFROMEXICANO">AFROMEXICANO</option>
                                  <option value="OTRO">OTRO</option>
                              </select>
                            </div>
                          </div>

                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Lengua Indigena</h6>
                              <input type="text" className={classNameInput} name="indigenousLanguage"
                              value={this.state.formData.indigenousLanguage} 
                              onChange={this.onChangehandler} 
                              minLength={3} maxLength={20} required={true}  
                              disabled={DisabledInput} 
                              onKeyUp={this.toUpperCase} />
                            </div>
                            <div className="col-md-6 mb-3">
                              <h6>Nivel que habla</h6>
                              <select name="levelThatSpeaking" className={classNameInput} value={this.state.formData.levelThatSpeaking} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                                  <option hidden={true} value="">Seleciona una opcion</option>
                                  <option value="0">0% </option>
                                  <option value="10">10% </option>
                                  <option value="20">20%</option>
                                  <option value="30">30% </option>
                                  <option value="40">40% </option>
                                  <option value="50">50%</option>
                                  <option value="60">60% </option>
                                  <option value="70">70%</option>
                                  <option value="80">80% </option>
                                  <option value="90">90% </option>
                                  <option value="100">100%</option>
                              </select>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3" >
                              <h6>Nivel que escribe</h6>
                              <select name="levelThatWrites" className={classNameInput} value={this.state.formData.levelThatWrites} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                              <option hidden={true} value="">Seleciona una opcion</option>
                                  <option value="0">0% </option>
                                  <option value="10">10% </option>
                                  <option value="20">20%</option>
                                  <option value="30">30% </option>
                                  <option value="40">40% </option>
                                  <option value="50">50%</option>
                                  <option value="60">60% </option>
                                  <option value="70">70%</option>
                                  <option value="80">80% </option>
                                  <option value="90">90% </option>
                                  <option value="100">100%</option>
                              </select>
                            </div>
                            <div className="col-md-6 mb-3" >
                              <h6>Nivel que pronuncia</h6>
                              <select name="levelThatPronounces" className={classNameInput} value={this.state.formData.levelThatPronounces} onChange={this.onChangehandler} disabled={DisabledInput} required={true}>
                              <option hidden={true} value="">Seleciona una opcion</option>
                                  <option value="0">0% </option>
                                  <option value="10">10% </option>
                                  <option value="20">20%</option>
                                  <option value="30">30% </option>
                                  <option value="40">40% </option>
                                  <option value="50">50%</option>
                                  <option value="60">60% </option>
                                  <option value="70">70%</option>
                                  <option value="80">80% </option>
                                  <option value="90">90% </option>
                                  <option value="100">100%</option>
                              </select>
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