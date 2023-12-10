import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Crops.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/NavbarAdmin';

function AdminHome() {
  const [crops, setCrops] = useState([]);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Define the number of items to display per page
  const totalPages = Math.ceil(crops.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, crops.length);
const visibleCrops = crops.slice(startIndex, endIndex);
 
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
 
  const previousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };
 
  const nextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8089/crops/`)
      .then(response => {
        setCrops(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [crops]);

  return (
    <>
      <Navbar />
      <div className='add'>
        
      </div>
      <div className="crops-container">
        <div className="crops-grid">
          {crops.map(crop => (
            <div className="crop-card" key={crop.id}>
              <img src={crop.image} height="140px" width={"200px"}></img>
              <p style={{"fontSize":"large", "fontFamily":"italic", color:"rgb(55, 83, 207)"}}><b>{crop.cropName}</b></p>
              <p>{crop.description}</p>
              <p>Available stock: <b>{crop.quantityAvailable}</b> Kgs</p>
              <p>Price: <b>&#8377;{crop.pricePerUnit}</b>/Kg</p>
              <p >Sold by: {crop.sellerName}</p>
              <p style={{"font-size":"smaller", color:"GrayText"}}>{crop.farmLocation}</p>
              <p>Contact supplier: &#9742; {crop.sellerContact}</p>
              <p></p>
              <div className="crop-buttons">
                {/* <button className='btn btn-success' >
                  <Link  to={`/updatecrop/${crop.id}`}>
                  Update
                  </Link></button>
                  <button className='btn btn-danger' onClick={() => deleteCrop(crop.id)}>Delete</button> */}
              </div>

            </div>

            
          ))}
        </div>
      </div>
      <div className="pagination" style={{backgroundColor: "white", marginTop: "10px", marginLeft: "450px",marginBottom:"10px", width: "30%"}}>
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

export default AdminHome;