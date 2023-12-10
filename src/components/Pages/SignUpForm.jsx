import React, { useState } from "react";
import Navbar from "../../layouts/NavbarHome";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../../styles/SignUp.css";

function SignUpForm() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    userPassword: '',
    email: '',
    phoneNumber: '',
    address: {
      buildingNumber: '',
      area: '',
      city: '',
      pincode: '',
      state: '',
    },
    role: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
     if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length === 0) {
      try {
        
        axios.post('http://localhost:8081/users/signUp',formData);
        console.log(formData);
        // alert("Registered Successfully");
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const validateInputs = () => {
    const errors = {};
    const onlyDigits = /^\d{6}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,10}$/;
    const onlyAlphabets = /^[a-zA-Z\s]*$/;

    if (!onlyAlphabets.test(formData.firstName)) {
      errors.firstName = "Name can only have alphabets";
    }
    if (!onlyAlphabets.test(formData.lastName)) {
      errors.lastName = "Name can only have alphabets";
    }
    if (!isValidEmail(formData.email)) {
        errors.email = "Invalid Email";
      } 
    if(!(formData.email === formData.userName)){
      errors.userName = "Email and userName does not match"
    }
    if(!passwordPattern.test(formData.userPassword)){
      errors.userPassword = "Password must contain atleast one uppercase, one lowercase character, atleast one digit and min 6 to max 10 size";
    }
    if (!onlyDigits.test(formData.address.pincode)) {
        errors.pincode = "Provide valid 6-digit pincode";
      }
    if (!formData.phoneNumber.match("[6-9][0-9]{9}")) {
      errors.phoneNumber = "Provide valid 10-digit mobile number";
    }
    if (!onlyAlphabets.test(formData.address.state)) {
      errors.state = "State can have only aplhabets";
    }
    if (!onlyAlphabets.test(formData.address.city)) {
      errors.city = "City can have only aplhabets";
    }
    return errors;
  };

  return (
    <>
      <Navbar />
      <div className="signup-div">
        <div className="signup-card">
          <h2>Signup Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="firstName">First name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              {errors.firstName && (
                <div className="error">{errors.firstName}</div>
              )}
            <label htmlFor="lastName">Last name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              {errors.lastName && (
                <div className="error">{errors.lastName}</div>
              )}

              <div>
              <label htmlFor="email">Email:</label><input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

              <label htmlFor="userName">Username: (Must be same as Email)</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                required
              />
              {errors.userName && (
                <div className="error">{errors.userName}</div>
              )}
            </div>
            <div>
              <label htmlFor="userPassword">Password:</label>
              <input
                type="password"
                id="userPassword"
                name="userPassword"
          
                value={formData.userPassword}
                onChange={handleInputChange}
                required
              />
              {errors.userPassword && (
                <div className="error">{errors.userPassword}</div>
              )}
            </div>
            
            <div>
              <label htmlFor="phoneNumber">Mobile Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              {errors.phoneNumber && (
                <div className="error">{errors.phoneNumber}</div>
              )}
            </div>

            <div>
            <label htmlFor="buildingNumber">Building/Flat Number:</label>
              <input
                type="text"
                id="buildingNumber"
                name="address.buildingNumber"
                value={formData.address.buildingNumber}
                onChange={handleInputChange}
                required
              />
            {errors.buildingNumber && (
            <div className="error">{errors.buildingNumber}</div>
            )}
            </div>

            <div>
              <label htmlFor="area">Area:</label>
              <input
                type="text"
                id="area"
                name="address.area"
                value={formData.address.area}
                onChange={handleInputChange}
                required
              />
              {errors.area && (
                <div className="error">{errors.area}</div>
              )}
            </div>

            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                required
              />
              {errors.city && (
                <div className="error">{errors.city}</div>
              )}
            </div>

            <div>
              <label htmlFor="pincode">Pincode:</label>
              <input
                type="text"
                id="pincode"
                name="address.pincode"
                // pattern="/^\d{6}$/"
                // title="Pincode can have only 6-digit number"
                value={formData.address.pincode}
                onChange={handleInputChange}
                required
              />
              {errors.pincode && (
                <div className="error">{errors.pincode}</div>
              )}
            </div>

            <div>
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="address.state"
                // pattern="/^[a-zA-Z\s]*$/"
                // title="State can have only aplhabets"
                value={formData.address.state}
                onChange={handleInputChange}
                required
              />
              {errors.state && (
                <div className="error">{errors.state}</div>
              )}
            </div>

            <div>
            <label htmlFor=" role">Role:</label>
              <select id="role" name="role" value={formData.role} onChange={handleInputChange} required>
              <option value={""}>Select an Option</option>
                <option value={"ROLE_FARMER"}>Farmer</option>
                <option value={"ROLE_DEALER"}>Dealer</option>
              </select>
            </div>
            <div>
            <button type="submit">Sign Up</button>
            </div>
          </form>
          <p id="para"><b>Already have an account?  <a href="/login">Click here to Login</a></b></p>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
