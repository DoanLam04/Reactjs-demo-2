import React from "react";

export default function MainCarousel() {
  return (
    <div id="myCarousel" className="carousel slide homCar">
      <div className="carousel-inner">
        <div className="item next left">
          <img
            src="/assets/img/slide1.png"
            style={{ width: "100%" }}
            alt="bootstrap ecommerce templates"
          />

          <div className="carousel-caption">
            <h4>Bootstrap shopping cart</h4>
            <p>
              <span>Very clean simple to use</span>
            </p>
          </div>
        </div>
        <div className="item">
          <img
            style={{ width: "100%" }}
            src="/assets/img/banner.jpg"
            alt="bootstrap ecommerce templates"
          />
          <div className="carousel-caption">
            <h4>Bootstrap Ecommerce template</h4>
            <p>
              <span>Highly Google seo friendly</span>
            </p>
          </div>
        </div>
        <div className="item">
          <img
            style={{ width: "100%" }}
            src="/assets/img/slide2.png"
            alt="bootstrap ecommerce templates"
          />
          <div className="carousel-caption">
            <h4>Twitter Bootstrap cart</h4>
            <p>
              <span>Very easy to integrate and expand.</span>
            </p>
          </div>
        </div>
        <div className="item active left">
          <img
            style={{ width: "100%" }}
            src="/assets/img/banner1.jpg"
            alt="bootstrap templates"
          />
          <div className="carousel-caption">
            <h4>Bootstrap templates integration</h4>
            <p>
              <span>Compitable to many more opensource cart</span>
            </p>
          </div>
        </div>
      </div>
      <a className="left carousel-control" href="#myCarousel" data-slide="prev">
        ‹
      </a>
      <a
        className="right carousel-control"
        href="#myCarousel"
        data-slide="next"
      >
        ›
      </a>
    </div>
  );
}
