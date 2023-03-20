import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UploadService from "../fileUploadService";
import c from "../../const.json";
import UserDefault from "../../img/user/userDefault.png";


export default class UploadImages extends Component {
    constructor(props) {
        super(props);
        this.parent = props._parent;
        this.state = {
          currentFile: undefined,
          previewImage: props.data.img==null?UserDefault:c.baseUrlApiFile+props.data.img,
          progress: 0,
          classNameAlert:"",
          message: "",
          imageInfos: [],
        };
    }

    selectFile(event) {
        try{
            this.setState({
                currentFile: event.target.files[0],
                previewImage: URL.createObjectURL(event.target.files[0]),
                progress: 0,
                message: ""
            });
        }catch(e){
        }
        setTimeout(() => {
            this.upload();
        }, 500);
        
    }

    upload() {
        this.setState({
            progress: 0,
        });
    
        var data =  {file:this.state.currentFile,idUser:this.props.data.id}
        UploadService.upload("profile-updateImg",data, (event) => { 
            this.setState({
            progress: Math.round((100 * event.loaded) / event.total),
            });
        }).then((response) => {
                this.setState({
                    classNameAlert: 
                        response.data.status==="success"? "alert alert-success mt-1":"alert alert-danger mt-1",
                    message: response.data.message,
                });
                this.parent.updateLocalStorage();
                // console.log(response);
            })
            .catch((err) => {
                console.log(err);
            this.setState({
                progress: 0,
                classNameAlert: "alert alert-danger mt-1",
                message: "No se pudo Cargar la Imagen!",
                currentFile: undefined,
            });
        });

        setTimeout(() => {
            this.setState({ message: "",currentFile:undefined});
        }, 5000);
    }
    

    render() {
    const {
        currentFile,
        previewImage,
        progress,
        message,
        classNameAlert,
    } = this.state;

    return (

    <>
         
            <div>
                <label htmlFor="select-file">
                    <img src={previewImage} alt="Avatar" className="img-fluid rounded-circle my-4 img-profile"  />
                    <FontAwesomeIcon icon="fa-solid fa-camera" className="fa-camera" />
                </label>
            </div>
        
        

            <div className="row" hidden={true}>
                <label className="btn btn-default p-0" >
                    <input id="select-file" type="file" accept="image/*" onChange={(event)=>this.selectFile(event)} />
                </label>
            </div>

            {currentFile &&(
                <div className="progress my-1">
                <div
                    className="progress-bar progress-bar-info progress-bar-striped"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: progress + "%" }}
                >
                {progress}%
                </div>
                </div>
            )}

            {message && (
                <div className={classNameAlert} role="alert">
                {message}
                </div> 
            )}

        </>
    );
    }
}
        
