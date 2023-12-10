import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/AdminPages.css';
import { Link, useNavigate } from 'react-router-dom';
import NavbarDealer from '../../layouts/NavbarAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';

function UsersList() {

  const [itemsCount, setItemsCount] = useState(0);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/users/fetchAll`)
        .then(response => {
            setUsers(response.data);
            setItemsCount(response.data.length);
        })
        .catch(error => {
            console.log(error.response.data);
        });
    }, [users]);

  return (
    <>
      <NavbarDealer />
      <div style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}>
        <div className='cart-container' style={{width: "90%"}}>
            <h2>Dealers Details</h2>
            <p style={{color:"green"}}>Total of {itemsCount} users are registered into the platform</p>
            <div className="cart-grid" style={{backgroundColor: "white", border: "none"}}>
                <div className='table-div' style={{alignItems: "center", padding: "10px", backgroundColor: "#f0f1f3", width: "111%", border: "2px solid black", borderRadius: "5px", margin: "10px"}}>
                <table className='table table-bordered' >
                    <thead class="thead-dark">
                        <tr >
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((dealer) => (
                        <tr key={dealer.id}>
                            <td>{dealer.firstName}</td>
                            <td>{dealer.lastName}</td>
                            <td>{dealer.email}</td>
                            <td>{dealer.phoneNumber}</td>
                            <td>
                            {`${dealer.address.buildingNumber}, ${dealer.address.area}, ${dealer.address.city}, ${dealer.address.pincode}, ${dealer.address.state}`}
                            </td>
                            <td>{dealer.role}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            <br/>
            
        </div>
      </div>
    </>
  );
}

export default UsersList;
