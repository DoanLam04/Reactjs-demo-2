import React, { useEffect, useState } from "react";
import { categoryApi } from "../Api/categoryApi";
import SelectBox from "./SelectBox";
export default function CategorySelect(props) {
  const handleChange = props.handleChange;

  var [categories, setCategories] = useState([]);
  var [loading, setLoading] = useState(true);

  var myView =
    loading === true ? (
      <select>
        <option></option>
      </select>
    ) : (
      <SelectBox
        name="category"
        data={categories}
        defaultValue="13"
        handleChange={handleChange}
      />
    );
  useEffect(() => {
    const fetchData = async () => {
      var response = await categoryApi.getAll();
      var temp = response.data.data;

      setCategories(
        temp.map((category) => {
          return {
            value: category.id,
            label: category.attributes.categoryName,
          };
        })
      );
      console.log(temp);
      console.log(categories);
      setLoading(false);
    };
    fetchData();
  }, []);
  return <>{myView}</>;
}
