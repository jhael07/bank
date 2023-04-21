import React, { useContext, useState } from "react";
import "./modal.css";
import PagesContext from "../../context/PagesContext";
import secureLocalStorage from "react-secure-storage";
import Loading from "../spinner/Loading";
import { addInversion } from "../../api/inversiones";
import { addDeposito } from "../../api/cuenta";

const ModalDeposito = ({ active, setActive, titulo, cuentas }) => {
  const { info } = useContext(PagesContext);
  const { alert } = info;

  // OBJECT WITH THE FORM INFORMATION
  const [loading, setLoading] = useState(false);

  // DATE FOR THE PRESTAMO
  const fecha = new Date();
  // PRESTAMO'S INFORMATION
  const [prestamoInfo, setPrestamosInfo] = useState({
    monto: 0,
    idCuenta: 0,
  });

  // FUNCTION TO ADD THE PRESTAMO TO THE USER'S ACCOUNT
  const agregar = async () => {
    // make sure all inputs all fill out
    if (prestamoInfo.monto < 1) return alert("Error", "Por favor llenar el monto", "error");
    if (typeof prestamoInfo.idCuenta != "number")
      return alert("Error", "Por favor elegir una cuenta", "error");

    // GET THE CLIENT ID
    const clientInfo = JSON.parse(secureLocalStorage.getItem("account"));
    const { idCliente } = clientInfo;

    // ADDING SPINNER WILL WAITING FOR THE ASYNC CALL
    setLoading(true);
    // ADD THE PRESTAMO TO THE ACCOUNT
    await addDeposito(prestamoInfo.monto, prestamoInfo.idCuenta);

    // HIDING THE MODAL AND ALSO THE SPINNER
    setActive(false);
    setLoading(false);
  };

  return (
    <div className={`${active ? "visible" : "hidden"} absolute z-50 `}>
      <div className={` modal border border-gray-400 z-50 shadow-xl relative rounded-lg `}>
        <div className="modal-content">
          {loading ? (
            <div
              className="modal__message"
              style={{ transform: "translate(-50%,-50%)", top: "50%", left: "50%" }}
            >
              <Loading text={"Procesando la solicitud, espere un momento."} />
            </div>
          ) : null}
          <h1 className="text-2xl font-semibold text-green-500 bg-gray-50 h-10 p-2 justify-center  flex items-center rounded-md">
            {titulo}
          </h1>
          <br />
          <div className=" p-3 rounded ">
            <div className="">
              <div className="grid gap-2">
                <h2 className="m-auto text-xl ">* Monto</h2>
                <input
                  type="number"
                  className="border border-gray-700 rounded-md text-center m-auto"
                  value={+prestamoInfo.monto === 0 ? "" : prestamoInfo.monto}
                  onChange={(e) =>
                    setPrestamosInfo({ ...prestamoInfo, monto: +e.target.value })
                  }
                />
              </div>

              <div className="grid justify-center gap-6 mt-6">
                <h2 className="m-auto text-xl ">Cuenta:</h2>
                <select
                  value={prestamoInfo.idCuenta}
                  className="border border-gray-700 rounded-md text-center h-12 p-3"
                  onChange={(e) => {
                    setPrestamosInfo({ ...prestamoInfo, idCuenta: +e.target.value });
                  }}
                >
                  <option>Elige la cuenta </option>
                  {cuentas.map((cuenta) => (
                    <option value={cuenta.idCuenta}>{cuenta.idCuenta}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className=" mt-12">
              <button
                className="btn-agregar text-lg  justify-center m-auto btn-agregar-form"
                onClick={agregar}
              >
                Solicitar
              </button>
            </div>
          </div>
        </div>
        <button
          className="bg-red-600 hover:bg-red-700 absolute right-4 text-2xl top-5 h-12 text-white w-12 flex items-center justify-center p-3 rounded-full"
          style={{ borderRadius: "100%" }}
          onClick={() => setActive(false)}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ModalDeposito;
