import React from "react";
import "./css/navbar-desktop.css";
import Logo from "../../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const NavbarDesktop = () => {
  // FUNCTION TO CLOSE SESSION
  const logout = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("user");
  };

  return (
    <div className="m-auto bg-white navbar-desktop shadow-md">
      <div className=" flex items-center ">
        <a href="/" className="flex  items-center">
          <img src={Logo} className="w-16 mx-3" />
          <h2 className="font-semibold text-cyan-700 text-2xl">G-Bank</h2>
        </a>
      </div>
      <div className="navbar-desktop__items">
        <ul>
          <a href="#">Inicio</a>
          <a href="#">Prestamos</a>
          <a href="#">Cuentas</a>
          <a href="#">Configuración</a>
          <a href="#" className="logout text-gray-500" onClick={logout}>
            <FontAwesomeIcon icon={faPowerOff} size="xl" />
          </a>
        </ul>
      </div>
    </div>
  );
};

export default NavbarDesktop;
