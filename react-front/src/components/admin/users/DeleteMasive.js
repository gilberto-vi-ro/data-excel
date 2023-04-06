import c from "../../../const.json";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import axios from "axios";

export default class DeleteMasive extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
 
    this.state = {
      classNameAlert:"alert alert-danger mt-1",
      msg: "",
    };

  }

  deleteMasive = () => {
    this.setState({ msg: ""});
    this._parent._parent.showLoading();
  
    const config = {
      url: c.baseUrlApi+"admin-deleteMasive",
      method: "DELETE",
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', },
      data: JSON.stringify({data:this.props.data}),
    };

    axios(config).then((response) => {
        // console.log(response.data.data);
        this._parent._parent.hideLoading();
        this.setState({ 
          classNameAlert: 
                        response.data.status==="success"? "alert alert-success mt-1":"alert alert-danger mt-1",
          msg: response.data.message,
        });

        if(response.data.status==="success"){
          this._parent.modalDeleteMasive();
          this._parent.getBeneficiaries();
        }
        
        
      }).catch((error) => {
        this._parent._parent.hideLoading();
        this.setState({ msg: error.message});
      });

      setTimeout(() => {
        this.setState({ msg: "" });
      }, 4000);
  };

  
  render() {
   

    return (
      this._parent.state.activeModalDeleteMasive?(
        <>
          <div className="modal" style={this._parent.state.activeModalDeleteMasive?{"display":"block"}:{"display":"none"}}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Advertencia</h5>
                  <button type="button" className="btn-close" onClick={this._parent.modalDeleteMasive}></button>
                </div>
                <div className="modal-body">
                  <p>Esta seguro de eliminar a todos los datos que se muestran en pantalla?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={this._parent.modalDeleteMasive}>No</button>
                  <button type="button" className="btn btn-danger" onClick={this.deleteMasive}>Si</button>
                </div>
                {this.state.msg && (
                      <div className={this.state.classNameAlert} role="alert">
                      {this.state.msg}
                      </div> 
                  )}
              </div>
            </div>
          </div>
        </>
      ):(<></>)
    );
    
    
  }
}