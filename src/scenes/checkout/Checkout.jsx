import React from "react";

export default function Checkout() {
  return (
    <div className="well well-small">
      <h1>
        Check Out{" "}
        <small className="pull-right"> 2 Items are in the cart </small>
      </h1>
      <hr className="soften" />
      <table className="table table-bordered table-condensed">
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th> Ref. </th>
            <th>Avail.</th>
            <th>Unit price</th>
            <th>Qty </th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img width={100} src="assets/img/e.jpg" alt />
            </td>
            <td>
              Items name here
              <br />
              Carate : 22
              <br />
              Model : n/a
            </td>
            <td> - </td>
            <td>
              <span className="shopBtn">
                <span className="icon-ok" />
              </span>{" "}
            </td>
            <td>$50.00</td>
            <td>
              <input
                className="span1"
                style={{ maxWidth: 34 }}
                placeholder={1}
                id="appendedInputButtons"
                size={16}
                type="text"
                defaultValue={2}
              />
              <div className="input-append">
                <button className="btn btn-mini" type="button">
                  -
                </button>
                <button className="btn btn-mini" type="button">
                  {" "}
                  +{" "}
                </button>
                <button className="btn btn-mini btn-danger" type="button">
                  <span className="icon-remove" />
                </button>
              </div>
            </td>
            <td>$100.00</td>
          </tr>
          <tr>
            <td>
              <img width={100} src="assets/img/f.jpg" alt />
            </td>
            <td>
              Item names and brief details
              <br />
              Carate:24 <br />
              Model:HBK24
            </td>
            <td> - </td>
            <td>
              <span className="shopBtn">
                <span className="icon-ok" />
              </span>{" "}
            </td>
            <td>$348.42</td>
            <td>
              <input
                className="span1"
                style={{ maxWidth: 34 }}
                placeholder={1}
                size={16}
                type="text"
              />
              <div className="input-append">
                <button className="btn btn-mini" type="button">
                  -
                </button>
                <button className="btn btn-mini" type="button">
                  +
                </button>
                <button className="btn btn-mini btn-danger" type="button">
                  <span className="icon-remove" />
                </button>
              </div>
            </td>
            <td>$348.42</td>
          </tr>
          <tr>
            <td colSpan={6} className="alignR">
              Total products:{" "}
            </td>
            <td> $448.42</td>
          </tr>
          <tr>
            <td colSpan={6} className="alignR">
              Total products:{" "}
            </td>
            <td> $448.42</td>
          </tr>
          <tr>
            <td colSpan={6} className="alignR">
              Total products:{" "}
            </td>
            <td> $448.42</td>
          </tr>
          <tr>
            <td colSpan={6} className="alignR">
              Total products:{" "}
            </td>
            <td className="label label-primary"> $448.42</td>
          </tr>
        </tbody>
      </table>
      <br />
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td>
              <form className="form-inline">
                <label style={{ minWidth: 159 }}> VOUCHERS Code: </label>
                <input
                  type="text"
                  className="input-medium"
                  placeholder="CODE"
                />
                <button type="submit" className="shopBtn">
                  {" "}
                  ADD
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td>ESTIMATE YOUR SHIPPING &amp; TAXES</td>
          </tr>
          <tr>
            <td>
              <form className="form-horizontal">
                <div className="control-group">
                  <label className="span2 control-label" htmlFor="inputEmail">
                    Country
                  </label>
                  <div className="controls">
                    <input type="text" placeholder="Country" />
                  </div>
                </div>
                <div className="control-group">
                  <label
                    className="span2 control-label"
                    htmlFor="inputPassword"
                  >
                    Post Code/ Zipcode
                  </label>
                  <div className="controls">
                    <input type="password" placeholder="Password" />
                  </div>
                </div>
                <div className="control-group">
                  <div className="controls">
                    <button type="submit" className="shopBtn">
                      Click to check the price
                    </button>
                  </div>
                </div>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
      <a href="products.html" className="shopBtn btn-large">
        <span className="icon-arrow-left" /> Continue Shopping{" "}
      </a>
      <a href="login.html" className="shopBtn btn-large pull-right">
        Next <span className="icon-arrow-right" />
      </a>
    </div>
  );
}
