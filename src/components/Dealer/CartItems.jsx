import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/CartItems.css';
import { Link, useNavigate } from 'react-router-dom';
import NavbarDealer from '../../layouts/NavbarDealer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';

function CartItems() {

  const [cart, setCart] = useState({});

  const [updatedCrop, setUpdatedCrop] = useState('');

  const [itemsCount, setItemsCount] = useState(0);

  const [updatedQuantity, setUpdatedQuantity] = useState(0);

  const [cartItems, setCartItems] = useState([]);

  const userEmail = localStorage.getItem('id');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8083/cart/view/user/${userEmail}`)
      .then(response => {
        setCart(response.data);
        setCartItems(response.data.items);
        setItemsCount(cartItems.length);
      })
      .catch(error => {
        console.log(error);
      });
  }, [cart]);

  const onInputChange = async (e, cropId) => {
    setUpdatedQuantity(e.target.value);
    setUpdatedCrop(cropId);
    const newUpdatedQuantity = e.target.value;
    const newUpdatedCrop = cropId;
    console.log(updatedQuantity);
    console.log(updatedCrop);
    try{
      const response = await axios.post(`http://localhost:8083/cart/add/user/${userEmail}/crop/${newUpdatedCrop}/quantity/${newUpdatedQuantity}`);
      console.log(response.data);
      alert("Item quantity changed!!");
      navigate("/cartitems");
      } catch(error){
          console.error(error);
      }

  };

  const deleteCartItem = async (cartId, cropId) => {
    try{
    await axios.delete(`http://localhost:8083/cart/deleteItem/cartId/${cartId}/cropId/${cropId}`);
    alert("Item deleted from cart");
    navigate("/cartitems");
    } catch(error){
      console.log(error);
    }
  }

  // const handleCheckOut = async (id) => {
  //   try{
  //   const response = await axios.post(`http://localhost:8083/cart/add/user/${userEmail}/crop/${id}/quantity/1`);
  //   console.log(response.data);
  //   alert("Item added to cart Successfully!!!");
  //   navigate("/dealercrops");
  //   } catch(error){
  //       console.error(error);
  //   }
  // }

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
        <h2>Your Cart Items</h2>
        {itemsCount === 0 ? (
          <div>
            <p>Your cart<FontAwesomeIcon icon={faShoppingCart}  /> is empty. </p>
            <p> <a href="/dealercrops">Go back to home</a></p> 
          </div>
          ) : (
            <p>You have {itemsCount} items in your cart <FontAwesomeIcon icon={faShoppingCart} /></p>
          )}
          {itemsCount > 0 && (
            <div className="cart-grid" style={{width: "90%"}}>
              {cartItems.map(item => (
              <div className="cart-card" key={item.crop.id}>
                <img className='cart-image' src={item.crop.image} height="120px" width={"150px"}></img>
                <div className='cart-description'>
                <p className='p1' style={{color:"rgb(55, 83, 207)", fontSize: "medium"}}><b>{item.cropName}</b></p>
                <p className='p1'>Each: <b>&#8377;{item.crop.pricePerUnit}</b></p>
                <p className='p1'>Quantity: <b>{item.quantity}</b></p>
                <p className='p1'>Subtotal: <b> &#8377;{item.subTotal}</b></p>
                </div>
                <div className='cart-remove'>
                  <div>
                  <p>Add Quantity </p>
                  <select id="quantity" name="updatedQuantity" value={updatedQuantity} onChange={(e) => onInputChange(e, item.crop.id)}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                  <option value={60}>60</option>
                  <option value={70}>70</option>
                  <option value={80}>80</option>
                  <option value={90}>90</option>
                  </select>
                  </div>
                <br/>
                <br/>
                <button className='btn btn-danger' onClick={() => deleteCartItem(cart.id,item.crop.id)}> <FontAwesomeIcon icon={faTrash} /> Remove</button>
                </div>
              </div>
              ))}
            </div>
          )}
        <hr></hr>

        {itemsCount > 0 && (
            <div className='cart-bottom'>
              <h3>Total price: &#8377;{cart.totalPrice}</h3>
              <button className='checkout-btn'><Link to= {`/checkout`}>Proceed to Checkout <FontAwesomeIcon icon={faShoppingCart} /></Link></button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartItems;
