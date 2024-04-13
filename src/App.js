import "./App.css";
import React, { useState, useEffect } from "react";
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
  const [isScrolledToTop, setIsScrolledToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setIsScrolledToTop(scrollPosition / scrollHeight >= 0.4);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run only once

  const handleScrollToTopClick = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Provider store={store}>
        <AppBar />
        <div className="container" style={{ position: "relative" }}>
          <Banner />
          <NavBar />
          <Outlet />
          <button
            className="btn btn-primary"
            style={{
              position: "absolute",
              right: "0px",
              width: "50px",
              height: "50px",
              visibility: isScrolledToTop ? "visible" : "hidden",
            }}
            onClick={handleScrollToTopClick}
          >
            <i class="fas fa-arrow-up"></i>{" "}
          </button>
          {/* <Loading /> */}
          <Footer />
        </div>
        <Copyright />
      </Provider>
    </div>
  );
}
