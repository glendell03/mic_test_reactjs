import React, { Fragment, useState } from "react";
import { FIREBASE_API } from "../../API/firebase_api";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await FIREBASE_API.post("/auth/login", {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
      } else {
        setIsAuthenticated(false);
        Toast.fire({
          icon: "error",
          title: "Wrong email/password!",
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };
  return (
    <Fragment>
      <form onSubmit={loginSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </Fragment>
  );
};

export default Login;
