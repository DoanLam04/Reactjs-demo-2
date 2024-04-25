import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppUrl from "../../Api/AppUrl";
import { Link } from "react-router-dom";
import currency from "currency.js";
import { useDispatch } from "react-redux";
import { setRole } from "../../state/userSlice";
import { Navigate } from "react-router-dom";
import {
  removeFromCart,
  increaseCount,
  decreaseCount,
} from "../../state/cartSlice";
export default function CartMenu() {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(
    useSelector((state) => state.user.role)
  );

  var cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => {
    return total + item.count;
  }, 0);
  const total = cartItems.reduce((totalPrice, item) => {
    console.log(item);
    return totalPrice + item.count * item.attributes.price;
  }, 0);

  var myView = cartItems.map((item) => (
    <tr>
      <td>
        <img
          width={100}
          src={AppUrl.ImageURL + item.attributes.image.data[0].attributes.url}
          alt="tam"
        />
      </td>
      <td>{item.attributes.productName}</td>
      <td> - </td>
      <td>
        <span className="shopBtn">
          <span
            className="icon-
    ok"
          />
        </span>{" "}
      </td>
      <td>
        {currency(item.attributes.price, {
          symbol: "d",
          separator: ".",
          decimal: ",",
        }).format()}
      </td>
      <td>
        <input
          className="span1"
          style={{ maxWidth: 34 }}
          placeholder={1}
          id="appendedInputButtons"
          size={16}
          type="text"
          Value={item.count}
        />
        <div className="input-append">
          <button
            className="btn btn-mini"
            type="button"
            onClick={() => dispatch(decreaseCount({ id: item.id }))}
          >
            -
          </button>
          <button
            className="btn btn-mini"
            type="button"
            onClick={() => dispatch(increaseCount({ id: item.id }))}
          >
            +{" "}
          </button>
          <button
            className="btn btn-mini btn-
    danger"
            type="button"
            onClick={() => dispatch(removeFromCart({ id: item.id }))}
          >
            <span className="icon-remove" />
          </button>
        </div>
      </td>
      <td>
        {currency(item.attributes.price * item.count, {
          symbol: ".",
          decimal: ",",
        }).format()}
      </td>
    </tr>
  ));

  return (
    <div className="well well-small">
      {userRole === "Public" && <Navigate to="/login" replace={true} />}
      <h1>
        Cart{" "}
        <small className="pull-right">
          {" "}
          {totalItems} Items are in the cart{" "}
        </small>
      </h1>
      <hr className="soften" />
      <table className="table table-bordered table-condensed">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th> Ref. </th>
            <th>Avail.</th>
            <th>Unit price</th>
            <th>Qty </th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {myView}
          <tr>
            <td colSpan={6} className="alignR">
              {" "}
              Total product:{totalItems}
            </td>
            <td className="label label-primary">
              {currency(total, {
                symbol: "d",
                separator: ".",
                decimal: ",",
              }).format()}
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="/product" className="shopBtn btn-large">
        <span className="icon-arrow-left" /> Continue Shopping{" "}
      </Link>
      <a href="login.html" className="shopBtn btn-large pull-right">
        Next <span className="icon-arrow-right" />
      </a>
    </div>
  );
}
