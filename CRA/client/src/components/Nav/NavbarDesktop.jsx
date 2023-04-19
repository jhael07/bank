import React, { useContext } from "react";
import "./css/navbar-desktop.css";
import Logo from "../../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import PagesContext from "../../context/PagesContext";
import SecureLocalStorage from "react-secure-storage";

const NavbarDesktop = () => {
  // GETTING THE INFORMATION FROM THE CONTEXT
  const { info } = useContext(PagesContext);
  const { account } = info;

  // FUNCTION TO CLOSE SESSION
  const logout = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("user");
  };

  return (
    <div className="m-auto bg-white navbar-desktop shadow-md   ">
      <div className=" flex items-center ">
        <a href="/home" className="flex  items-center">
          <img src={Logo} className="w-16 mx-3" />
          <h2 className="font-semibold text-cyan-700 text-2xl">G-BANK</h2>
        </a>
      </div>
      <div className="navbar-desktop__items">
        <ul>
          <a href="/home">Inicio</a>
          <a href="/prestamos">Prestamos</a>
          <a href="#">Cuentas</a>
          <a href="#">Configuración</a>
          <a href="/" className="logout text-gray-500" onClick={logout}>
            <FontAwesomeIcon icon={faPowerOff} size="xl" />
          </a>
        </ul>
      </div>
    </div>
  );
};

export default NavbarDesktop;
