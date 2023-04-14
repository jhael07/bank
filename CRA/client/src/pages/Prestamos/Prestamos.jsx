import React, { useContext } from "react";
import { NavbarDesktop, NavbarMobile } from "../../components/Nav/index";
import PagesContext from "../../context/PagesContext";
import SecureLocalStorage from "react-secure-storage";

const Prestamos = () => {
  // THE OBJ THAT HAS ALL THE INFO ABOUT THE CONTEXT IS INFO
  const { info } = useContext(PagesContext);
  const { session, account } = info;

  // DECRYPTING THE USER ACCOUNT INFO
  const { nombre, apellido, cuentabancos } = JSON.parse(SecureLocalStorage.getItem("account"));

  const bankAccounts = cuentabancos.map((bank) => {
    return (
      <>
        <div className=" bg-white w-10/12 m-auto rounded-bl-lg rounded-br-lg shadow-lg pb-4 grid gap-2">
          <div className="w-full bg-blue-500 flex m-auto p-2 mb-1 justify-center text-2xl text-gray-50">
            Prestamo Hipotecario
          </div>
          <h1 className="m-auto flex text-xl font-normal">Cantidad: 300,000</h1>
          <div className="m-auto flex text-xl font-normal text-gray-400">
            <div className="grid justify-center">
              <div className="m-auto text-green-500">
                {/* <b>{Number(bank.numero * 20).toLocaleString("es-DO")}</b>{" "}
                <span className="font-light text-normal">DOP</span> */}
                Plazo: 12 meses
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
  return (
    <>
      <div className="bg-white" style={{ height: "100vh", width: "100vw" }}>
        <NavbarDesktop />
        <NavbarMobile />
        <div className="bg-white p-4 w-11/12 m-auto">
          <div className="bg-slate-100   mt-15 justify-center grid grid-cols-1 p-3">
            {bankAccounts}
          </div>
        </div>
      </div>
    </>
  );
};

export default Prestamos;
