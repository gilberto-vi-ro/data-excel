import axios from "axios";
import c from "../const.json";

class FileUploadService {

 http = ()=>{
   return axios.create({
        baseURL: c.baseUrlApi,
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: false
      })
 }   
  upload(route, data, onUploadProgress) {
    
    let formData = new FormData();

    formData.append("profile-img", data.file);
    formData.append("idUser", data.idUser);

    return this.http().post(route, formData, {
      headers: {
      
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        // "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        // "Access-Control-Allow-Credentials": "true",
      },
      onUploadProgress,
    });

  }

  getFiles(route) {
    return this.http().get(route,{});
  }
}

export default new FileUploadService();