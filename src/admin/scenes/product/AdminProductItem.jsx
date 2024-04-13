import React from "react";
import AppUrl from "../../../Api/AppUrl";
import { Link } from "react-router-dom";
export default function AdminProductItem(props) {
  const stt = props.stt;
  const product = props.product;
  const handleDelete = props.handleDelete;
  const handlePublish = props.handlePublish;
  const myView =
    product.attributes.publishedAt == null ? (
      <input
        type="range"
        min="0"
        max="1"
        value="0"
        style={{ width: "40px" }}
        onClick={handlePublish}
        name={product.id}
      />
    ) : (
      <input
        type="range"
        min="0"
        max="1"
        value="1"
        style={{ width: "40px" }}
        onClick={handlePublish}
        name={product.id}
      />
    );
  return (
    <tr className="odd">
      <td className="dtr-control sorting_1" tabIndex={0}>
        {stt}
      </td>
      <td>{product.id}</td>
      <td>{product.attributes.productName}</td>
      <td>
        {" "}
        <img
          style={{ width: "80px", height: "80px" }}
          src={
            AppUrl.ImageURL + product.attributes.image.data[0].attributes.url
          }
          alt="hinh san pham"
        />
      </td>
      <td> {product.attributes.price}</td>
      <td> {myView}</td>
      <td className="text-center" style={{ fontSize: "1.2em" }}>
        <Link
          to={"/admin/product/edit/" + product.id}
          className="btn btn-sm btn-primary"
        >
          <i name={product.id} class="icon-edit"></i>
        </Link>

        <a className="btn btn-sm btn-danger">
          <i name={product.id} class="fas fa-trash" onClick={handleDelete}></i>
        </a>
      </td>
    </tr>
  );
}
