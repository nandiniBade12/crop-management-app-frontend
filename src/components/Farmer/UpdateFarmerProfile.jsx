import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/NavbarFarmer";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import "../../styles/SignUp.css";

function UpdateFarmerProfile() {

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
  const { id } = useParams();
  const navigate = useNavigate();

//   const onInputChange = (e) => {
//     setCrop({ ...crop, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/users/fetch/email/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCrop();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8081/users/update/email/${id}`, formData);
      alert(" User details updated successfully");
      navigate("/farmercrops");
    } catch (error) {
      console.error(error);
    }
  };

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

  

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const validateInputs = () => {
    const errors = {};
    // if (!formData.userName.trim()) {
    //   errors.userName = "Username is required";
    // }
    // if (!formData.email.trim()) {
    //     errors.email = "Email is required";
    //   }
    if (!isValidEmail(formData.email)) {
        errors.email = "Invalid Email";
      }
    // if (!formData.userPassword.trim()) {
    //   errors.password = "Password is required";
    // }
    if (formData.userPassword.length < 6 && formData.userPassword>10) {
      errors.userPassword = "Password must contain min 6 and max 10 characters";
    }
    // if (!(formData.address.pincode.length!==6)) {
    //     errors.address.pincode = "Provide valid 6-digit pincode";
    //   }
    // if (!formData.mobileNo.trim()) {
    //   errors.mobileNo = "Mobile Number is required";
    // }
    if (!formData.phoneNumber.match("[6-9][0-9]{9}")) {
      errors.phoneNumber = "Mobile number should be 10 digits";
    }
    return errors;
  };

  return (
    <>
      <Navbar />
      {/* <div> */}
        <div className="signup-card">
          <h2>Profile Details</h2>
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
              <label htmlFor="userName">Username:</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                disabled
                style={{backgroundColor: "lightGray"}}
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
              <label htmlFor="email">Registered Email:</label><input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled
                style={{backgroundColor: "lightGray"}}
              />
              
              {errors.email && <div className="error">{errors.email}</div>}
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
            {errors.address && errors.address.buildingNumber && (
            <div className="error">{errors.address.buildingNumber}</div>
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
              {errors.address && errors.address.area && (
                <div className="error">{errors.address.area}</div>
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
              {errors.address && errors.address.city && (
                <div className="error">{errors.address.city}</div>
              )}
            </div>

            <div>
              <label htmlFor="pincode">Pincode:</label>
              <input
                type="text"
                id="pincode"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleInputChange}
                required
              />
              {errors.address && errors.address.pincode && (
                <div className="error">{errors.address.pincode}</div>
              )}
            </div>

            <div>
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                required
              />
              {errors.address && errors.address.state && (
                <div className="error">{errors.address.state}</div>
              )}
            </div>

            <div className="buttons-div">
              <button type="submit">Update Profile</button>
              
              <button
                className="btn btn-secondary" id="btn-cancel"
                onClick={() => navigate("/farmercrops")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      {/* </div> */}
    </>
  );
}

export default UpdateFarmerProfile;
