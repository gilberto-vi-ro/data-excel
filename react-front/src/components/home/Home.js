import React, { Component } from "react";
import c from "../../const.json";

import axios from "axios";
import Navbar from "../navbar/Navbar.js";
import "./Home.css";

//https://reactstrap.github.io/?path=/docs/components-navbar--props
export default class Home extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.state = {
      redirect: false,
      
      dataStep: [],
      errMsg: "",
    };
  }

  componentDidMount() {// call on loaded Component
    this.getResponsibles();
  } 

  getResponsibles = async (e) => {
    this._parent.showLoading();
    const idUser = this.userData.id_usuario;

    await axios.get(c.baseUrlApi+"profile-step/"+idUser).then((response) => {
       
      this._parent.hideLoading();
      if(response.data.status==="failed"){
        this.setState({ 
          dataStep : []
        });
      }else{
        this.setState({ 
          dataStep : response.data.data,
        });
      }
    }).catch((error) => {
      //  console.log(error);
      this._parent.hideLoading();
      this.setState({msg: error.message});
    });

  };

  
  render() {
    const user = this.state.data;
    
    return (

      <>
        <Navbar _parent={this} />
        <div className="body-container">
            <div className="step-progress">
              <div className={this.state.dataStep.datos_personales?"step activated":"step"}>
                <span className="step-circle">1</span>
                <span className="step-title">Datos personal</span>
              </div>
              <div className={this.state.dataStep.info_escolar?"step activated":"step"}>
                <span className="step-circle">2</span>
                <span className="step-title">Datos escolar</span>
              </div>
              <div className={this.state.dataStep.responsables?"step activated":"step"}>
                <span className="step-circle">3</span>
                <span className="step-title">Responsables</span>
              </div>
              <div className={this.state.dataStep.info_indigena?"step activated":"step"}>
                <span className="step-circle">4</span>
                <span className="step-title">Datos Indigena</span>
              </div>
            </div>
        </div>
      </>
    );
    
    
  }
}