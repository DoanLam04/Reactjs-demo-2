import React from "react";

export default function InputPassword(props) {
  const togglePassword = (e) => {
    const password = e.target.previousElementSibling;
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    e.target.classList.toggle("fa-eye-slash");
  };
  const validateFunction = props.validateFunction;
  const label = props.label;
  const register = props.register;
  return (
    <div>
      <input
        id={label}
        type="password"
        {...register(label, {
          validate: validateFunction,
          required: true,
          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        })}
        className="form-control span5"
        placeholder={label}
        style={{
          marginTop: "10px",
          marginLeft: "38px",
        }}
      />

      <i
        className="fa fa-eye"
        style={{
          position: "absolute",
          right: "12%",
          top: "20px",
          cursor: "pointer",
        }}
        onClick={togglePassword}
      >
        {" "}
      </i>
    </div>
  );
}
