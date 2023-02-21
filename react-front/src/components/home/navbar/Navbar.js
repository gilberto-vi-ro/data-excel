import "./Navbar.css";
import React, { useState, ReactDOM, useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";
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
} from 'reactstrap';

function MyNavbar(args) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const divNav = useRef(null);

    const ActiveNavLink = () => {
      const location = useLocation();
      useEffect(() => {
        //console.log(divNav);
        if (divNav.current!== null) {
          
          const navLinks = divNav.current.querySelectorAll('.nav-item');
          let href = null;
          navLinks.forEach((link) => {
            href = link.querySelector(".nav-link").getAttribute("href");
          
            if(location.pathname.indexOf(href) !== -1)
              link.classList.add("active");
            console.log(link);
          });
        }
       });
       
    };

    ActiveNavLink();
    return (
      <div ref={divNav}>
        <Navbar {...args} expand={"md"} fixed={"top"} >
          <NavbarBrand href="/" className="ms-2">reactstrap</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar >
            <Nav className="ms-auto" navbar>
              <NavItem>
                <NavLink  href="/home">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu end={true}>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink  href="##">Simple Text</NavLink>
              </NavItem>
             
            </Nav>
            
          </Collapse>
        </Navbar>
      </div>
    );
}

export default MyNavbar;