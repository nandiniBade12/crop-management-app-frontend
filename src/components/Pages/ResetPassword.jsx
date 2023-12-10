import { React, useState } from "react";
import NavbarHome from "../../layouts/NavbarHome";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const initialData = {
  userName: "",
  password: "",
  confirmPassword: "",
  errors: { password: "", confirmPassword: "" },
};

const ResetPassword = () => {
  
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errors = formData.errors;

    switch (name) {
      case "password":
        errors.password =
          value.length < 6 ? "Password must be at least 6 characters long" : "";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          value !== formData.password ? "Passwords do not match" : "";
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value, errors });
  };

  const navigate = useNavigate();
  // Handle login
  // Handle password change
const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { userName, password, confirmPassword } = formData;
  
    // Check if there are any errors
    if (formData.errors.password || formData.errors.confirmPassword) {
      alert("Please check for registered mail before submitting the form.");
      return;
    }
  
    // Send PUT request to update password
    try {
      const response = await axios.put(`http://localhost:8081/users/updatePassword/${userName}?password=${password}`);
      console.log(response.data); // Log response data
      alert("Password updated successfully!"); // Show success message
      navigate("/login")
    } catch (error) {
      console.error(error); // Log error
      alert("Failed to update password. Please try again."); // Show error message
    }
  };
 

  return (
    <>
      <NavbarHome />
      <div className='signup-div' style={{width: "100%", height: "100vh"}}>
        <div className="signup-card" style={{marginTop: "100px"}}>
          <h2 style={{ fontFamily: "rubik" }}>Reset Password</h2>
          <br></br>
          <form onSubmit={handlePasswordChange}>
            <div>
              <label htmlFor="emailId">Registered Email:</label>
              <input
                      type="text"
                      value={formData.userName}
                      className="form-control"
                      id="userName"
                      placeholder="Enter your email here"
                      name="userName"
                      onChange={handleChange}
                      required={true}
              />
            </div>

            <div>
            <label htmlFor="password">Password:</label>
              <input
                  type="password"
                  value={formData.password}
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password here"
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  onChange={handleChange}
                  required={true}
                />  
                {formData.errors.password && (
                    <div className="text-danger" style={{color: "red", fontSize:"12px"}}>
                        {formData.errors.password}
                    </div>
                    )} 
            </div>

            <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    value={formData.confirmPassword}
                    className="form-control"
                    id="password"
                    name="confirmPassword"
                    placeholder="Enter password to confirm"
                    onChange={handleChange}
                    required={true}
                />
                 {formData.errors.confirmPassword && (
                    <div className="text-danger" style={{color: "red", fontSize:"12px"}}>
                        {formData.errors.confirmPassword}
                    </div>
                    )}
            </div>

            <div>
              <button className="btn btn-primary btn-login"
                type="submit"
                style={{backgroundColor:"#5EB95E"}}
              > Reset password </button>
            </div>
          </form>
          <br></br>
          <p id="para"><b>Don't have an account?  <Link to= {"/signup"}>Click here to Sign up</Link></b></p>
          
        </div>
      </div>
    </>
  );
};
export default ResetPassword;