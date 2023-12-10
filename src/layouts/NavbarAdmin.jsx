import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/logo2.jpg';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserShield, faSignOutAlt, faHome, faSmile, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

function NavbarAdmin() {

  const id = localStorage.getItem('id');

  // const obj = localStorage.getItem("userInfo");
  // const { firstName } = JSON.parse(obj);
  const name = "Admin";

  const logoutHandle = ()=>{
    localStorage.removeItem('userInfo');
    localStorage.removeItem('id');
    console.log("Logged out...");
};

  return (
    <nav className="navbar">
      <div className="navbar__logo" style={{display: "flex", flexDirection: "row"}}>
        <div style={{marginRight: "10px"}}><img src= {logo} alt="" style={{width: "30px", height: "30px" ,borderRadius: "8px"}}/></div>
        <div style={{fontFamily:"initial", padding: "3px"}}><b>CROP MANAGEMENT SYSTEM</b></div></div>
      <div className='navbar_account_holder'>
        <div>Welcome, {name} <FontAwesomeIcon icon={faSmile}color="white"/></div>
      </div>
      <div className="navbar__menu">
        <div className="navbar__menu-item navbar__menu-item--active">
        <FontAwesomeIcon icon={faHome} className="icon"/>
          <Link to="/">HOME</Link>
        </div>
        <div className="navbar__menu-item">
        <FontAwesomeIcon icon={faUser} />
          <Link to="/users">USERS</Link>
        </div>
        <div className="navbar__menu-item">
        <FontAwesomeIcon icon={faShoppingBag} className="icon" />
          <Link to="/orders">ORDERS</Link>
        </div>
        <div className="navbar__menu-item">
        <FontAwesomeIcon icon={faUserShield} className="icon"/>
          <Link to=  {`/updateadmin/${id}`}>PROFILE</Link>
        </div>
        <div className="navbar__menu-item">
         <button onClick={logoutHandle} style={{border: "none", maxBlockSize: "100px"}}> <a href='/' style={{color:"black"}}>Logout <FontAwesomeIcon icon={faSignOutAlt} className="icon"/></a> </button>
        </div>
      </div>
      
    </nav>
  );
}

export default NavbarAdmin;
