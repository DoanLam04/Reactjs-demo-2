import React from "react";
import { Link } from "react-router-dom";

export default function CategoryMenu(props) {
  const categories = props.categories;
  const handleFilterByCategory = props.handleFilterByCategory;
  var myView = categories.map((category) => (
    <li key={category.id}>
      <Link to="/product" onClick={handleFilterByCategory}>
        {category.attributes.categoryName}
      </Link>
    </li>
  ));
  return (
    <div className="well well-small">
      <nav className="megamenu">
        <ul className="nav nav-list">
          <li>
            <Link to="/product" onClick={handleFilterByCategory}>
              All categories
            </Link>
            <hr></hr>
          </li>
          {myView}
        </ul>
      </nav>
    </div>
  );
}
