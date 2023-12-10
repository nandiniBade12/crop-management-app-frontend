import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/CartItems.css';
import { Link, useNavigate } from 'react-router-dom';
import NavbarDealer from '../../layouts/NavbarDealer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';

function Checkout() {

    const [paymentMode, setPaymentMode] = useState('');

  const [cart, setCart] = useState({});

  const [itemsCount, setItemsCount] = useState(0);

  const [cartItems, setCartItems] = useState([]);

  const userEmail = localStorage.getItem('id');

  const obj = localStorage.getItem("userInfo");
  const { firstName, lastName, phoneNumber, email , address} = JSON.parse(obj);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8083/cart/view/user/${userEmail}`)
      .then(response => {
        setCart(response.data);
        setCartItems(response.data.items);
        setItemsCount(response.data.items.length);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userEmail]);

const onInputChange = (e) => {
    const selectedPaymentMode = e.target.value;
    setPaymentMode(selectedPaymentMode);
    console.log("Payment method: " , selectedPaymentMode);
  };

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
        <div className='cart-container'>
            <h2>Checkout</h2>
            <p style={{color: "red", fontSize: "medium", fontFamily:"initial"}}>***Please verify your details before you proceed to pay***</p>
            <div className="cart-grid">
                <div className='customer-info'>
                    <h3>Customer Info</h3>
                    <p style={{color:"rgb(55, 83, 207)"}}><b>Name: {firstName} {lastName}</b></p>
                    <p>Email: {email}</p>
                    <p>Phone Number: {phoneNumber}</p>
                    <p>Address: {address.buildingNumber}, {address.area}, {address.city}, {address.pincode}</p>
                    <p>         {address.state}, India</p>    
                </div>
                <div className="cart-card-info" style={{width: "90%"}}>
                    <h3 style={{marginTop: "5px"}}>Current Cart Info</h3>
                    <p style={{marginTop: "5px"}}><a href="/cartitems" style={{color:"green"}}>Return to cart <FontAwesomeIcon icon={faShoppingCart} /> </a></p>
                    <p style={{marginTop: "5px"}}>You have {itemsCount} items in your cart</p>
              {cartItems.map(item => (
                <div className='cart-info' key={item.crop.id}>
                    <p className='p1'><b>{item.cropName}</b></p>
                    <p className='p1'>Each: <b>&#8377;{item.crop.pricePerUnit}</b></p>
                    <p className='p1'>Quantity: <b>{item.quantity}</b></p>
                    <p className='p1'>Subtotal: <b> &#8377;{item.subTotal}</b></p>
              </div>
              ))}
                    <p>Cart Total: <b>&#8377; {cart.totalPrice}</b></p>
              </div>
            </div>

            <div className='cart-bottom'>
            <div className='customer-info'>
                    <h3>Payment Info</h3>
                    <p>Choose your mode of payment</p>
                    <select id="paymentMode" name="paymentMode" value={paymentMode} onChange={(e) => onInputChange(e)}>
                        <option value=''>Select</option>
                        <option value='Credit card'>Credit card</option>
                        <option value='Debit card'>Debit card</option>
                        <option value="UPI">UPI</option>
                    </select>  
                </div>
              <h4>Total price: &#8377;{cart.totalPrice}</h4>
              
              {paymentMode === "" ? (
          <div>
            <p style={{color: "blue"}}><b>Please select a paymention option to proceed!!</b></p>
          </div>
          ) : (
            <button className='checkout-btn' onClick={() => navigate(`/payment/${paymentMode}/${cart.totalPrice}`)}>Complete Checkout and Pay</button>
          )}
            </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
