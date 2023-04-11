import React from "react";
import "./css/Login.css";
import logo from "../../assets/img/Login/login__icon.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login__container">
      <div className="login ">
        <div className="m-auto login__content">
          <h1 className="text-center text-white text-xl mt-1 ">Login</h1>
          <img src={logo} alt="logo icono" className="logo__img mb-7" />
          <form className="grid text-center mt-6">
            <input type="text" className="login__input" placeholder="Username" />
            <input type="password" className="login__input mb-4" placeholder="Password" />
            <button onClick={(e) => e.preventDefault()} className="start__btn">
              Submit
            </button>
            <Link to="/register" className="extra-option">
              Create a new account
            </Link>{" "}
            <Link to="/home/customer" className="extra-option">
              Hub
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
