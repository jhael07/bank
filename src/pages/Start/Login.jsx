import React, { useContext, useEffect, useState } from "react";
import "./css/Login.css";
import logo from "../../assets/img/Login/login__icon.png";
import { Link, Navigate } from "react-router-dom";
import PagesContext from "../../context/PagesContext";
import { getAllClientes } from "../../api/clientes";
import { login } from "../../api/auth";

const Login = () => {
  //  GETTING ALL THE INFO NEEDED FROM THE CONTEXT
  const { info } = useContext(PagesContext);
  const { form: handleChangeOnForm, session: session } = info;

  // CREDENTIALS STATE
  const [InfoUser, setInfoUser] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    try {
      const auth = await login(InfoUser);

      if (auth) {
        session.setSession(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!session.session ? (
        <div className="login__container">
          <div className="login ">
            <div className="m-auto login__content">
              <h1 className="text-center text-white text-xl mt-1 ">Login</h1>
              <img src={logo} alt="logo icono" className="logo__img mb-7" />
              <form className="grid text-center mt-6">
                <input
                  type="text"
                  className="login__input"
                  placeholder="Username"
                  onChange={(e) =>
                    handleChangeOnForm(setInfoUser, InfoUser, "username", e.target.value)
                  }
                />
                <input
                  type="password"
                  className="login__input mb-4"
                  placeholder="Password"
                  onChange={(e) =>
                    handleChangeOnForm(setInfoUser, InfoUser, "password", e.target.value)
                  }
                />
                <button onClick={(e) => handleSubmit(e)} className="start__btn">
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
      ) : (
        <Navigate to="/home/customer" />
      )}
    </>
  );
};

export default Login;
