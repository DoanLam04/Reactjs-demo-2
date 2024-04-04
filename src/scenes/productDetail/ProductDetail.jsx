import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { productApi } from "../../Api/productApi";
import PictureBox from "./PictureBox";
import { useEffect } from "react";
import currency from "currency.js";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state/cartSlice";

export default function ProductDetail() {
  const dispatch = useDispatch();

  var { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  var params = { populate: "*" };
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await productApi.get(id, params);
      setProduct(response.data.data);
      setLoading(false);
      console.log(response);
    };
    fetchProduct();
  }, []);
  var myView1 =
    loading == true ? (
      <Loading />
    ) : (
      <PictureBox images={product.attributes.image.data} />
    );
  var myView2 =
    loading == true ? (
      <Loading />
    ) : (
      <div className="span7">
        <h3>
          {product.attributes.productName} [
          {currency(product.attributes.price, {
            symbol: "đ ",
            separator: ".",
            decimal: ",",
          }).format()}
          ]
        </h3>
        <hr className="soft" />
        <form className="form-horizontal qtyFrm">
          <div className="control-group">
            <label className="control-label">
              <span>
                {currency(product.attributes.price, {
                  symbol: "đ ",
                  separator: ".",
                  decimal: ",",
                }).format()}
              </span>
            </label>
            <div className="controls">
              <input type="number" className="span6" placeholder="Qty." />
            </div>
          </div>
          <div className="control-group">
            <label className="control-label">
              <span>Color</span>
            </label>
            <div className="controls">
              <select className="span11">
                <option>Red</option>
                <option>Purple</option>
                <option>Pink</option>
                <option>Red</option>
              </select>
            </div>
          </div>

          <h4>100 items in stock</h4>
          <p>
            Nowadays the lingerie industry is one of the most successful
            business spheres. Nowadays the lingerie industry is one of ...
          </p>
          <p>
            <button type="submit" className="shopBtn">
              <Link
                to="#st"
                className="shopBtn"
                onClick={() =>
                  dispatch(addToCart({ item: { ...product, count: 1 } }))
                }
              >
                Add to cart
              </Link>
            </button>
          </p>
        </form>
      </div>
    );
  var myView3 =
    loading == true ? <Loading /> : <div>{product.attributes.description}</div>;
  return (
    <div className="well well-small">
      <div className="row-fluid">
        <div className="span5">{myView1}</div>
        <div className="span7"> {myView2}</div>
      </div>
      <hr className="softn clr" />
      <ul id="productDetail" className="nav nav-tabs">
        <li className="active">
          <a href="#home" data-toggle="tab">
            Product Details
          </a>
        </li>
      </ul>
      <div id="myTabContent" className="tab-content tabWrapper">
        <div className="tab-pane fade active in" id="home">
          <h4>Product Information</h4>
          {myView3}
        </div>
      </div>
    </div>
  );
}
