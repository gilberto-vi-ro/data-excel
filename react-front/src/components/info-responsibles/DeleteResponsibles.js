import "./Responsibles.css";
import c from "../../const.json";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import axios from "axios";

export default class DeleteResponsibles extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
 
    this.state = {
      classNameAlert:"alert alert-danger mt-1",
      msg: "",
    };

  }

  deleteResponsibles = () => {
    this.setState({ msg: ""});
    this._parent._parent.showLoading();
  
    const config = {
      url: c.baseUrlApi+"responsibles-delete/"+this._parent.state.idResponsibles,
      method: "DELETE",
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', },
      data: JSON.stringify(this.state.formData),
    };

    axios(config).then((response) => {
        this._parent._parent.hideLoading();
        this.setState({ 
          classNameAlert: 
                        response.data.status==="success"? "alert alert-success mt-1":"alert alert-danger mt-1",
          msg: response.data.message,
        });

        if(response.data.status==="success"){
          this._parent.modalDeleteResponsibles();
        }
        this._parent.getResponsibles();
        
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

      <>
        <div className="modal" style={this._parent.state.activeModalDeleteResponsible?{"display":"block"}:{"display":"none"}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Advertencia</h5>
                <button type="button" className="btn-close" onClick={this._parent.modalDeleteResponsibles}></button>
              </div>
              <div className="modal-body">
                <p>Esta seguro de eliminar?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this._parent.modalDeleteResponsibles}>No</button>
                <button type="button" className="btn btn-danger" onClick={this.deleteResponsibles}>Si</button>
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
    );
    
    
  }
}