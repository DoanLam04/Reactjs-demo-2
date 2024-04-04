import React from "react";

export default function Banner() {
  return (
    <header id="header">
      <div className="row">
        <div className="span4">
          <h1>
            <img src="/assets/img/logo-bootstrap-shoping-cart.png" alt="tam" />
          </h1>
        </div>
        <div className="span4">
          <div className="offerNoteWrapper">
            <h1 className="dotmark">
              <i className="icon-cut" />
              Twitter Bootstrap shopping cart HTML template is available @ $14
            </h1>
          </div>
        </div>
        <div className="span4 alignR">
          <p>
            <br /> <strong> Support (24/7) : 0395539846 </strong>
            <br />
            <br />
          </p>
          <span className="btn btn-mini">
            [ 2 ] <span className="icon-shopping-cart" />
          </span>
          <span className="btn btn-warning btn-mini">$</span>
          <span className="btn btn-mini">£</span>
          <span className="btn btn-mini">€</span>
        </div>
      </div>
    </header>
  );
}
