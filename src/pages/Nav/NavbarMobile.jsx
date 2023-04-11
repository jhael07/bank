import React from "react";
import "./css/navbar-mobile.css";
import Logo from "../../assets/img/logo.png";
import "../../animation/attention.css";

const NavbarMobile = () => {
  const animation = () => {
    // * this is the animation to show the navbar
    const navMobile = document.querySelector(".list");
    navMobile.classList.remove("closeAnimation");
    navMobile.classList.add("navAnimation");
    navMobile.style.visibility = "visible";
  };

  // * this is the animation to close it
  const removeAnimation = () => {
    const navMobile = document.querySelector(".list");
    navMobile.classList.remove("navAnimation");
    navMobile.classList.add("closeAnimation");
    navMobile.style.visibility = "hidden";
  };
  return (
    <>
      {/* this is how the menu looks when is not been display by the user */}
      <div className="m-auto bg-white navbar-desktop shadow-md">
        <div className=" flex justify-between w-full items-center  pr-5">
          <a href="/" className="flex  items-center">
            <img src={Logo} className="w-16 mx-3" />
            <h2 className="font-semibold text-cyan-700 text-2xl">G-Bank</h2>
          </a>

          <div className="nav-option__mobile" onClick={animation}>
            <div className="w-full bg-gray-400 h-1"></div>
            <div className="w-full bg-gray-500 h-1"></div>
            <div className="w-full bg-black h-1"></div>
          </div>
        </div>
      </div>
      {/* when the nav is display*/}
      <ul className="list">
        <div className="close-nav-mobile">
          {/* prettier-ignore */}
          <p className="closeAnimation  text-3xl " onClick={removeAnimation} style={{ left: "-0.3rem" }}>
              &times;
            </p>
        </div>
        <div className="grid gap-0 h-5/6">
          <a href="/">Inicio</a>
          <a href="#">Prestamos</a>
          <a href="#">Cuentas</a>
          <a href="#">Solicitar Cuenta</a>
          <a href="#">Configuración</a>
        </div>
      </ul>
    </>
  );
};

export default NavbarMobile;
