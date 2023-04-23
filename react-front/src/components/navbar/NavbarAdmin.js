import "./Navbar.css";
import Logo from "../../img/logo/INPI.png";
import c from "../../constGlobal.ts";
import React, { useState, ReactDOM, useRef, useEffect } from 'react';
import { useLocation,Navigate,Link,useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';

function MyNavbar(args) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggle = () => setIsOpen(!isOpen);

    const divNav = useRef(null);

    const ActiveNavLink = () => {
      const location = useLocation();
      useEffect(() => {
        //console.log(divNav);
        
        if (divNav.current!== null) {
          const navLinks = divNav.current.querySelectorAll('.nav-item');
          removeActive(navLinks);
          // const idDropdownToggle= divNav.current.querySelector('#idDropdownToggle');
          
          // if( location.pathname.indexOf("/admin/info-responsables") !== -1 
          // || location.pathname.indexOf("/admin/info-escolar") !== -1 
          // || location.pathname.indexOf("/admin/info-personal") !== -1 
          // || location.pathname.indexOf("/admin/info-indigena") !== -1 )
          //   idDropdownToggle.classList.add("active");
          // else
          //   idDropdownToggle.classList.remove("active");

          let href = null;
          navLinks.forEach((link) => {
            href = link.querySelector(".nav-link").getAttribute("href");
      
            if((c.baseRoute + location.pathname) === href){
              link.classList.add("active"); return;
            }
              
          });

          function removeActive(navLinks){
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });
          }
        }
       });
       
    };

    ActiveNavLink();

    const onLogoutHandler = () => {
      localStorage.clear();
      navigate("/login");
    };
    
    
    return (
     
      <div ref={divNav}>
        <Navbar {...args} expand={"md"} fixed={"top"} >
          <NavbarBrand href={""+c.baseRoute+"/admin" }className="ms-2">
            <img src={Logo} alt="png"   className="img-logo"/>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} className="btn-toggler">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
          </NavbarToggler> 
          <Collapse isOpen={isOpen} navbar >
            <Nav className="ms-auto" navbar>
              <NavItem>
                  <Link to="/home" className="nav-link">INICIO</Link>
              </NavItem>
              <NavItem>
                  <Link to="/admin/a-excel" className="nav-link">A EXCEL</Link>
              </NavItem>
              <NavItem>
                  <Link to="/admin/beneficiarios" className="nav-link">BENEFICIARIOS</Link>
              </NavItem>
              {/* <NavItem> <NavLink href="##">algo</NavLink> </NavItem> */}
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle id="idDropdownToggle" nav caret >
                  DATOS
                </DropdownToggle>
                <DropdownMenu end={true}>
                  <DropdownItem><Link to="/admin/info-responsables">Responsables</Link></DropdownItem>
                  <DropdownItem><Link to="/admin/info-escolar">Escolar</Link></DropdownItem>
                  <DropdownItem><Link to="/admin/info-personal">Personal</Link></DropdownItem>
                  { <DropdownItem divider /> }
                  <DropdownItem><Link to="/admin/info-indigena">Indigena</Link></DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
              <NavItem>
                <Link to="/admin/perfil" className="nav-link">PERFIL</Link>
              </NavItem>
              <button className="btn btn-secondary btn-bg text-right" onClick={()=>onLogoutHandler()}>
                    SALIR
              </button>
             
            </Nav>
            
          </Collapse>
        </Navbar>
      </div>
    );
}

export default MyNavbar;