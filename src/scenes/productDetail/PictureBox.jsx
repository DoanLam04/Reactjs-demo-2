import React from "react";
import AppUrl from "../../Api/AppUrl";

export default function PictureBox(props) {
  var image = props.images;
  var myView = image.map((image, key) => {
    console.log(key);
    if (key == 0)
      return (
        <div className="active item">
          <a href="#st">
            <img src={AppUrl.ImageURL + image.attributes.url} alt="tam" />
          </a>
        </div>
      );
    else
      return (
        <div className="item">
          <a href="#st">
            <img src={AppUrl.ImageURL + image.attributes.url} alt="tam" />
          </a>
        </div>
      );
  });

  return (
    <div id="myCarousel" className="carousel slide">
      {/* Carousel items */}
      <div className="carousel-inner">{myView}</div>
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
