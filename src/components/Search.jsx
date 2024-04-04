import React from "react";

export default function Search(props) {
  var handleFilterByName = props.handleFilterByName;

  return (
    <div>
      <label>
        <input
          type="search"
          className="form-control form-control-sm"
          placeholder="Search"
          aria-controls="example1"
          onChange={handleFilterByName}
        />
      </label>
    </div>
  );
}
