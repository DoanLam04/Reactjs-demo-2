import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrent, setRole, setToken } from "../../state/userSlice";
import { Navigate } from "react-router-dom";

export default function AuthBox() {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(
    useSelector((state) => state.user.role)
  );
  const handleLogout = () => {
    //reset current user va token
    dispatch(setCurrent({}));
    dispatch(setToken(""));
    dispatch(setRole("Public"));
    // delete localStorage
    localStorage.clear();
    setUserRole("Public");
  };

  const user = useSelector((state) => state.user.current);
  const myView =
    JSON.stringify(user) === "{}" ? (
      <span>
        <Link to="/register">
          <i class="fas fa-registered"></i> Register{" "}
        </Link>
        <Link to="/login">
          <i class="fas fa-sign-in-alt"></i> Login{" "}
        </Link>
      </span>
    ) : (
      <span>
        <a href="#st">
          <i class="fas fa-user"></i>
          {" " + user.username}!
        </a>
        <a href="#st" onClick={handleLogout}>
          <i class="fas fa-sign-out-alt"></i>Logout
        </a>
      </span>
    );

  return (
    <>
      {userRole === "Public" && <Navigate to="/product" replace={true} />}
      {myView}
    </>
  );
}
