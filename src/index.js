import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/Auth';

import "antd/dist/reset.css";
import { SearchProvider } from './context/search';
import { CartProvider } from './context/Cart';

import CookieConsent from "react-cookie-consent";//cookie
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
               <BrowserRouter>
               <CookieConsent
  location="bottom"
  buttonText="Sure man!!"
  cookieName="myAwesomeCookieName2"
  style={{ background: "#2B373B" }}
  buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
  expires={150}
  enableDeclineButton
  onDecline={() => {
    alert("nay!");
  }}>
  This website uses cookies to enhance the user experience.{" "}
  <span style={{ fontSize: "10px" }}></span>
</CookieConsent>
                  <App />
  {/* </React.StrictMode> */}
               </BrowserRouter>
    </CartProvider>
  </SearchProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
