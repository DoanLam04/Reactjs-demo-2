import React, { useState } from "react";
import InputPassword from "../components/InputPassword";
import { useForm } from "react-hook-form";
import { userApi } from "../Api/userApi";
import { setToken, setCurrent, setRole } from "../state/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading1 from "../components/Loading1";
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { UserSelector } from "react-redux";

export default function Login() {
  const [userRole, setUserRole] = useState("Public");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  var myView = loading === true ? <Loading1 /> : "";

  const onSubmit = (data) => {
    //  alert('Call api login')
    const callLogin = async (data) => {
      try {
        setLoading(true);
        const response = await userApi.login(data);
        dispatch(setCurrent(response.data.user));
        dispatch(setToken(response.data.jwt));
        //Save in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.jwt);
        //thành công
        toast.success("Đăng nhập thành công");
        setLoading(false);
        reset();
        // get user info
        const getInfo = async () => {
          const response1 = await userApi.me({ populate: "*" });
          console.log(response1);
          dispatch(setRole(response1.data.role.name));
          localStorage.setItem("role", response1.data.role.name);
          setUserRole(response1.data.role.name);
        };
        getInfo();
      } catch (e) {
        //hiện thị thông báo lỗi
        toast.error("đăng nhập thất bại", e);
      }
    };
    callLogin(data);
  };
  return (
    <div>
      {userRole === "admin-web" && (
        <Navigate to="/admin/product" replace={true} />
      )}
      {userRole === "Authenticated" && (
        <Navigate to="/product" replace={true} />
      )}

      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: 15 }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Log in</h2>
                    <div className="row">
                      <div className=" span3"></div>
                      <div
                        className=" span6"
                        style={{
                          background: "white",
                          borderRadius: "10px",
                          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                        }}
                      >
                        {" "}
                        <form
                          className="form"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div
                            className="input-group"
                            style={{ position: "relative" }}
                          >
                            <input
                              {...register("identifier", {
                                required: true,
                                minLength: 2,
                              })}
                              type="text"
                              className="form-control span5"
                              placeholder="Username"
                              style={{
                                marginTop: "20px",
                                marginLeft: "38px",
                              }}
                            />
                            {errors.identifier?.type === "required" && (
                              <p style={{ color: "red", marginLeft: "38px" }}>
                                Username is required
                              </p>
                            )}
                            {errors.identifier?.type === "minLength" && (
                              <p style={{ color: "red", marginLeft: "38px" }}>
                                Username must have at least 2 character
                              </p>
                            )}
                            <i
                              className="fas fa-user"
                              style={{
                                position: "absolute",
                                right: "12%",
                                top: "30px",
                                cursor: "pointer",
                              }}
                            ></i>
                          </div>

                          <div
                            className="input-group mb-3"
                            style={{ position: "relative" }}
                          >
                            <InputPassword
                              label="password"
                              register={register}
                              validateFunction={() => {
                                return true;
                              }}
                            />
                            {errors.password?.type === "required" && (
                              <p style={{ color: "red", marginLeft: "38px" }}>
                                Password required{" "}
                              </p>
                            )}

                            {errors.password?.type === "pattern" && (
                              <p
                                className="span5"
                                style={{ color: "red", marginLeft: "38px" }}
                              >
                                Password at least 8 character, 1 uppercase, one
                                lowercase, one number, 1 specialCharacter
                              </p>
                            )}
                          </div>
                          {myView}
                          <div className="row">
                            {/* /.col */}
                            <div className="span5">
                              <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                style={{
                                  marginTop: "15px",
                                  marginLeft: "38px",
                                }}
                              >
                                Log in
                              </button>
                            </div>
                            {/* /.col */}
                          </div>
                          <div className="social-auth-links text-center span5">
                            <p>- OR -</p>
                            <a
                              href="#"
                              className="btn btn-block btn-primary"
                              style={{
                                marginLeft: "18px",
                                position: "relative",
                                marginBottom: "10px",
                              }}
                            >
                              {" "}
                              Sign up using Facebook
                              <i
                                class="fab fa-facebook mr-2"
                                style={{
                                  position: "absolute",
                                  left: "2%",
                                  top: "30%",
                                }}
                              ></i>
                            </a>
                            <a
                              href="#"
                              className="btn btn-block btn-danger"
                              style={{
                                marginLeft: "18px",
                                position: "relative",
                                marginBottom: "10px",
                              }}
                            >
                              {" "}
                              Sign up using Google+
                              <i
                                class="fab fa-google-plus mr-2"
                                style={{
                                  position: "absolute",
                                  left: "2%",
                                  top: "30%",
                                }}
                              ></i>
                            </a>
                          </div>
                        </form>
                      </div>
                      <div className=" span3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
