import React from "react";
import CategoryMenu from "./CategoryMenu";
import ProductBox from "../../components/ProductBox";
import Loading from "../../components/Loading";
import { useState } from "react";
import { useEffect } from "react";
import { categoryApi } from "../../Api/categoryApi";
import { productApi } from "../../Api/productApi";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";
import Filter from "../../components/Filter";
export default function ProductList() {
  var [categories, setCategories] = useState({});
  var [products, setProducts] = useState({});
  var [loading, setLoading] = useState(true);
  var { pageNum } = useParams();
  var [totalPage, settotalPage] = useState(1);
  var [filterKey, setFilterKey] = useState("");
  var [maxPrice, setMaxPrice] = useState(100000);
  var [category, setCategory] = useState(null);

  const handleFilterByName = (e) => {
    setFilterKey(e.target.value);
  };

  const handleFilterByMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };
  const handleFilterByCategory = (e) => {
    if (e.target.innerText === `All categories`) setCategory(null);
    else setCategory(e.target.innerText);
  };

  var params = {
    populate: "*",
    pagination: {
      page: pageNum ? pageNum : 1,
      pageSize: 12,
    },
    filters: {
      productName: { $contains: filterKey ? filterKey : null },
      price: { $lt: maxPrice ? maxPrice : 1000000 },
      category: { categoryName: { $eq: category ? category : null } },
    },
  };
  // "pagination[pagesize": 12,
  // "pagination[page]":
  // "filters[productName][$contains]": filterKey ? filterKey : null,
  // "filters[price][$lt]": maxPrice ? maxPrice : 100000,

  var myView1 =
    loading === true ? (
      <Loading />
    ) : (
      <CategoryMenu
        categories={categories}
        handleFilterByCategory={handleFilterByCategory}
      />
    );
  var myView2 =
    loading === true ? <Loading /> : <ProductBox products={products} />;

  useEffect(() => {
    const fetchData = async () => {
      var response1 = await categoryApi.getAll();
      var response2 = await productApi.getAll(params);

      setCategories(response1.data.data);
      setProducts(response2.data.data);
      settotalPage(response2.data.meta.pagination.pageCount);
      setLoading(false);
    };
    fetchData();
  }, [pageNum, filterKey, maxPrice, category]);

  return (
    <div className="row">
      <div id="sidebar" className="span3">
        {myView1}
      </div>
      <div className="span9">
        <Filter
          handleFilterByName={handleFilterByName}
          handleFilterByMaxPrice={handleFilterByMaxPrice}
          handleFilterByCategory={handleFilterByCategory}
        />
        {myView2}
        <Paginate
          totalPage={totalPage}
          currentPage={pageNum ? pageNum : 1}
          basePath="http://localhost:3000/product/page/"
        />{" "}
      </div>
    </div>
  );
}
