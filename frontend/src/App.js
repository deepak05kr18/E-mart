import './App.css';
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import  WebFont from "webfontloader";
import React, { useState, useEffect } from 'react';
import Footer from "./component/layout/Footer/footer"
import Home from "./component/Home/Home"
import Loader from './component/layout/Loader/loader';
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import {loadUser} from "./actions/userAction"
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js'
import ForgotPassword from './component/User/ForgotPassword.js'
import ResetPassword from './component/User/ResetPassword.js'
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js'
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import Payment from "./component/Cart/Payment.js"
import axios from 'axios';
import{ Elements} from "@stripe/react-stripe-js";
import{ loadStripe} from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Orders/myOrders.js";
import OrderDetails from "./component/Orders/orderDetails.js"
import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/productList.js"
import NewProduct from "./component/Admin/NewProduct.js"
import UpdateProduct from "./component/Admin/UpdateProduct.js"
import OrderList from "./component/Admin/OrderList.js"
import ProcessOrder from "./component/Admin/ProcessOrder.js"
import UserList from "./component/Admin/UserList.js"
import UpdateUser from "./component/Admin/UpdateUser.js"
import ProductReviews from "./component/Admin/ProductReviews.js"
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About.js";

function App() {
  const { isAuthenticated, user} =useSelector((state)=> state.user) 
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(()=>{
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    
    <Elements stripe={loadStripe(stripeApiKey)}>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
       <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sad" element={<Loader />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/about" element={<About />} />

        <Route exact path="/account" element={
        <ProtectedRoute> 
        <Route path="/" element={<Profile />} /> 
        </ProtectedRoute>}   
        />

        <Route exact path="/me/update" element={
        <ProtectedRoute> 
        <Route path="/" element={<UpdateProfile />} /> 
        </ProtectedRoute>}   
        />

        <Route exact path="/password/update" element={
        <ProtectedRoute> 
        <Route path="/" element={<UpdatePassword />} /> 
        </ProtectedRoute>}   
        />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart/>} />

        <Route exact path="/login/shipping" element={
        <ProtectedRoute> 
        <Route path="/" element={<Shipping />} /> 
        </ProtectedRoute>}   
        />

        <Route exact path="/order/confirm" element={
        <ProtectedRoute> 
        <Route path="/" element={<ConfirmOrder />} /> 
        </ProtectedRoute>}   
        />
         
        {stripeApiKey &&( 
        <Route exact path="/process/payment" element={
        <ProtectedRoute> 
        <Route path="/" element={<Payment /> }/>
        </ProtectedRoute>}   
        />
        )}

        <Route exact path="/success" element={
        <ProtectedRoute> 
        <Route path="/" element={<OrderSuccess />} /> 
        </ProtectedRoute>}   
        />
       
       <Route exact path="/orders" element={
        <ProtectedRoute> 
        <Route path="/" element={<MyOrders />} /> 
        </ProtectedRoute>}   
        />
        
        <Route exact path="/order/:id" element={
        <ProtectedRoute> 
        <Route path="/" element={<OrderDetails />} /> 
        </ProtectedRoute>}   
        />

        <Route exact path="/admin/dashboard" element={
        <ProtectedRoute isAdmin={true}>
        <Route path="/" element={<Dashboard />} /> 
        </ProtectedRoute>}
        />

        <Route exact path="/admin/products" element={
        <ProtectedRoute isAdmin={true}>
        <Route path="/" element={<ProductList />} /> 
        </ProtectedRoute>}
        />

        <Route exact path="/admin/product" element={
        <ProtectedRoute isAdmin={true}>
        <Route path="/" element={<NewProduct />} /> 
        </ProtectedRoute>}
        />

        <Route exact path="/admin/product/:id" element={
        <ProtectedRoute isAdmin={true}>
        <Route path="/" element={<UpdateProduct />} /> 
        </ProtectedRoute>}
        />

        <Route exact path="/admin/orders" element={
        <ProtectedRoute isAdmin={true}>
        <Route path="/" element={<OrderList />} /> 
        </ProtectedRoute>}
        />

        <Route exact path="/admin/order/:id" element={
        <ProtectedRoute isAdmin={true}>
        <Route path="/" element={<ProcessOrder />} /> 
        </ProtectedRoute>}
        /> 

        <Route exact path="/admin/users" element={
        <ProtectedRoute isAdmin={true}>
        <Route path="/" element={<UserList />} /> 
        </ProtectedRoute>}
        /> 

        <Route exact path="/admin/user/:id" element={
        <ProtectedRoute isAdmin={true}>
        <Route path="/" element={<UpdateUser />} /> 
        </ProtectedRoute>}
        /> 

        <Route exact path="/admin/reviews" element={
        <ProtectedRoute isAdmin={true}>
        <Route path="/" element={<ProductReviews />} /> 
        </ProtectedRoute>}
        />




      </Routes>
        <Footer />
      </Router>
      </Elements>
    
  )
}

export default App;




/*
    "email": "goluu@gamil.com",
    "password": "golu1234567890"


    https://github.com/meabhisingh/mernProjectEcommerce/blob/master/frontend/src/component/layout/Header/UserOptions.js
}*/