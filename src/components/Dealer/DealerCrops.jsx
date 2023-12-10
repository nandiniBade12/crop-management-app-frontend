import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Crops.css';
import { Link, useNavigate } from 'react-router-dom';
import NavbarDealer from '../../layouts/NavbarDealer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function DealerCrops() {

  const [crops, setCrops] = useState([]);
  const [searchOption, setSearchOption] = useState('default');
  const [searchValue, setSearchValue] = useState('');

  const userEmail = localStorage.getItem('id');

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
        console.log(error.response.data);
      });
  }, [crops]);

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filters = (crop) => {
    if (searchOption === 'default') {
      return true;
    } else if (searchOption === 'cropType') {
      return crop.cropType === searchValue;
    } else if (searchOption === 'cropName') {
      return crop.cropName === searchValue;
    } else if (searchOption === 'farmLocation') {
      return crop.farmLocation === searchValue;
    }
  };

  const handleOnClick = async (id) => {
    try{
    const response = await axios.post(`http://localhost:8083/cart/add/user/${userEmail}/crop/${id}/quantity/10`);
    console.log(response.data);
    alert("Item added to cart Successfully!!!");
    navigate("/dealercrops");
    } catch(error){
        console.error(error.response.data);
        alert(error.data);
    }
  }

  return (
    <>
      <NavbarDealer />
      <div className='add'>
        {/* <Link className='btn btn-success' to={`/addcrop`}>Filters</Link> */}
        <div className="search-bar">
          <select value={searchOption} onChange={handleSearchOptionChange}>
            <option value="default">Search your crop</option>
            <option value="cropName">Search crop name</option>
            <option value="cropType">Search crop type</option>
            <option value="farmLocation">Search farm location</option>
          </select>
          {(searchOption === 'cropName' || searchOption === 'cropType' || searchOption === 'farmLocation') && (
            <input type="text" value={searchValue} placeholder="Search..." onChange={handleSearchInputChange} />
          )}
            
        </div>
      </div>
      <div className="crops-container">
        <div className="crops-grid">
          {crops.filter(filters).map(crop => (
            <div className="crop-card" key={crop.id}>
              <img src={crop.image} height="140px" width={"200px"}></img>
              <p style={{"font-size":"large", "fontFamily":"italic", color:"rgb(55, 83, 207)"}}><b>{crop.cropName}</b></p>
              <p>{crop.description}</p>
              <p>Available stock:  <b>{crop.quantityAvailable}</b> Kgs</p>
              <p>Price:  <b>&#8377;{crop.pricePerUnit}</b>/Kg</p>
              <p >Sold by: {crop.sellerName}</p>
              <p style={{"font-size":"smaller", color:"GrayText"}}>{crop.farmLocation}</p>
              <p>Contact supplier: &#9742; {crop.sellerContact}</p>
              <p></p>
                <button className='cart-btn' onClick={() => handleOnClick(crop.id)}>
                  Add to Cart <FontAwesomeIcon icon={faShoppingCart}  />
                </button>
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

export default DealerCrops;
