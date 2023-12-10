import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AddCrop.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layouts/NavbarFarmer";

function AddCrops() {
    const [crop, setCrop] = useState({
        cropName: "",
        cropType: "",
        description: "",
        pricePerUnit: 0,
          quantityAvailable: 0,
          image: "",
          farmLocation: "",
          sellerName: "",
          sellerContact: "",
    });

//   const [names, setNames] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setCrop({ ...crop, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    const alphabetsRegex = /^[a-zA-Z\s]*$/;

   if(!alphabetsRegex.test(crop.cropName)) {
      errors.cropName =
        "Crop Name should contain only alphabets";
      isValid = false;
    } else if (crop.cropName.length < 3) {
      errors.cropName = "Crop Name should be at least 3 characters";
      isValid = false;
    }
    if(!alphabetsRegex.test(crop.cropType)) {
      errors.cropType =
        "Crop Type should contain only alphabets";
      isValid = false;
    } else if (crop.cropType.length < 3) {
      errors.cropType = "Crop Type should be at least 3 characters";
      isValid = false;
    }
    if(!alphabetsRegex.test(crop.description)) {
      errors.description =
        "Crop description should contain only alphabets";
      isValid = false;
    } else if (crop.description.length < 3) {
      errors.description = "Crop description should be at least 5 characters";
      isValid = false;
    }
    if(!alphabetsRegex.test(crop.farmLocation)) {
      errors.farmLocation =
        "Farm Location should contain only alphabets";
      isValid = false;
    } else if (crop.farmLocation.length < 3) {
      errors.farmLocation = "Farm Location should be at least 3 characters";
      isValid = false;
    }
    if(!alphabetsRegex.test(crop.sellerName)) {
      errors.sellerName =
        "Seller Name should contain only alphabets";
      isValid = false;
    } else if (crop.sellerName.length < 3) {
      errors.sellerName = "Seller Name should be at least 3 characters";
      isValid = false;
    }
    if (crop.pricePerUnit <= 0) {
      errors.pricePerUnit = "Price should be greater than 0";
      isValid = false;
    }
    if (crop.quantityAvailable <= 0) {
      errors.quantityAvailable = "Quantity Available should be greater than 0";
      isValid = false;
    }
    if (!crop.sellerContact.match("[6-9][0-9]{9}")) {
      errors.sellerContact = "Contact number should be valid 10 digits";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await axios.post("http://localhost:8089/crops/add", crop);
      alert("Crop added successfully");
      navigate("/farmercrops");
      setCrop({
        cropName: "",
        cropType: "",
        description: "",
        pricePerUnit: 0,
        quantityAvailable: 0,
        image: "",
        farmLocation: "",
        sellerName: "",
        sellerContact: "",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="addcrop-card">
        <div className="add-crop">
            <h2>Add Crop Form</h2>
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="cropName">Crop Name:</label>
                <input
                  type="text"
                  id="cropName"
                  name="cropName"
                  value={crop.cropName}
                  onChange={onInputChange}
                  onBlur={validateForm}
                  required
                />
              </div>
              {errors.cropName && (
                  <span className="error" style={{fonstSize: "x-small", color:"red"}}>{errors.cropName}</span>
                )}
              <div>
                <label htmlFor="cropType">Crop Type:</label>
                <input
                  type="text"
                  id="cropType"
                  name="cropType"
                  value={crop.cropType}
                  onChange={onInputChange}
                  onBlur={validateForm}
                  required
                />
               
              </div>
              {errors.cropType && (
                  <span className="error" style={{fonstSize: "small", color:"red"}}>{errors.cropType}</span>
                )}
              <div>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={crop.description}
                  onChange={onInputChange}
                  onBlur={validateForm}
                  required
                />
               
              </div>
              {errors.description && (
                  <span className="error" style={{fonstSize: "small", color:"red"}}>{errors.description}</span>
                )}
              <div>
                <label htmlFor="pricePerUnit">Price per unit(in Kgs):</label>
                <input
                  type="number"
                  id="pricePerUnit"
                  name="pricePerUnit"
                  value={crop.pricePerUnit}
                  onChange={onInputChange}
                  onBlur={validateForm}
                  required
                />
              
              </div>
              {errors.pricePerUnit && (
                  <span className="error" style={{fonstSize: "small", color:"red"}}>{errors.pricePerUnit}</span>
                )}
              <div>
                <label htmlFor="quantityAvailable">Quantity Available(in Kgs):</label>
                <input
                  type="number"
                  id="quantityAvailable"
                  name="quantityAvailable"
                  value={crop.quantityAvailable}
                  onChange={onInputChange}
                  onBlur={validateForm}
                  required
                />
                
              </div>
              {errors.quantityAvailable && (
                  <span className="error" style={{fonstSize: "small", color:"red"}}>{errors.quantityAvailable}</span>
                )}
              <div>
                <label htmlFor="image">Image Url:</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={crop.image}
                  onChange={onInputChange}
                  onBlur={validateForm}
                  required
                />
                {errors.image && <span className="error" style={{fonstSize: "small", color:"red"}}>{errors.image}</span>}
              </div>

              <div>
                <label htmlFor="farmLocation">Farm Location:</label>
                <input
                  type="text"
                  id="farmLocation"
                  name="farmLocation"
                  value={crop.farmLocation}
                  onChange={onInputChange}
                  onBlur={validateForm}
                  required
                />
                
              </div>
              {errors.farmLocation && <span className="error" style={{fonstSize: "small", color:"red"}}>{errors.farmLocation}</span>}
              <div>
                <label htmlFor="sellerName">Seller Name:</label>
                <input
                  type="text"
                  id="sellerName"
                  name="sellerName"
                  value={crop.sellerName}
                  onChange={onInputChange}
                  onBlur={validateForm}
                  required
                />
                
              </div>
              {errors.sellerName && <span className="error" style={{fonstSize: "small", color:"red"}}>{errors.sellerName}</span>}
              <div>
                <label htmlFor="sellerContact">Seller Contact:</label>
                <input
                  type="text"
                  id="sellerContact"
                  name="sellerContact"
                  value={crop.sellerContact}
                  onChange={onInputChange}
                  onBlur={validateForm}
                  required
                />
                
              </div>
              {errors.sellerContact && <span className="error" style={{fonstSize: "small", color:"red"}}>{errors.sellerContact}</span>}
              <div className="buttons-div">
              <button type="submit">Add Crop</button>
              
              <button
                className="btn btn-secondary" id="cancel-btn"
                onClick={() => navigate("/farmercrops")}
              >
                Cancel
              </button>
              </div>
            </form>
          </div>
      </div>
    </>
  );
}
export default AddCrops;
