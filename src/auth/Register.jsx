import React, { useState } from "react";
import InputPassword from "../components/InputPassword";
import { useForm } from "react-hook-form";
import { userApi } from "../Api/userApi";
import { setToken, setCurrent } from "../state/userSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Loading1 from "../components/Loading1";
export default function Register() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const validateConfirmPassword = (value) => {
    const { password } = getValues();
    return value == password;
  };
  const myView = loading == true ? <Loading1 /> : "";

  const onSubmit = (data) => {
    // call api register
    const callRegister = async (data) => {
      try {
        setLoading(true);
        const response = await userApi.register(data);
        console.log(response);
        //Save data to local storage
        dispatch(setCurrent(response.data.user));
        dispatch(setToken(response.data.jwt));
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        //success
        toast.success("register successfully");
        setLoading(false);
        reset();
      } catch (e) {
        toast.error("register error: ", e);
        console.log("register error", e);
      }
      // finally {
      //   toast.success("register successfully");
      // }
    };

    callRegister(data);
  };
  return (
    <div>
      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: 15 }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>
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
                              {...register("username", {
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
                            {errors.username?.type === "required" && (
                              <p style={{ color: "red", marginLeft: "38px" }}>
                                Username is required
                              </p>
                            )}
                            {errors.username?.type === "minLength" && (
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
                            <input
                              {...register("email", {
                                required: true,
                                pattern:
                                  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                              })}
                              type="email"
                              className="form-control span5"
                              placeholder="Email"
                              style={{
                                marginTop: "10px",
                                marginLeft: "38px",
                              }}
                            />
                            {errors.email?.type === "required" && (
                              <p style={{ color: "red", marginLeft: "38px" }}>
                                Email is required
                              </p>
                            )}
                            {errors.email?.type === "pattern" && (
                              <p style={{ color: "red", marginLeft: "38px" }}>
                                Email is not exist{" "}
                              </p>
                            )}
                            <i
                              className="fas fa-envelope"
                              style={{
                                position: "absolute",
                                right: "12%",
                                top: "20px",
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
                          <div
                            className="input-group mb-3 "
                            style={{ position: "relative" }}
                          >
                            <InputPassword
                              label="confirmPassword"
                              register={register}
                              validateFunction={validateConfirmPassword}
                            />
                            {errors.confirmPassword?.type === "required" && (
                              <p style={{ color: "red", marginLeft: "38px" }}>
                                Password required{" "}
                              </p>
                            )}
                            {errors.confirmPassword?.type === "pattern" && (
                              <p
                                className="span5"
                                style={{ color: "red", marginLeft: "38px" }}
                              >
                                Password at least 8 character, 1 uppercase, one
                                lowercase, one number, 1 specialCharacter
                              </p>
                            )}
                            {errors.confirmPassword?.type === "validate" && (
                              <p style={{ color: "red", marginLeft: "38px" }}>
                                Password and confirm password not match{" "}
                              </p>
                            )}
                          </div>
                          <div className="row">
                            <div className="span3">
                              <div
                                className="input-group icheck-primary"
                                style={{ position: "relative" }}
                              >
                                <input
                                  type="checkbox"
                                  id="agreeTerms"
                                  name="terms"
                                  defaultValue="agree"
                                  style={{
                                    marginLeft: "38px",
                                  }}
                                />{" "}
                                <label
                                  htmlFor="agreeTerms"
                                  style={{
                                    float: "right",
                                    position: "absolute",
                                    top: "14%",
                                    left: "30%",
                                  }}
                                >
                                  I agree to the <a href="#">terms</a>
                                </label>
                              </div>
                            </div>
                            {/* /.col */}

                            <div className="span2">
                              <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                style={{ width: "177px" }}
                              >
                                Register
                              </button>
                            </div>
                            {/* /.col */}
                          </div>
                          {myView}
                          <div className="social-auth-links text-center span5">
                            <p
                              className="text-center"
                              style={{ marginLeft: "50px" }}
                            >
                              - OR -
                            </p>
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
