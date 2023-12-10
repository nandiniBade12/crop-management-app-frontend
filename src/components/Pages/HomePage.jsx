import React from 'react';

import '../../styles/Home.css';
import { Link, useNavigate } from 'react-router-dom';
// import Popup from 'reactjs-popup';
import Navbar from '../../layouts/NavbarHome';
import logo from '../../Images/logo2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function HomePage() {

  return (
    <>
      <Navbar />
      <div className='main-div' style={{fontSize: "x-large"}}>
        <img className='image1' src={logo} style={{width: "85px", height: "85px"}}/>
        <h1 className='heading1'>Welcome to AgroInvest</h1>
        <p className='para1'> AgroInvest is a platform that connects passionate investors with dedicated farmers. By leveraging the power of technology, we're transforming the way investments in agriculture are made. Whether you're an investor looking to support farmers or a farmer in need of investment, AgroInvest has got you covered.</p>
        <br/>
        {/* <div style={{background: 'linear-gradient(45deg, #ffcccb, #ffb6c9)', filter: 'blur(0.3px)'}}></div> */}
        <button id='login-btn'><Link to='/login' style={{color: "white"}}>Login <FontAwesomeIcon icon={faArrowRight} /> </Link></button>
        <p className='para1'>To explore more, please login to the platform</p>
        
      </div>
      
    </>
  );
}

export default HomePage;
