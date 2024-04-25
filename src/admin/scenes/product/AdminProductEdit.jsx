import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CategorySelect from "../../../components/CategorySelect";
import { productApi } from "../../../Api/productApi";
import { validateProduct } from "../../helpers/validate";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "../../../components/FileUpload";
import AppUrl from "../../../Api/AppUrl";
import { Link, useParams } from "react-router-dom";
export default function AdminProductEdit() {
  const { id } = useParams();
  const [data, setData] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      var params = {
        populate: "*",
      };
      var response = await productApi.get(id, params);
      var oldProduct = response.data.data;
      /*set giá trị biến data */
      setData({
        productName: oldProduct.attributes.productName,
        description: oldProduct.attributes.description,
        category: oldProduct.attributes.category.data.id,
        price: oldProduct.attributes.price,
        image: oldProduct.attributes.image.data.map((img) => img.id),
      });
      /* tạo mảng oldImages chứa id và url của hình ảnh */
      var oldImages = oldProduct.attributes.image.data.map((img) => {
        return {
          id: img.id,
          url: img.attributes.url,
        };
      });
      /* set giá trị cho mảng images */
      setImages([...oldImages]);
    };
    fetchData();
  }, [id]);
  const addImage = (id, url) => {
    setData({
      ...data,
      image: [...data.image, id],
    });
    setImages([
      ...images,
      {
        id: id,
        url: url,
      },
    ]);
  };
  const handleRemove = (e) => {
    var id = e.target.name;
    setData({
      ...data,
      image: data.image.filter((img) => {
        return img != id;
      }),
    });
    setImages(
      images.filter((img) => {
        return img.id != id;
      })
    );
  };
  const myViewImage =
    images.length == 0
      ? "no image"
      : images.map((img) => {
          return (
            <div>
              <img
                src={AppUrl.ImageURL + img.url}
                alt="hinh"
                style={{ margin: "5px", width: "100px", height: "100px" }}
              />
              <button className="btn" name={img.id} onClick={handleRemove}>
                Remove
              </button>
            </div>
          );
        });

  const handleSubmit = (e) => {
    e.preventDefault();
    var err = validateProduct(data);
    if (err == "") {
      const updateProduct = async (id, data) => {
        var sendData = {
          data: data,
        };

        try {
          const response = await productApi.update(id, sendData);
          console.log(response);
          if (response.status == "200") toast.success("thanh cong");
          document.getElementById("editProduct").reset();
          setData({
            addImage: "",
            productName: "",
            description: "",
            category: "",
            price: "",
            image: "",
          });
        } catch (error) {
          toast.error("bi loi:" + error);
        }
      };
      updateProduct(id, data);
    } else {
      toast.error(err);
      return false;
    }
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
        <h2>Edit Product</h2>
      </div>
      <div className="row">
        <div className="col-7">
          <form id="editProduct" onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="productName" className="col-4 col-form-label">
                Product Name
              </label>
              <div className="col-8">
                <input
                  id="productName"
                  name="productName"
                  placeholder="productName"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={data.productName}
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
              <label htmlFor="price" className="col-4 col-form-label">
                Price
              </label>
              <div className="col-8">
                <input
                  id="price"
                  name="price"
                  type="number"
                  onChange={handleChange}
                  className="form-control"
                  required="required"
                  value={data.price}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="select" className="col-4 col-form-label">
                Category
              </label>
              <div className="col-8">
                <CategorySelect
                  handleChange={handleChange}
                  defaultValue={data.category}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="offset-4 col-md-8">
                <button name="submit" type="submit" className="btn btn-primary">
                  Submit
                </button>
                <Link to={"/admin/product"}>
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
        <div className="col-5">
          <FileUpload addImage={addImage} />
          <div id="uploadImgs">{myViewImage}</div>
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
