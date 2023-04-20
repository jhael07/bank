import React, { useContext, useEffect, useState } from "react";
import "./css/Login.css";
import logo from "../../assets/img/Login/login__icon.png";
import { Link, Navigate } from "react-router-dom";
import PagesContext from "../../context/PagesContext";
import { getAllClientes } from "../../api/clientes";
import { login } from "../../api/auth";
import SecureLocalStorage from "react-secure-storage";
import Loading from "../../components/spinner/Loading";

const Login = () => {
  //  GETTING ALL THE INFO NEEDED FROM THE CONTEXT
  const { info } = useContext(PagesContext);
  const { form: handleChangeOnForm, session } = info;

  //Loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    session.setSession(localStorage.getItem("session"));
  }, [session.setSession]);

  // CREDENTIALS STATE
  const [InfoUser, setInfoUser] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault(e);

    // GETTING ALL THE USERS REGISTER
    const allClientes = await getAllClientes();

    // USER ACCOUNT FOUND
    const account = allClientes.find((cliente) => cliente.cedula === InfoUser.username);

    // ENCRYPT THE USER ACCOUNT
    const accountInfo = JSON.stringify(account);
    try {
      setLoading(true);
      // AUTH THE USER BY THE CREDENTIALS PROVIDED
      const auth = await login(InfoUser);

      // IF AUTH IS SUCCESS
      if (auth) {
        localStorage.setItem("session", true); // SAVE USERNAME AND SESSION IN LOCALSTORAGE
        session.setSession(true);

        SecureLocalStorage.setItem("account", accountInfo); // SAVING THE USER ACCOUNT IN THE LOCALSTORAGE
      }

      setLoading(false);
    } catch (err) {
      console.log(err); // IF THERE IS AN ERROR, SEND IT TO THE CONSOLE
    }
  };

  return (
    <>
      {!session.session ? (
        <div className="login__container">
          <div className="login ">
            <div className="m-auto login__content">
              {loading ? (
                <div
                  className="absolute  rounded-lg border border-gray-300 shadow-lg  bg-white p-10 "
                  style={{ transform: "translate(-50%,-50%)", top: "50%", left: "50%" }}
                >
                  <Loading text={"Iniciando sesión, espere un momento."} />
                </div>
              ) : null}
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
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
};

export default Login;
