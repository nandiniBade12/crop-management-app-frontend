import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/AdminPages.css';
import { Link, useNavigate } from 'react-router-dom';
import NavbarDealer from '../../layouts/NavbarAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';

function OrdersList() {

  const [itemsCount, setItemsCount] = useState(0);
  
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8084/orders/`)
        .then(response => {
            setOrders(response.data);
            setItemsCount(response.data.length);
        })
        .catch(error => {
            console.log(error.response.data);
        });
    }, [orders]);

    const onChangeStatus = async (e, orderid) =>{
      try {
        const newStatus = e.target.value;
        setStatus(e.target.value);
        const response = await axios.patch(`http://localhost:8084/orders/changeStatus/${orderid}?status=${newStatus}`);
        console.log("New status : ", response.data);
        alert("Order status is successfully changed");
        setStatus("");
        navigate('/orders');
      } catch (error) {
        console.log(error);
      }
    }

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
            <h2>Order Details</h2>
            <p style={{color:"green"}}>Total of {itemsCount} order details of dealers are shown</p>
            <div className="cart-grid" style={{backgroundColor: "white", border: "none"}}>
                <div className='table-div' style={{backgroundColor: "#f0f1f3", padding: "10px", width: "119%", border: "2px solid black", borderRadius: "5px", margin: "10px"}}>
                <table className='table table-bordered'>
                    <thead class="thead-dark">
                        <tr>
                        <th>User Name</th>
                        <th>Order Status</th>
                        <th>Order/Billing Date</th>
                        <th>Shipping Address</th>
                        <th>Total Price</th>
                        <th>Total Items</th>
                        <th>Total Crops</th>
                        <th>Payment Methods</th>
                        <th>Change Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.userName}</td>
                            <td>{order.orderStatus}</td>
                            <td>{order.orderDate}</td>
                            <td>
                            {`${order.shippingAddress.buildingNumber}, ${order.shippingAddress.area}, ${order.shippingAddress.city}, ${order.shippingAddress.pincode}, ${order.shippingAddress.state}`}
                            </td>
                            <td>{order.totalPrice}</td>
                            <td>{order.orderItems.length}</td>
                            <td>
                              <ul>
                                {order.orderItems.map((item, index) => (
                                  <li key={index}>{item.crop.cropName}</li>
                                ))}
                              </ul>
                            </td>
                            <td>Paid by {order.modeOfPayment}</td>
                            <td><select id="status" name="status" value={status} onChange={(e) => onChangeStatus(e,order.id)} style={{height:"25px", backgroundColor:"white"}}>
                              <option value="">Change status</option>
                              <option value={"Pending"}>Pending</option>
                              <option value={"Shipped"}>Shipped</option>
                              <option value={"Out for Delivery"}>Arriving Soon</option>
                              <option value={"Delivered"}>Delivered</option>
                              <option value={"Completed"}>Completed</option>  
                              </select></td>
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

export default OrdersList;
