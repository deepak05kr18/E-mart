import {applyMiddleware,combineReducers, legacy_createStore as createStore} from "redux";
import {composeWithDevTools} from '@redux-devtools/extension';
import thunk from "redux-thunk";
import {newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer} from "./reducers/productReducer";
import {allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer} from "./reducers/userReducer.js";
import {cartReducer} from "./reducers/cartReducer"
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder : newOrderReducer,
  myOrders : myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
})

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
//const middleware = [thunk];
const store = createStore( reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store;










































/*import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getProduct } from "./actions/productAction";


const initialState = {};

const productSlice = createSlice({
  name: "products",
  initialState: [], // Initial state for products
  reducers: {
    getProduct
  },
});
const rootReducer = combineReducers({
  products: productSlice.reducer,
  
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: composeWithDevTools(),
});

export const { actions: productActions } = productSlice;
export default store;




























import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getProduct } from "./actions/productAction";


const initialState = {};

const rootReducer = combineReducers({
  root: createSlice({
    name: "root",
    initialState,
    reducers: {
      products: getProduct,
      // Add other root-level reducers here
    },
  })//.reducer,
 // products: getProduct,
});

const store = configureStore({
  reducer: rootReducer.reducer,
  middleware: [thunk],
  devTools: composeWithDevTools(),
});


export default store;





























import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { getProduct } from "./actions/productAction";

const initialState = {};

const rootReducer = combineReducers({
  root: createSlice({
    name: "root",
    initialState,
    reducers: {
      // Add other root-level reducers here
    },
  }).reducer,
  products: getProduct,
});

export default rootReducer;


















import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;



import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer"; // Import your combined reducer

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
*/
