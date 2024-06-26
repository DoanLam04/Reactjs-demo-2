import React from "react";

export default function Copyright() {
  return (
    <div className="copyright">
      <div className="container">
        <p className="pull-right">
          <a href="#">
            <img src="/assets/img/maestro.png" alt="payment" />
          </a>
          <a href="#">
            <img src="/assets/img/mc.png" alt="payment" />
          </a>
          <a href="#">
            <img src="/assets/img/pp.png" alt="payment" />
          </a>
          <a href="#">
            <img src="/assets/img/visa.png" alt="payment" />
          </a>
          <a href="#">
            <img src="/assets/img/disc.png" alt="payment" />
          </a>
        </p>
        <span>
          Copyright © 2013
          <br /> bootstrap ecommerce shopping template
        </span>
      </div>
    </div>
  );
}
