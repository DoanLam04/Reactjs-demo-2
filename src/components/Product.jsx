import React from "react";
import AppUrl from "../Api/AppUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../state/cartSlice";
import currency from "currency.js";

export default function Product(props) {
  const dispatch = useDispatch();
  var product = props.product;
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
        <h4>
          <Link
            className="shopBtn"
            to="#st"
            title="add to cart"
            onClick={() =>
              dispatch(addToCart({ item: { ...product, count: 1 } }))
            }
          >
            Add to cart
          </Link>
        </h4>
      </div>
    </div>
  );
}
