
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
      dataBeneficiaries: [],
      dataB: [],
      idBeneficiaries: null,
      activeModalDeleteBeneficiary : false,

      configFilter : {
        config:{
          select:["*"],
          distinct:true,
          where1:{column:"",operator:"",value:""},
          where2:{column:"",operator:"",value:""}
        }
      }
     
    };

  }

  // https://codedamn.com/news/reactjs/useeffect-in-class-component
  componentDidMount() {// call on loaded Component
      this.getBeneficiaries();
  }
  
  getBeneficiaries = async (e) => {
    setTimeout(() => {
      this._parent.showLoading();
        axios.post(c.baseUrlApi+"admin-getAllUsers/",this.state.configFilter).then((response) => {
          // console.log(response.data.data);
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
    }, 100);
  };


  modalDeleteBeneficiary = (data=null) =>{
    this.setState({ 
      activeModalDeleteBeneficiary: !this.state.activeModalDeleteBeneficiary,
      dataB: data,
      msg: ""
    });
  }
  
  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    
    const { configFilter } = this.state;
    if (name.indexOf("where") !== -1){
      let where = e.target.dataset.val;
      configFilter["config"][name][where] = value;
    }else if(e.target.type=="checkbox"){
      value = e.target.checked;
      configFilter["config"][name] = value;
    }
    else if(name=="select"){
      configFilter["config"][name] = value.split(',');
    }
    else{
      configFilter["config"][name] = value;
    }
    this.setState(configFilter);
  };


  render() {
   
    const { arrayValue } = this.props;
    return (
      
      <>
        <Navbar _parent={this} />
        <div className="body-container">
          <section className="">
            <h5 className="text-center color2">Beneficiarios</h5>
            <label htmlFor="distinct" className="text-center">Distinct</label>
            <input id="distinct" type="checkbox" name="distinct" onChange={this.onChangehandler} checked={this.state.configFilter.config.distinct} onClick={this.getBeneficiaries}/>
            <div className='d-flex justify-content-center m-1 p-1'>
              <select name="where1" data-val="column" className={"bordered"} value={this.state.configFilter.config.where1.column} onChange={this.onChangehandler} >
                <option value="">Default</option>
                <option value="apellido">apellido</option>
                <option value="nombre">nombre</option>
              </select>
              <select name="where1" data-val="operator" className={"bordered"} value={this.state.configFilter.config.where1.operator} onChange={this.onChangehandler} >
                <option value="">Default</option>
                <option value="=">=</option>
                <option value="!=">!=</option>
                <option value="like">like</option>
                <option value="<">{"<"}</option>
                <option value=">">{">"}</option>
                <option value=">=">{">="}</option>
                <option value="<=">{"<="}</option>
              </select>
              <input type="text" name="where1" data-val="value" className="bordered" value={this.state.configFilter.config.where1.value} onChange={this.onChangehandler} />
              <button className='btn btn-success btn-sm' onClick={this.getBeneficiaries}>Buscar</button>

              <select name="where2" data-val="column" className={"bordered"} value={this.state.configFilter.config.where2.column} onChange={this.onChangehandler} >
                <option value="">Default</option>
                <option value="apellido">apellido</option>
                <option value="nombre">nombre</option>
              </select>
              <select name="where2" data-val="operator" className={"bordered"} value={this.state.configFilter.config.where2.operator} onChange={this.onChangehandler} >
                <option value="">Default</option>
                <option value="=">=</option>
                <option value="!=">!=</option>
                <option value="like">like</option>
                <option value="<">{"<"}</option>
                <option value=">">{">"}</option>
                <option value=">=">{">="}</option>
                <option value="<=">{"<="}</option>
              </select>
              <input type="text" name="where2" data-val="value" className="bordered" value={this.state.configFilter.config.where2.value} onChange={this.onChangehandler} />
              <button className='btn btn-success btn-sm' onClick={this.getBeneficiaries}>Buscar</button>
            </div>
            
            <div className="container py-4">
                <div className="table-responsive">
                    <div className='d-flex justify-content-center m-1'>
                        <textarea type="text" className={"bordered"} name="select" value={this.state.configFilter.config.select.join(",")}
                        style={{minHeight:"37px", minWidth:"100%", height:"37px", maxHeight:"300px"}}
                        onChange={this.onChangehandler}
                        />
                    </div>
                    <table className="table table-striped table-bordered table-hover">
                      <thead style={{"backgroundColor":"var(--color2)","color":"var(--primary-color)"}}>
                        <tr>
                          <th>#</th>
                          <>{
                            this.state.dataBeneficiaries[0] &&  Object.keys(this.state.dataBeneficiaries[0]).map((key,i) =>(
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
       
      </>
    );
  }
}