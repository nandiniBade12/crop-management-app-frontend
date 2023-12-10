import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AddCrop.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../layouts/NavbarFarmer";

function UpdateCrop() {
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
  const { id } = useParams();
  const navigate = useNavigate();

//   const onInputChange = (e) => {
//     setCrop({ ...crop, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const response = await axios.get(`http://localhost:8089/crops/view/${id}`);
        setCrop(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCrop();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCrop((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8089/crops/update/${id}`, crop);
      alert("Crop updated successfylly");
      navigate("/farmercrops");
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]*$/;
    setErrors(errors);
    return isValid;
  };

//   useEffect(() => {
//     fetchNames();
//   }, []);

//   const fetchNames = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8585/Hospital/getAllHospitalsNames`
//       );
//       setNames(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       await axios.post("http://localhost:8082/crops/add", crop);
//       alert("Crop added successfully");
//       navigate("/farmercrops");
//       setCrop({
//         cropName: "",
//         cropType: "",
//         description: "",
//         pricePerUnit: 0,
//         quantityAvailable: 0,
//         image: "",
//         farmLocation: "",
//         sellerName: "",
//         sellerContact: "",
//       });
//     }
//   };

  return (
    <>
      <Navbar />
      <div className="addcrop-card">
        <div className="add-crop">
            <h2>Update Crop Form</h2>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="cropName">Crop Name:</label>
                <input
                  type="text"
                  id="cropName"
                  name="cropName"
                  value={crop.cropName}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />
              </div>

              <div>
                <label htmlFor="cropType">Crop Name:</label>
                <input
                  type="text"
                  id="cropType"
                  name="cropType"
                  value={crop.cropType}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />
              </div>

              <div>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={crop.description}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />
              </div>

              <div>
                <label htmlFor="pricePerUnit">Price per unit(in Kgs):</label>
                <input
                  type="number"
                  id="pricePerUnit"
                  name="pricePerUnit"
                  value={crop.pricePerUnit}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />
              </div>

              <div>
                <label htmlFor="quantityAvailable">Quantity Available(in Kgs):</label>
                <input
                  type="number"
                  id="quantityAvailable"
                  name="quantityAvailable"
                  value={crop.quantityAvailable}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />
              </div>

              <div>
                <label htmlFor="image">Image Url:</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={crop.image}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />
              </div>

              <div>
                <label htmlFor="farmLocation">Farm Location:</label>
                <input
                  type="text"
                  id="farmLocation"
                  name="farmLocation"
                  value={crop.farmLocation}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />
              </div>

              <div>
                <label htmlFor="sellerName">Seller Name:</label>
                <input
                  type="text"
                  id="sellerName"
                  name="sellerName"
                  value={crop.sellerName}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />
              </div>

              <div>
                <label htmlFor="sellerContact">Seller Contact:</label>
                <input
                  type="text"
                  id="sellerContact"
                  name="sellerContact"
                  value={crop.sellerContact}
                  onChange={handleInputChange}
                  onBlur={validateForm}
                />
              </div>

              <div className="buttons-div">
              <button type="submit">Update Crop</button>
              
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
      </div>
    </>
  );
}
export default UpdateCrop;
