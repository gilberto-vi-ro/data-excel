
import c from "../../../const.json";
import Navbar from "../../navbar/Navbar.js";

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
      config:{},
      dataBeneficiaries: [],
      dataB: [],
      idBeneficiaries: null,
      activeModalDeleteBeneficiary : false,
     
    };

  }

  // https://codedamn.com/news/reactjs/useeffect-in-class-component
  componentDidMount() {// call on loaded Component
      this.getBeneficiaries();
  }
  
  getBeneficiaries = async (e) => {
    this._parent.showLoading();
    this.setState({ 
      config : {"distinct":"no","select":["*"]}
    });

    await axios.post(c.baseUrlApi+"admin-getAllUsers/",this.state.config).then((response) => {
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
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                      <thead style={{"backgroundColor":"var(--color2)","color":"var(--primary-color)"}}>
                        <tr>
                          <>{
                            filterDataBeneficiaries[0] &&  Object.keys(filterDataBeneficiaries[0]).map((key,i) =>(
                              <th key={key}>{key}</th>
                            ))
                          }</>
                        </tr>
                      </thead>
                      <tbody>
                        <>{
                          filterDataBeneficiaries && filterDataBeneficiaries.map((data,i) =>(
                            <tr key={i}>
                              {data &&  Object.values(data).map((value,i) =>(
                                <td key={i}>{value}</td>
                              ))}
                            </tr>
                          ))
                        }</>
                      </tbody>
                    </table>
                  </div>
            </div>
          </section>
        </div>
       
      </>
    );
  }
}