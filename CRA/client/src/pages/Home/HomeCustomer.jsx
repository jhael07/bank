import React, { useContext } from "react";
import { NavbarDesktop, NavbarMobile } from "../../components/Nav/index";
import PagesContext from "../../context/PagesContext";
import { Navigate } from "react-router-dom";
import { decrypt } from "n-krypta";
import "../../index.css";
import SecureLocalStorage from "react-secure-storage";
const HomeCustomer = () => {
  // THE OBJ THAT HAS ALL THE INFO ABOUT THE CONTEXT IS INFO
  const { info } = useContext(PagesContext);
  const { session, account } = info;

  // DECRYPTING THE USER ACCOUNT INFO
  const { nombre, apellido, cuentabancos } = JSON.parse(SecureLocalStorage.getItem("account"));
  const nameDisplay = `${nombre[0].toUpperCase()}${nombre.slice(1, nombre.length)}`;

  const bankAccounts = cuentabancos.map((bank) => {
    return (
      <>
        <div className=" bg-white w-11/12 m-auto rounded-bl-lg rounded-br-lg shadow-lg pb-4 grid gap-2">
          <div className="w-full bg-blue-500 flex m-auto p-2 mb-1 justify-center text-2xl text-gray-50">
            Cuenta de {bank.tipo}
          </div>
          <h1 className="m-auto flex text-xl font-normal"># {bank.idCuenta}</h1>
          <div className="m-auto flex text-xl font-normal text-gray-400">
            <div className="grid justify-center">
              Balance disponible
              <div className="m-auto text-green-500">
                <b>{Number(bank.numero * 20).toLocaleString("es-DO")}</b>{" "}
                <span className="font-light text-normal">DOP</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      {session.session ? (
        <div className="bg-white " style={{ height: "100vh", width: "100vw" }}>
          <NavbarDesktop />
          <NavbarMobile />
          <div className="bg-white p-4 w-11/12 m-auto">
            <div
              className={
                "w-full flex m-auto p-2 mb-6 mt-15 justify-center text-2xl text-gray-700"
              }
            >
              Bienvenido {nameDisplay}
            </div>
            <div className="bg-slate-100  justify-center grid grid-cols-1 p-3">
              {bankAccounts}
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default HomeCustomer;
