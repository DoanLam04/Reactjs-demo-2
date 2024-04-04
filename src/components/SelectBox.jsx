import React from "react";

export default function SelectBox(props) {
  var name = props.name;
  var data = props.data;
  const handleChange = props.handleChange;
  var defaultValue = props.defaultValue;
  var myView = data.map((dataItem) => {
    return <option value={dataItem.value}>{dataItem.label}</option>;
  });
  return (
    <select name={name} value={defaultValue} onChange={handleChange}>
      {myView}
    </select>
  );
}
