import React, { useState } from "react";
import axios from "axios";
import AppUrl from "../Api/AppUrl";
import { ToastContainer, toast } from "react-toastify";

export default function FileUpload(props) {
  const addImage = props.addImage;
  const [file, setFile] = useState([]);
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    console.log("chon file", e.target.files);
  };

  const handleUpload = async (e) => {
    try {
      console.log("send file", file);
      const data = new FormData();
      data.append("files", file);
      console.log("data", data);
      e.target.innerText = "Uploading...";
      const response = await axios({
        method: "Post",
        url: AppUrl.BaseURL + "upload",
        data: data,
      });
      e.target.innerText = "Uploaded";
      const id = response.data[0].id;
      const url = response.data[0].url;
      addImage(id, url);
      console.log(response);
    } catch (e) {
      //hiện thị thông báo lỗi
      toast.error("Upload Error", e);
      console.log("error", e);
    }
  };

  return (
    <div className="fileupload">
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <ToastContainer />
    </div>
  );
}
