import "./Responsibles.css";
import c from "../../const.json";

import Navbar from "../home/navbar/Navbar.js";
import InfoResponsibles from "./InfoResponsibles.js";
import AddResponsibles from "./AddResponsibles.js";
import DeleteResponsibles from "./DeleteResponsibles.js";

import UserUndefined from "../../img/user/userDefault.png";
import UserMale from "../../img/user/male.png";
import UserFemale from "../../img/user/female.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, useEffect } from "react";
import axios from "axios";

export default class Responsibles extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
 
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.state = {
      classNameAlert:"alert alert-danger mt-1",
      msg: "",
      dataResponsibles: [],
      dataR: [],
      idResponsibles: null,
      activeModalDeleteResponsible : false,
      activeModalInfoResponsible: false,
    };

  }

  // https://codedamn.com/news/reactjs/useeffect-in-class-component
  componentDidMount() {// call on loaded Component
      this.getResponsibles();
  }
  
  getResponsibles = async (e) => {
    this._parent.showLoading();
    const idUser = this.userData.id_usuario;

    await axios.get(c.baseUrlApi+"responsibles-show/"+idUser).then((response) => {
        // console.log(response.data);
        this._parent.hideLoading();
        if(response.data.status==="failed"){
          this.setState({ 
            dataResponsibles : []
          });
        }else{
          this.setState({ 
            dataResponsibles : response.data.data,
          });
        }
      }).catch((error) => {
        //  console.log(error);
        this._parent.hideLoading();
        this.setState({msg: error.message});
      });

  };


  modalDeleteResponsibles = (id) =>{
    this.setState({ 
      activeModalDeleteResponsible: !this.state.activeModalDeleteResponsible,
      msg: "",
      idResponsibles: id
    });
  }
  modalInfoResponsibles = (data=null) =>{
    this.setState({ 
      activeModalInfoResponsible: !this.state.activeModalInfoResponsible,
      dataR: data,
      msg: "",
    });
  }
  
  render() {
   

    return (

      <>
        <Navbar />
        <div className="body-container">
          <section className="">
            <h5 className="text-center color2">Datos de tus Responsables</h5>
            
            <AddResponsibles _parent={this} idUser={this.userData.id_usuario} />
           
            <div className="container py-4">
                <div className="row g-4 d-flex justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3">
                {
                  this.state.dataResponsibles && this.state.dataResponsibles.map((data,i) =>(
                    
                    <div key={i}  style={{"width": "14rem", "margin":"auto"}}>
                      <div className="card card-bg" style={{ "margin":"5px"}}>
                        <div className="rounded-circle overflow-hidden img-bordered">
                          <h5 className="card-title-img">{data.parentesco}</h5>
                          <img src={data.sexo==="i"?UserUndefined:data.sexo==="m"?UserMale:UserFemale} 
                          className="card-img-top img-cover" alt="Avatar"/>
                        </div>
                        <div className="card-body" style={{"padding": "10px"}}>
                          <p className="card-text txt-color">{data.apellido+" "+data.nombre}</p>
                          <div className="d-flex justify-content-between">
                            <button className="btn btn-primary" 
                              onClick={()=>this.modalInfoResponsibles(data)}>Ver mas
                            </button>
                            <button type="button" className="btn btn-danger btn-circle"
                              onClick={()=>this.modalDeleteResponsibles(data.id_responsable)}
                              ><FontAwesomeIcon icon="fa-solid fa-trash-can" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))
                }
                
                </div>
              </div>
          </section>
        </div>
       
        <InfoResponsibles _parent={this} data={this.state.dataR} show={this.state.activeModalInfoResponsible}/>
        <DeleteResponsibles _parent={this} />
      </>
    );
    
    
  }
}