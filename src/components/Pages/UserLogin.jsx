import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../styles/SignUp.css";
import Navbar from "../../layouts/NavbarHome";

const initialData = { emailId: "", password: "" };

const UserLogin = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const [user, setUser] = useState(initialData);

  const [errors, setErrors] = useState({});

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const validateInputs = () => {
    const errors = {};

    if (!isValidEmail(user.emailId)) {
        errors.emailId = "Invalid Email";
      }
    if (user.password.length < 6 && user.password>10) {
      errors.password = "Password must contain min 6 and max 10 characters";
    }
    return errors;
  };

  const handleChange = (e) => {
    setUser((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length === 0) {
    axios.post("http://localhost:8081/users/signIn",user)
      .then((res) => {
        const userInfo = res.data;
        localStorage.setItem("id", userInfo.email);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log("Response data:", userInfo);
        const role = userInfo.role;
        console.log("Role: ", role);

      if (role === "ROLE_DEALER") {
        setIsLoggedIn(true);
        alert("Dealer Logged in successfully!!");
        navigate("/dealercrops");
      } else if (role === "ROLE_FARMER") {
        setIsLoggedIn(true);
        alert("Farmer Logged in successfully!!");
        navigate("/farmercrops");
      } else if (role === "ROLE_ADMIN"){
        setIsLoggedIn(true);
        alert("Admin Logged in successfully!!");
        navigate("/adminhome");
      }
      
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        alert("An error occurred while making the request.");
      }
    });
  } else {
    setErrors(validationErrors);
  }
  };

  return (
    <>
    <Navbar/>
    <div className='signup-div' style={{width: "100%", height: "100vh"}}>
        <div className="signup-card" style={{marginTop: "100px"}}>
          <h2>Login</h2>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="emailId">Username:</label>
              <input
                      type="text"
                      value={user.emailId}
                      className="form-control"
                      id="userName"
                      placeholder="Enter your email here"
                      name="emailId"
                      onChange={handleChange}
                      required={true}
              />
              {errors.emailId && (
                <div className="error">{errors.emailId}</div>
              )}
            </div>

            <div>
            <label htmlFor="password">Password:</label>
              <input
                  type="password"
                  value={user.password}
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password here"      
                  onChange={handleChange}
                  required={true}
                />
                {errors.password && (
                <div className="error">{errors.password}</div>
              )}   
            </div>
            {/* <br/> */}
            <div>
              <button className="btn btn-primary btn-login"
                type="submit"
                style={{backgroundColor:"#5EB95E"}}
              > Login </button>
              <br/>
              <br/>
              <p><Link to = {`/setpassword`} style={{color:"green"}}>Forgot password?</Link></p>
            </div>
          </form>
          <p id="para"><b>Don't have an account?  <Link to= {"/signup"}>Click here to Sign up</Link></b></p>
          
        </div>
      </div>

    </>
  );
};
export default UserLogin;
