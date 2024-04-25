import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { categoryApi } from "../../../Api/categoryApi";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";

export default function AdminCategoryEdit() {
  const { id } = useParams();
  const [data, setData] = useState({
    categoryName: "",
    description: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        populate: "*",
      };
      const response = await categoryApi.get(id, params);
      const oldCategory = response.data.data;
      /*set giá trị biến data */
      setData({
        categoryName: oldCategory.attributes.categoryName,
        description: oldCategory.attributes.description,
      });
    };
    fetchData();
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const updateCategory = async (id, data) => {
      const sendData = {
        data: data,
      };
      try {
        const response = await categoryApi.update(id, sendData);
        console.log(response);
        if (response.status == "200") toast.success("thanh cong");
        document.getElementById("editCategory").reset();
        setData({
          categoryName: "",
          description: "",
        });
      } catch (error) {
        toast.error("bi loi:" + error);
      }
    };
    updateCategory(id, data);
  };
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    console.log("data", data);
  };
  return (
    <div>
      <div className="row">
        <h2>Edit Category</h2>
      </div>
      <div className="row">
        <div className="col-7">
          <form id="editCategory" onSubmit={handleSubmit}>
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
                  className="form-control"
                  onChange={handleChange}
                  value={data.categoryName}
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
                  value={data.description}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="offset-4 col-md-8">
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
              </div>{" "}
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
    </div>
  );
}
