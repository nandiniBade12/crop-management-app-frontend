import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/CartItems.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavbarDealer from '../../layouts/NavbarDealer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';

function Payment() {

    const [card, setCard] = useState({
        cardHolderName: "",
        cardNumber: "",
        expirationDate: "",
        cvvNumber: "",
        cardType: ""
      });

    const [paymentId, setPaymentId] = useState('');

    const [errors, setErrors] = useState({});

  const userEmail = localStorage.getItem('id');

  const { paymentMode, totalPrice } = useParams();

  const navigate = useNavigate();

  const validateInputs = () => {
    const errors = {};
    const cardNumberRegex = /^(?:\d{16}|\d{4}-\d{4}-\d{4}-\d{4}|\d{4} \d{4} \d{4} \d{4})$/;
    const cardHolderNamePattern = /^[a-zA-Z ]+$/;
    const cvvPattern = /^\d{3}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/(2[4-9])$/;
    
        // Validate card number
        if (!cardNumberRegex.test(card.cardNumber)) {
          errors.cardNumber = "Please enter a valid 16-digit card number in the format: 1234 5678 9012 3456";
        }

        // Validate card holder name
        if (!cardHolderNamePattern.test(card.cardHolderName)) {
            errors.cardHolderName = "Card holder name should contain only alphabets";
        } else if (card.cardHolderName.length < 5) {
            errors.cardHolderName = "Card holder name should have a minimum of 5 characters";
        }

        // Validate CVV
        if (!cvvPattern.test(card.cvvNumber)) {
            errors.cvvNumber = "Please provide a valid CVV of 3 digits of number: 123";
        }

        if (!expiryDateRegex.test(card.expirationDate)) {
          errors.expirationDate = "Please enter a valid expiration date in the format: MM/YY (e.g., 12/23)";
        }
        return errors;
    };

  const handleCreateOrder = async (payment) => {

    try {
        const response = await axios.post(`http://localhost:8084/orders/placeOrder/payment/${payment}`);
        console.log(response.data);
        alert("Order is successfully placed");
        navigate('/orderhistory');
      } catch (error) {
        console.log(error);
      }
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`http://localhost:8086/payment/create/user/${userEmail}/paymentMode/${paymentMode}`, {card});
        console.log(response.data);
        console.log(response.data.id);
        handleCreateOrder(response.data.id);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(validationErrors);
    }
  }

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCard({
      ...card,
      [name]: value
    });
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
            <h2>Payment</h2>
            <p style={{margin:"-2px", color:"green",fontSize:"14px"}}>You are one step ahead of placing order for subscribing to the crop.</p>
            <div className='cart-bottom'>
              <h4>Total Amount to be paid: &#8377;{totalPrice}</h4>
            </div>
            <div className="cart-grid" style={{backgroundColor: "#f0f1f3", marginTop:"-20px"}}>
                <form className='form-control' onSubmit={handlePayment}>
                <div>
                <label>
                    Cardholder Name:
                    <input type="text" name="cardHolderName" value={card.cardHolderName}placeholder="John Doe"  onChange={onInputChange} required/>
                </label>
                {errors.cardHolderName && (
                <div className="error">{errors.cardHolderName}</div>
                )}
                </div>
                <div>
                <label>
                    Card Number:
                    <input type="text" name="cardNumber" value={card.cardNumber} placeholder="1234 5678 9012 3456" onChange={onInputChange} required/>
                </label>
                {errors.cardNumber && (
                <div className="error">{errors.cardNumber}</div>
                )}
                </div>
                <div>
                <label>
                    Expiration Date:
                    <input type="text" name="expirationDate" value={card.expirationDate} placeholder="12/23" onChange={onInputChange} required/>
                </label>
                {errors.expirationDate && (
                <div className="error">{errors.expirationDate}</div>
                )}
                </div>
                <div>
                <label>
                    CVV Number:
                    <input type="text" name="cvvNumber" value={card.cvvNumber} placeholder="123" onChange={onInputChange} required/>
                </label>
                {errors.cvvNumber && (
                <div className="error">{errors.cvvNumber}</div>
                )}
                {/* {errors.card && errors.card.cvvNumber && (
                <div className="error">{errors.card.cvvNumber}</div>
                )} */}
                </div>
                <div>
                <label>
                    Card Type:
                    <select name="cardType" value={card.cardType} onChange={onInputChange} required>
                      <option value="">Select</option>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                    <option value="American Express">American Express</option>
                    </select>
                </label>
                {errors.cardType && (
                <div className="error">{errors.cardType}</div>
                )}
                </div>
                <div>
                <button type='submit' className='checkout-btn' style={{backgroundColor: "rgb(203, 85, 121)", marginTop: "10px"}}> Pay Now</button>
                </div>
                </form>
            </div>
            <p style={{color: "red", fontSize: "small", marginTop:"10px"}}>**Orders once placed cannot be cancelled and are non-refundable**</p>
            <br></br>
        </div>
      </div>
    </>
  );
}

export default Payment;
