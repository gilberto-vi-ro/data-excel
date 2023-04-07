
import c from "../../../constGlobal.ts";
import Navbar from "../../navbar/Navbar.js";
import InfoBeneficiary from "./InfoBeneficiary.js";
import EditBeneficiary from "./EditBeneficiary";
import DeleteBeneficiary from "./DeleteBeneficiary";
import SearchBar from './SearchBar';

import UserDefault from "../../../img/user/userDefault.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, useEffect } from "react";
import axios from "axios";


export default class Beneficiaries extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
 
    this.userData = JSON.parse(localStorage.getItem("userData"));
    
    this.state = {
      searchQuery: '',
      classNameAlert:"alert alert-danger mt-1",
      msg: "",
      dataBeneficiaries: [],
      dataB: [],
      idBeneficiaries: null,
      activeModalDeleteBeneficiary : false,
      activeModalInfoBeneficiary: false,
      activeModalEditBeneficiary: false
    };

  }

  // https://codedamn.com/news/reactjs/useeffect-in-class-component
  componentDidMount() {// call on loaded Component
      this.getBeneficiaries();
  }
  
  getBeneficiaries = async (e) => {
    this._parent.showLoading();
    const idUser = this.userData.id_usuario;

    await axios.post(c.baseUrlApi+"admin-getAllUsers").then((response) => {
        //  console.log(response.data);
        this._parent.hideLoading();
        if(response.data.status==="failed"){
          this.setState({ 
            dataBeneficiaries : []
          });
        }else{
          this.setState({ 
            dataBeneficiaries : response.data.data,
          })
        }
      }).catch((error) => {
        //  console.log(error);
        this._parent.hideLoading();
        this.setState({msg: error.message});
      });

  };


  modalDeleteBeneficiary = (data=null) =>{
    this.setState({ 
      activeModalDeleteBeneficiary: !this.state.activeModalDeleteBeneficiary,
      dataB: data,
      msg: ""
    });
  }
  modalInfoBeneficiary = (data=null) =>{
    this.setState({ 
      activeModalInfoBeneficiary: !this.state.activeModalInfoBeneficiary,
      dataB: data,
      msg: "",
    });
  }

  modalEditBeneficiary = (data=null) =>{
    this.setState({ 
      activeModalEditBeneficiary: !this.state.activeModalEditBeneficiary,
      dataB: data,
      msg: "",
    });
  }

  handleSearchQueryChange = (searchQuery) => {
    this.setState({
      searchQuery: searchQuery
    });
  
  }
  
  render() {
    const { searchQuery , dataBeneficiaries} = this.state;
    const filterDataBeneficiaries = dataBeneficiaries.filter((item) => {
      return (
          item.nombre.toLowerCase().includes(searchQuery.toLowerCase())||
          item.apellido.toLowerCase().includes(searchQuery.toLowerCase()) 
          // item.modalidad!=null?item.modalidad.toLowerCase().includes(searchQuery.toLowerCase()):""
      );
    });

    return (

      <>
        <Navbar _parent={this} />
        <div className="body-container">
          <section className="">
            <h5 className="text-center color2">Beneficiarios</h5>
            <SearchBar _parent={this} />
            <div className="container py-4">
                <div className="row g-4 d-flex justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3">
                {
                  filterDataBeneficiaries && filterDataBeneficiaries.map((data,i) =>(
                    <div key={i}  style={{"width": "14rem", "margin":"auto"}}>
                      <div className="card card-bg" style={{ "margin":"5px"}}>
                        <div className="rounded-circle overflow-hidden img-bordered">
                          <img src={data.img==null?UserDefault:c.baseUrlApiFile+data.img} 
                          className="card-img-top img-cover" alt="Avatar"/>
                        </div>
                        <div className="card-body" style={{"padding": "10px"}}>
                          <h5 className="card-title txt-color">{data.modalidad}</h5>
                          <p className="card-text txt-color">{data.apellido+" "+data.nombre}</p>
                          <div className="d-flex justify-content-between">
                            <button className="btn btn-primary" 
                              onClick={()=>this.modalInfoBeneficiary(data)}>Ver mas
                            </button>
                            <button type="button" className="btn btn-primary btn-circle"
                              onClick={()=>this.modalEditBeneficiary(data)}
                              ><FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                            </button>
                            <button type="button" className="btn btn-danger btn-circle"
                              onClick={()=>this.modalDeleteBeneficiary(data)}
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
       
        <EditBeneficiary _parent={this} data={this.state.dataB} show={this.state.activeModalEditBeneficiary}/>
        <InfoBeneficiary _parent={this} data={this.state.dataB} show={this.state.activeModalInfoBeneficiary}/>
        <DeleteBeneficiary _parent={this} data={this.state.dataB} show={this.state.activeModalDeleteBeneficiary}/>
      </>
    );
  }
}