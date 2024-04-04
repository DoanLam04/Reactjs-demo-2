import React from "react";
import MainCarousel from "./MainCarousel";
import ProductBox from "../../components/ProductBox";
import { productApi } from "../../Api/productApi";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
export default function Home() {
  var [products, setProducts] = useState({});
  var [loading, setLoading] = useState(true);
  var { pageNum } = useParams();
  var [totalPage, settotalPage] = useState(1);

  var params = {
    populate: "*",
    "pagination[pagesize]": 12,
    "pagination[page]": pageNum ? pageNum : 1,
  };
  var myView2 =
    loading === true ? <Loading /> : <ProductBox products={products} />;

  useEffect(() => {
    const fetchData = async () => {
      var response2 = await productApi.getAll(params);
      setProducts(response2.data.data);
      settotalPage(response2.data.meta.pagination.pageCount);
      setLoading(false);
    };
    fetchData();
  }, [pageNum]);
  return (
    <div className="container">
      <MainCarousel />
      <div className="row">
        <div className="span12">
          {myView2}
          <Paginate
            totalPage={totalPage}
            currentPage={pageNum ? pageNum : 1}
            basePath="http://localhost:3000/product/page/"
          />{" "}
        </div>
      </div>
    </div>
  );
}
