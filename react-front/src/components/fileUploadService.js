import axios from "axios";
import c from "../const.json";

class FileUploadService {

 http = ()=>{
   return axios.create({
        baseURL: c.baseUrlApi,
        headers: {
          // 'Access-Control-Allow-Origin': 'http://localhost:3000/',
          // 'Content-Type': 'application/json'
        },
        withCredentials: false
      })
 }   
  upload(route, file, onUploadProgress) {
    
    let formData = new FormData();

    formData.append("profile-img", file);

    return this.http().post(route, formData, {
      headers: {
      
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "Content-Type",
      },
      onUploadProgress,
    });
  }

  getFiles(route) {
    return this.http().get(route,{});
  }
}

export default new FileUploadService();