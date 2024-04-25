import React from "react";
import { Link } from "react-router-dom";

export default function AdminCategoryItem(props) {
  const stt = props.stt;
  const category = props.category;
  const handleDelete = props.handleDelete;
  const handlePublish = props.handlePublish;
  const myView =
    category.attributes.publishedAt == null ? (
      <input
        type="range"
        min="0"
        max="1"
        value="0"
        style={{ width: "40px" }}
        onClick={handlePublish}
        name={category.id}
      />
    ) : (
      <input
        type="range"
        min="0"
        max="1"
        value="1"
        style={{ width: "40px" }}
        onClick={handlePublish}
        name={category.id}
      />
    );
  return (
    <tr className="odd">
      <td className="dtr-control sorting_1" tabIndex={0}>
        {stt}
      </td>
      <td>{category.id}</td>
      <td>{category.attributes.categoryName}</td>
      <td> {myView}</td>
      <td className="text-center" style={{ fontSize: "1.2em" }}>
        <Link
          to={"/admin/category/edit/" + category.id}
          className="btn btn-sm btn-primary"
        >
          <i name={category.id} class="icon-edit"></i>
        </Link>

        <a className="btn btn-sm btn-danger">
          <i name={category.id} class="fas fa-trash" onClick={handleDelete}></i>
        </a>
      </td>
    </tr>
  );
}
