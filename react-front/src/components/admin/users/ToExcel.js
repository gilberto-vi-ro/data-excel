
import c from "../../../constGlobal.ts";
import Navbar from "../../navbar/Navbar.js";

import DeleteMasive from "./DeleteMasive.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, useEffect } from "react";
import axios from "axios";
import ToExcelFilter from "./ToExcelFilter";


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
      dataKeysBeneficiaries: [],
      dataB: [],
      idBeneficiaries: null,
      activeModalDeleteMasive : false,
      childconfigFilter: null,
     
    };

  }

  // https://codedamn.com/news/reactjs/useeffect-in-class-component
  componentDidMount() {// call on loaded Component
      this.getBeneficiaries();
  }
  
  getBeneficiaries = async (e) => {
    setTimeout(() => {
    
      this._parent.showLoading();
        axios.post(c.baseUrlApi+"admin-getAllUsers",this.state.childconfigFilter).then((response) => {
          // console.log(response.data.data);
          this._parent.hideLoading();
          if(response.data.status==="failed"){
            this.setState({ 
              dataBeneficiaries : []
            });
          }else{
            this.setState({ 
              dataBeneficiaries : response.data.data,
              dataKeysBeneficiaries: response.data.data[0]
            })
          }
        }).catch((error) => {
          //  console.log(error);
          this._parent.hideLoading();
          this.setState({msg: error.message});
        });
    }, 100);
  };

  handleChildStateChange = (childState=null) =>{
    this.setState({ childconfigFilter: childState });
  }

  modalDeleteMasive = (data=null) =>{
    this.setState({ 
      activeModalDeleteMasive: !this.state.activeModalDeleteMasive,
      msg: ""
    });
  }
  
  

  render() {
    return (
      
      <>
        <Navbar _parent={this} />
        <div className="body-container">
          <section className="">
            
            <div className='d-flex justify-content-center m-1'>
              <h5 className="color2 me-2">Beneficiarios</h5>
              <button type="button" className="btn btn-danger btn-circle"
                onClick={()=>this.modalDeleteMasive()}
                style={{"marginTop":"-2px"}}
                ><FontAwesomeIcon icon="fa-solid fa-trash-can" />
              </button>
            </div>
            <div className="container py-4">
                <ToExcelFilter _parent={this} onStateChange={this.handleChildStateChange} />
                <div className="table-responsive">
                    <table id="myTable" className="table table-striped table-bordered table-hover">
                      <thead style={{"backgroundColor":"var(--color2)","color":"var(--primary-color)"}}>
                        <tr>
                          <th>#</th>
                          <>{
                            this.state.dataKeysBeneficiaries &&  Object.keys(this.state.dataKeysBeneficiaries).map((key,i) =>(
                              <th key={key}>{key}</th>
                            ))
                          }</>
                        </tr>
                      </thead>
                      <tbody>
                       
                        <>{
                          this.state.dataBeneficiaries && this.state.dataBeneficiaries.map((data,i) =>(
                            <tr key={i+1}>
                              <td className="fw-bold">{i+1}</td>
                              {data &&  Object.values(data).map((value,i) =>(
                                <td className="text-nowrap" key={i}>{value}</td>
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
       
        <DeleteMasive _parent={this} data={this.state.dataBeneficiaries} show={this.state.activeModalDeleteMasive}/>
      </>
    );
  }
}