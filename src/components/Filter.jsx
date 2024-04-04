import React from "react";

export default function Filter(props) {
  var handleFilterByName = props.handleFilterByName;
  var handleFilterByMaxPrice = props.handleFilterByMaxPrice;
  return (
    <div className="well well-small">
      <input
        type="text"
        placeholder="Search"
        className="search-query span2"
        onChange={handleFilterByName}
      />
      Max:
      <input
        type="text"
        placeholder="Filter"
        className="search-query span2"
        onChange={handleFilterByMaxPrice}
      />
    </div>
  );
}
