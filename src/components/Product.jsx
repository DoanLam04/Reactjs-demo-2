import React, { useState } from "react";
import { useSelector } from "react-redux";

import AppUrl from "../Api/AppUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../state/cartSlice";
import currency from "currency.js";
import { Navigate } from "react-router-dom";

export default function Product(props) {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(
    useSelector((state) => state.user.role)
  );
  var product = props.product;
  const myView =
    userRole === "Public" ? (
      <Link to="/login" className="shopBtn" title="add to cart">
        Add to cart
      </Link>
    ) : (
      <Link
        className="shopBtn"
        to="#st"
        title="add to cart"
        onClick={() => dispatch(addToCart({ item: { ...product, count: 1 } }))}
      >
        Add to cart
      </Link>
    );
  return (
    <div className="thumbnail">
      <Link to={"/product/" + product.id}>
        <img
          src={
            AppUrl.ImageURL + product.attributes.image.data[0].attributes.url
          }
          style={{ height: "250px" }}
          alt="tam"
        />
      </Link>
      <div className="caption cntr">
        <Link to={"/product/" + product.id}>
          <p>{product.attributes.productName}</p>
        </Link>
        <Link to={"/product/" + product.id}>
          <p>
            <strong>
              {currency(product.attributes.price, {
                symbol: "đ ",
                separator: ".",
                decimal: ",",
              }).format()}
            </strong>
          </p>
        </Link>
        <h4>{myView}</h4>
      </div>
    </div>
  );
}
