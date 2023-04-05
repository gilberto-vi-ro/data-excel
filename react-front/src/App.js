import React, { Component, useRef } from "react";
import "./App.css";
import "./components/font-awesome/FontAwesome.js";

import c from "./const.json";
import Login from "./components/login/Login.js";
import Loader from "./components/loader/Loader.js";
import Home from "./components/home/Home.js";
import InfoResponsibles from "./components/info-responsibles/Responsibles.js";
import InfoSchool from "./components/info-school/InfoSchool.js";
import InfoPersonal from "./components/info-personal/InfoPersonal.js";
import InfoIndigenous from "./components/info-indigenous/InfoIndigenous";
import Profile from "./components/profile/Profile.js";
import Admin from "./components/admin/Admin.js";
import ToExcel from "./components/admin/users/ToExcel.js";
import Beneficiaries from "./components/admin/users/Beneficiaries.js";

import { BrowserRouter , Routes, Route, Navigate} from "react-router-dom";




// https://sweetalert2.github.io/

export default class App extends Component {
  
  constructor() {
    super();
    this.loadingRef = React.createRef("loading");
    this.state  = {
      activeLoader: false,
      isAdmin:false
    };
  }

  baseUrlApi = (route="") => {
    return c.baseUrlApi+route;
  }
  
  showLoading = () => {
    //  console.log(this.loadingRef)
    // this.loadingRef.current.style.display = 'block';
    this.setState({activeLoader: true});
  }

  hideLoading = () => {
    // console.log(this.loadingRef)
    // this.loadingRef.current.style = {"display": 'none'};
    this.setState({activeLoader: false});
  }

  render() {
    
    const login = localStorage.getItem("isLoggedIn");
    const isAdmin = localStorage.getItem("isAdmin");

    return (
      <>
        {/* <button onClick={this.showLoading}>show</button>
        <button onClick={() => this.hideLoading() }>hide</button> */}
        {/* <div ref = { this.loadingRef } className="loading"></div> */}
        <Loader show={this.state.activeLoader} />
        
        <BrowserRouter basename={c.baseRoute}>
            <Routes>
              
              <Route path="/login/" element={<Navigate to="/login/in/" />} ></Route>
              <Route path="/login//*" element={<Login  _parent={this} />}></Route>

              {login?
                (
                  <>
                    <Route exact path="/" element={<Navigate to={"/home"} />}></Route>
                    <Route path="/home//*" element={<Home _parent={this} /> } />
                    <Route  path="/info-responsables" element={<InfoResponsibles _parent={this} />}></Route>
                    <Route  path="/info-escolar" element={<InfoSchool _parent={this} />}></Route>
                    <Route  path="/info-personal" element={ <InfoPersonal _parent={this} /> }></Route>
                    <Route  path="/info-indigena" element={ <InfoIndigenous _parent={this} /> }></Route>
                    <Route  path="/perfil" element={ <Profile _parent={this} /> }></Route>
                  </>
                ):(
                  <Route exact path="/" element={<Navigate to={"/login/in/"} />}></Route>
                )
              }

              {isAdmin?
                (
                  <>
                  <Route exact path="/admin" element={<Navigate to={"/admin/beneficiarios"} />}></Route>
                  <Route  path="/admin//*"></Route>
                  <Route  path="admin/a-excel/" element={ <ToExcel _parent={this} />  }></Route>
                  <Route  path="admin/beneficiarios/" element={ <Beneficiaries _parent={this} />  }></Route>
                  <Route  path="admin/info-responsables/" element={ <InfoResponsibles _parent={this} />  }></Route>
                  <Route  path="admin/info-escolar/" element={ <InfoSchool _parent={this} />  }></Route>
                  <Route  path="admin/info-personal/" element={ <InfoPersonal _parent={this} />  }></Route>
                  <Route  path="admin/info-indigena/" element={ <InfoIndigenous _parent={this} />  }></Route>
                  <Route  path="admin/perfil/" element={ <Profile _parent={this} />  }></Route>
                  </>
                ):(<Route path="/admin//*" element={<Navigate to="/login/in/"/>} />)
              }
              <Route path="*" element={<Navigate to="/login/in/"/>}/>
            </Routes>
        </BrowserRouter>
      </>
    );
  }
}
