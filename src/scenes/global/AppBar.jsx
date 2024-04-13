import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import currency from "currency.js";
import AuthBox from "./AuthBox";

export default function AppBar() {
  var cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => {
    return total + item.count;
  }, 0);
  console.log(totalItems);
  const total = cartItems.reduce((totalPrice, item) => {
    console.log(item);
    return totalPrice + item.count * item.attributes.price;
  }, 0);

  return (
    <div className="navbar navbar-inverse navbar-fixed-top">
      <div className="topNav">
        <div className="container">
          <div className="alignR">
            <div className="pull-left socialNw">
              <a href="#">
                <span
                  className="icon-twitter"
                  style={{ color: "#242124" }}
                ></span>
              </a>
              <a href="#">
                <span
                  className="icon-facebook"
                  style={{ color: "#242124" }}
                ></span>
              </a>
              <a href="#">
                <span
                  className="icon-youtube"
                  style={{ color: "#242124" }}
                ></span>
              </a>
              <a href="#">
                <span
                  className="icon-tumblr"
                  style={{ color: "#242124" }}
                ></span>
              </a>
            </div>
            <Link to="/">
              <span className="icon-home"></span> Home
            </Link>
            <AuthBox />

            {/* <a href="#">
              <span className="icon-user"></span> My Account
            </a>
            <Link to="/register">
              <span className="icon-edit"></span> Free Register{" "}
            </Link> */}
            <a href="contact.html">
              <span className="icon-envelope"></span> Contact us
            </a>
            <Link to="/cart">
              <span className="icon-shopping-cart" /> {totalItems} Items -{" "}
              <span className="badge badge-warning">
                {currency(total, {
                  symbol: "d",
                  separator: ".",
                  decimal: ",",
                }).format()}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
