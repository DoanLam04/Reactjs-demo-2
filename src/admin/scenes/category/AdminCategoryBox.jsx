import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Paginate from "../../../components/Paginate";
import { categoryApi } from "../../../Api/categoryApi";
import Loading from "../../../components/Loading";
import Search from "../../../components/Search";
import AdminCategoryItem from "./AdminCategoryItem";

export default function AdminCategoryBox() {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalPage, settotalPage] = useState(1);
  const [msgSuccess, setSuccessMsg] = useState("");
  const [msgWarning, setWarningMsg] = useState("");
  const [loadData, setLoadData] = useState(1);
  const [viewOption, setViewOption] = useState("preview");
  const [filterKey, setFilterKey] = useState("");
  const { pageNum } = useParams();

  const handleSelect = (e) => {
    setViewOption(e.target.value);
  };
  const handlePublish = (e) => {
    const data = {
      data: {
        publishedAt: e.target.value == 0 ? Date.now() : null,
      },
    };

    const togglePublish = async (e) => {
      await categoryApi.update(e.target.getAttribute("name"), data);
      setLoadData(loadData + 1);
    };
    togglePublish(e);
  };
  const handleFilterByName = (e) => {
    setFilterKey(e.target.value);
  };
  const handleDelete = (e) => {
    console.log("e", e);
    const deleteCategory = async (id) => {
      console.log("id: " + id);
      const c = window.confirm("delete category?");
      if (c === true)
        try {
          e.target.classList.remove("fa-trash");
          e.target.classList.add("fa-spinner");
          await categoryApi.del(id);
          e.target.classList.add("fa-trash");
          e.target.classList.remove("fa-spinner");
          setSuccessMsg("Xoa thanh cong: " + id);
          setLoadData(loadData + 1);
        } catch (error) {
          setWarningMsg("Delete error: " + id + " " + error);
        } finally {
          window.scroll(0, 0);
        }
    };
    deleteCategory(e.target.getAttribute("name"));
  };
  const params = {
    populate: "*",
    "pagination[pageSize]": 12,
    "pagination[page]": pageNum ? pageNum : 1,
    publicationState: viewOption,
    filters: {
      categoryName: { $contains: filterKey ? filterKey : null },
    },
  };
  var myView =
    loading === true ? (
      <Loading />
    ) : (
      categories.map((category, i) => (
        <AdminCategoryItem
          key={category.id}
          stt={(pageNum - 1) * 12 + i + 1}
          category={category}
          handleDelete={handleDelete}
          handlePublish={handlePublish}
        />
      ))
    );
  useEffect(() => {
    const fetchData = async () => {
      var response = await categoryApi.getAll(params);
      console.log(response);
      setCategories(response.data.data);
      settotalPage(response.data.meta.pagination.pageCount);
      setLoading(false);
    };
    fetchData();
  }, [pageNum, filterKey, loadData, viewOption]);
  return (
    <div className="card-body">
      <div className="col-12">
        <p className="bg-success">{msgSuccess}</p>
        <p className="bg-warning">{msgWarning}</p>
      </div>
      <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Link to="/admin/category/add" className="btn btn-primary">
              Create Category
            </Link>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="row">
              <div className="col-md-6">
                <div id="example1_filter" className="dataTables_filter">
                  <select onChange={handleSelect}>
                    <option value="preview">Preview</option>
                    <option value="live">Live</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                {" "}
                <Search handleFilterByName={handleFilterByName} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table
              id="example1"
              className="table table-bordered table-striped dataTable dtr-inline"
              aria-describedby="example1_info"
            >
              <thead>
                <tr>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example1"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Browser: activate to sort column ascending"
                  >
                    {" "}
                    STT{" "}
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example1"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Browser: activate to sort column ascending"
                  >
                    Category ID{" "}
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example1"
                    rowSpan={1}
                    colSpan={1}
                    aria-sort="ascending"
                    aria-label="Rendering engine: activate to sort column descending"
                  >
                    Category Name
                  </th>

                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example1"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Engine version: activate to sort column ascending"
                  >
                    Publish
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example1"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="CSS grade: activate to sort column ascending"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{myView}</tbody>
            </table>
          </div>
          <Paginate
            totalPage={totalPage}
            currentPage={pageNum ? pageNum : 1}
            basePath="http://localhost:3000/admin/category/page/"
          />
        </div>
      </div>
    </div>
  );
}
