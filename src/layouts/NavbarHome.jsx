import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../Images/logo2.jpg';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function NavbarHome() {
  return (
    <nav className="navbar">
      <div className="navbar__logo" style={{display: "flex", flexDirection: "row"}}>
        {/* <div style={{marginRight: "10px"}}><img src= {logo} style={{width: "30px", height: "30px" ,borderRadius: "8px"}}/></div> */}
        INDIAN AGRICULTURE TECHNOLOGY</div>
      <div className="navbar__menu">
        <div className="navbar__menu-item navbar__menu-item--active">
        <FontAwesomeIcon icon={faHome} className="icon"/>
          <Link to="/">  Home</Link>
        </div>
      </div>
      
    </nav>
  );
}

export default NavbarHome;
