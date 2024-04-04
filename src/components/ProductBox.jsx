import React from "react";
import Product from "../components/Product";

export default function ProductBox(props) {
  const products = props.products;
  var myView = products.map((product) => (
    <li
      key={product.id}
      className="span3"
      style={{ height: "400px", margin: "1px" }}
    >
      <Product product={product} />
    </li>
  ));
  return (
    <div className="well well-small" style={{ background: "white" }}>
      <h3>Our Products </h3>
      <div className="row-fluid">
        <ul className="thumbnails">{myView}</ul>
      </div>
    </div>
  );
}
