import React from "react";
import "./css/Login.css";
import logo from "../../assets/img/Login/login__icon.png";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="login__container">
      <div className="login ">
        <div className="m-auto register__content">
          <h1 className="text-center text-xl mt-1 text-white">Register</h1>
          <img src={logo} alt="logo icono" className="logo__img mb-7" />
          <form>
            <div className="grid grid-cols-2 text-center mt-7">
              <input type="text" className="register__input" placeholder="Username" />
              <input type="password" className="register__password" placeholder="Password" />
              <input type="text" className="register__input" placeholder="Nombre" />
              <input type="text" className="register__input" placeholder="Apellido" />
              <input type="number" className="register__input " placeholder="Cedula" />
              <input type="number" className="register__input " placeholder="Telefono" />
            </div>
            <input type="text" className="register__direccion" placeholder="Dirección" />

            <button onClick={(e) => e.preventDefault()} className="start__btn">
              Submit
            </button>

            <Link to="/" className="extra-option">
              Sign in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
