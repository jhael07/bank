import React from "react";
import "./Login.css";
import logo from "../../../assets/img/Login/login__icon.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login__container">
      <div className="login ">
        <div className="m-auto login__content">
          <h1 className="text-center text-white text-xl mt-1 ">Login</h1>
          <img src={logo} alt="logo icono" className="logo__img mb-7" />
          <form className="grid text-center ">
            <input
              type="text"
              className="w-3/4 m-auto mb-7 rounded-md p-1 text-center "
              placeholder="Username"
            />

            <input
              type="password"
              className="w-3/4 m-auto mb-4  rounded-md p-1 text-center"
              placeholder="Password"
            />

            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="bg-green-400 w-2/4 m-auto p-1 rounded mt-2"
            >
              Submit
            </button>

            <Link
              to="/register"
              className="lin mt-3 text-sm font-normal w-2/4 m-auto text-white"
            >
              Create a new account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
