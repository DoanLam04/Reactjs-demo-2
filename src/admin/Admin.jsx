import React, { useState } from "react";
import Menu from "./components/Menu";
import TopNav from "./components/TopNav";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const [role, setRole] = useState(useSelector((state) => state.user.role));

  const ss = document.createElement("link");
  ss.rel = "stylesheet";
  ss.type = "text/css";
  ss.href = "/admin/dist/css/adminlte.min.css";
  document.head.appendChild(ss);
  return (
    <div className="wrapper">
      {role === "Authenticated" && <Navigate to="/product" replace={true} />}
      {role === "Public" && <Navigate to="/Login" replace={true} />}
      <Menu />
      <TopNav />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6"></div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
