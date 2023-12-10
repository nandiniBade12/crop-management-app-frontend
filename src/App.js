import './App.css';
import HomePage from './components/Pages/HomePage';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import SignUpForm from './components/Pages/SignUpForm';
import FarmerCrops from './components/Farmer/FarmerCrops';
import DealerCrops from './components/Dealer/DealerCrops';
import AddCrops from './components/Farmer/AddCrops';
import UpdateCrop from './components/Farmer/UpdateCrop';
import CartItems from './components/Dealer/CartItems';
import UserLogin from './components/Pages/UserLogin';
import AdminHome from './components/Admin/AdminHome';
import UpdateDealerProfile from './components/Dealer/UpdateDealerProfile';
import UpdateFarmerProfile from './components/Farmer/UpdateFarmerProfile';
import ResetPassword from './components/Pages/ResetPassword';
import OrderHistory from './components/Dealer/OrderHistory';
import Payment from './components/Dealer/Payment';
import Checkout from './components/Dealer/Checkout';
import React, { useState, useEffect } from 'react';
import UpdateAdminProfile from './components/Admin/UpdateAdminProfile';
import OrdersList from './components/Admin/OrdersList';
import UsersList from './components/Admin/UersList';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [state, setstate] = useState(<HomePage />);

  const userData = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  useEffect(() => {

    if (userData != null) {
      setIsLoggedIn(true);
      setRole(userData.role);
      setstate(checkUserSession());
    }
  }, [isLoggedIn, role]);

  useEffect(() => {}, []);

  console.log(isLoggedIn);
  const checkUserSession = () => {
    if (isLoggedIn) {
      return role == "ROLE_ADMIN" ? <AdminHome /> : role == "ROLE_FARMER"? <FarmerCrops />: <DealerCrops/>;
    } else {
      return <HomePage />;
    }
  };

  return (

    <BrowserRouter>
      <div className="App">
        <Routes>
          
          <Route exact path='/' element={state}></Route>

          <Route exact path="/signup" element={<SignUpForm/>}></Route>

          <Route exact path="/login" element={<UserLogin setIsLoggedIn={setIsLoggedIn}/>}></Route>

          <Route exact path="/setpassword" element={<ResetPassword/>}></Route>

          {role === "ROLE_DEALER" ? (
            <>
            <Route exact path="/updatedealer/:id" element={<UpdateDealerProfile/>}></Route>

            <Route exact path='/dealercrops' element={<DealerCrops/>}></Route>

            <Route exact path="/cartitems" element={<CartItems/>}></Route>

            <Route exact path='/checkout' element={<Checkout/>}></Route>

            <Route path='/payment/:paymentMode/:totalPrice' element={<Payment />} />

            <Route exact path='/orderhistory' element={<OrderHistory/>}></Route>
            </>
          ) : undefined}

          {role === "ROLE_FARMER" ? (
            <>
            <Route exact path="/updatefarmer/:id" element={<UpdateFarmerProfile/>}></Route>

            <Route exact path='/farmercrops' element={<FarmerCrops/>}></Route>

            <Route exact path='/updatecrop/:id' element={<UpdateCrop/>}></Route>

            <Route exact path="/addcrop" element={<AddCrops/>}></Route>
            </>
          ) : undefined}

          {role === "ROLE_ADMIN" ? (
            <>
            <Route exact path="/updateadmin/:id" element={<UpdateAdminProfile/>}></Route>

            <Route exact path='/adminhome' element={<AdminHome/>}></Route>

            <Route exact path='/orders' element={<OrdersList/>}></Route>

            <Route exact path='/users' element={<UsersList/>}></Route>
            </>
          ) : undefined}

        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
