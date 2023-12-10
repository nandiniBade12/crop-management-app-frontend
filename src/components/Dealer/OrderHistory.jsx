import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/CartItems.css';
import { Link, useNavigate } from 'react-router-dom';
import NavbarDealer from '../../layouts/NavbarDealer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

function OrderHistory() {

  const obj = localStorage.getItem("userInfo");
  const { firstName, lastName, phoneNumber } = JSON.parse(obj);

  const [order, setOrder] = useState({});

  const [orderItems, setOrderItems] = useState([]);

  const [address, setAddress] = useState({});

  const userEmail = localStorage.getItem('id');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8084/orders/view/user/${userEmail}`)
      .then(response => {
        setOrder(response.data[0]);
        setOrderItems(response.data[0].orderItems);
        setAddress(response.data[0].shippingAddress);
      })
      .catch(error => {
        console.log(error);
      });
  }, [order]);

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
        <div className='cart-container' style={{width: "50%"}}>
        <h2>Your Orders will appear here</h2>
        {orderItems.length === 0 ? (
          <div>
            <p>Your orders bag <FontAwesomeIcon icon={faShoppingBag} /> is empty.</p>
            <p> <a href="/dealercrops">Go back to dashboard to subscribe to crops</a></p> 
          </div>
          ) : ( <>
        <p>You have subscribed {orderItems.length} crops in your order <FontAwesomeIcon icon={faShoppingBag} className="icon" /></p>
        <div className="cart-grid" style={{ backgroundColor: "white", marginBottom: "10px"}}>
    
            <div className='cart-bottom' style={{backgroundColor: "rgb(229, 247, 248)", width: "80%", border: "1px solid black", borderRadius: "5px", margin: "10px"}}>
                <div className='order'>
                <h4>Order details </h4>
                <p className='p2'>Order ID : {order.id}</p>
                <p className='p2'>Order Status : {order.orderStatus}</p>
                <p className='p2'>Order date : {order.orderDate}</p>
                <p className='p2'>Order total: &#8377; {order.totalPrice}.00</p>
                </div>

                <div className='payment' style={{marginTop: "-10px"}}>
                <h4>Payment Information</h4>
                <p className='p2'>Payment Method: {order.modeOfPayment}</p>
                </div>

                <div className='delivery' style={{marginTop: "-10px"}}>
                    <h4>Shipping Address</h4>
                    <p className='p2'>Buyers name: {firstName} {lastName}</p>
                    <p className='p2'>Contact Info: {phoneNumber}</p>
                    <p className='p2'>{address.buildingNumber}, {address.area}, {address.city}, {address.pincode}</p>
                    <p className='p2'>{address.state}, India</p>
                </div>

                <div style={{marginTop: "-10px"}}>
                  <h4>Order Summary</h4>
                  <p className='p2'>Items: {orderItems.length}</p>
                  <p className='p2'>Delivery charges: FREE</p>
                  <p className='p2'>Total Order Price: &#8377;{order.totalPrice}.00</p>
                </div>
            </div>

            <h4 style={{marginTop: "1px"}}>Crop Item details</h4>
          <div className='cart-grid' style={{width: "80%", marginBottom: "10px"}} >
          {orderItems.map(item => (
            <div className="cart-cards" key={item.id}>
              <img className='cart-image' src={item.crop.image} height="100px" width={"100px"}></img>
              <div className='cart-description'>
              <p className='p3' style={{color:"rgb(55, 83, 207)"}}> <b>{item.crop.cropName}</b></p>
              <p className='p3'>Each: <b>&#8377;{item.crop.pricePerUnit}</b></p>
              <p className='p3'>Net Quantity: {item.quantity}</p>
              <p className='p3'>SubTotal: <b>&#8377;{item.subTotal}</b></p>
              </div>
              <div className='cart-remove' style={{marginLeft: "50px"}}>
                <p className='p3'><b>Seller Details</b></p>
                <p className='p3'>{item.crop.sellerName},</p>
                <p className='p3'>{item.crop.farmLocation}</p>
                <p className='p3'>{item.crop.sellerContact}</p>          
              </div>
            </div>
          ))}
          </div>
        </div> {/* grid */}
        </>
          )}
        </div> {/* container */}

      </div>
    </>
  );
}

export default OrderHistory;
