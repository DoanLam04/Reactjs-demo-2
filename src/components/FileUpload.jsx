import React, { useState } from "react";
import axios from "axios";
export default function FileUpload(props) {
  var addImage = props.addImage;
  var [file, setFile] = useState([]);
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    console.log("chon file", e.target.files);
  };

  const handleUpload = async (e) => {
    console.log("send file", file);
    const data = new FormData();
    data.append("files", file);
    e.target.innerText = "Uploading...";
    const response = await axios({
      method: "POST",
      url: "http://localhost:1337/api/upload",
      data,
    });
    e.target.innerText = "Uploaded";
    var id = response.data[0].id;
    var url = response.data[0].url;
    addImage(id, url);
    console.log(response);
  };

  return (
    <div className="fileupload">
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
