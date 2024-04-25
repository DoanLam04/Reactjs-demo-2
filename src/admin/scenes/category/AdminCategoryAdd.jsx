import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { categoryApi } from "../../../Api/categoryApi";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

export default function AdminCategoryAdd() {
  const [data, setData] = useState({
    categoryName: "",
    description: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const addCategory = async (data) => {
      var sendData = {
        data: data,
      };
      try {
        const response = await categoryApi.add(sendData);
        console.log(response);
        if (response.status == "200") toast.success("thanh cong");
        document.getElementById("createCategory").reset();
        setData({
          categoryName: "",
          description: "",
        });
      } catch (error) {
        toast.error("bi loi:" + error);
      }
    };
    addCategory(data);
  };
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    console.log("data", data);
  };
  return (
    <div className="row">
      <div className="col-7">
        {" "}
        <form id="createCategory" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="categoryName" className="col-4 col-form-label">
              Category Name
            </label>
            <div className="col-8">
              <input
                id="categoryName"
                name="categoryName"
                placeholder="categoryName"
                type="text"
                required="required"
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="description" className="col-4 col-form-label">
              Description
            </label>
            <div className="col-8">
              <textarea
                id="description"
                name="description"
                onChange={handleChange}
                cols={40}
                rows={5}
                className="form-control"
                defaultValue={""}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="offset-4 col-8">
              <button name="submit" type="submit" className="btn btn-primary">
                Submit
              </button>
              <Link to={"/admin/category"}>
                <button
                  name="submit"
                  type="submit"
                  className="btn btn-success"
                  style={{ marginLeft: "15px" }}
                >
                  Back
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocus
        Loss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
