import "./App.css";
import React from "react";
import AppBar from "./scenes/global/AppBar.jsx";
import Banner from "./scenes/global/Banner";
import NavBar from "./scenes/global/NavBar";
import Footer from "./scenes/global/Footer";
import Loading from "./components/Loading.jsx";
import Copyright from "./scenes/global/Copyright.jsx";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";
import FileUpload from "./components/FileUpload.jsx";
export default function App() {
  return (
    <div>
      <Provider store={store}>
        <AppBar />
        <div className="container">
          <Banner />
          <NavBar />
          <Outlet />
          <Loading />
          <Footer />
        </div>
        <Copyright />
        <FileUpload/>
      </Provider>
    </div>
  );
}
