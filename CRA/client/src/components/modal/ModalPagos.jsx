import React, { useContext, useState } from "react";
import "./modal.css";
import PagesContext from "../../context/PagesContext";
import secureLocalStorage from "react-secure-storage";
import Loading from "../spinner/Loading";
import { addInversion } from "../../api/inversiones";
import { pagar } from "../../api/pagos";

const ModalPagos = ({ active, setActive, titulo, id }) => {
  const { info } = useContext(PagesContext);
  const { alert } = info;

  // OBJECT WITH THE FORM INFORMATION
  const [loading, setLoading] = useState(false);

  // DATE FOR THE PRESTAMO
  const fecha = new Date();
  // PRESTAMO'S INFORMATION
  const [pago, setPago] = useState({
    idPrestamo: 0,
    idCuenta: 0,
    idCuota: 0,
    tipo: "",
  });

  // FUNCTION TO ADD THE PRESTAMO TO THE USER'S ACCOUNT
  const agregar = async () => {
    // make sure all inputs all fill out
    if (pago.tipo.length < 1)
      return alert("Error", "Por favor ingresar el tipo de pago", "error");
    if (pago.idCuota === 0)
      return alert("Error", "Por favor ingresar el codigo de la cuota", "error");
    if (pago.idPrestamo === 0)
      return alert("Error", "Por favor ingresar el codigo del prestamo", "error");
    if (isNaN(pago.idPrestamo))
      return alert("Error", "Por favor ingrese el codigo del prestamo", "error");

    // ADDING SPINNER WILL WAITING FOR THE ASYNC CALL
    setLoading(true);
    // ADD THE PRESTAMO TO THE ACCOUNT
    await pagar(pago.idPrestamo, pago.idCuota, pago.tipo, id, pago.idCuenta);

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
            <div className=" grid-cols-2 grid  gap-8">
              <div className="grid gap-2">
                <h2 className="m-auto text-xl "> Metodo de pago</h2>
                <input
                  type="text"
                  className="border border-gray-700 rounded-md text-center m-auto"
                  value={pago.tipo}
                  onChange={(e) => setPago({ ...pago, tipo: e.target.value })}
                />
              </div>

              <div className="grid gap-2  ">
                <h2 className="m-auto text-xl ">Codigo del Prestamo</h2>
                <input
                  type="number"
                  className="border border-gray-700 rounded-md text-center m-auto"
                  value={pago.idPrestamo === 0 ? "" : pago.idPrestamo}
                  onChange={(e) => setPago({ ...pago, idPrestamo: +e.target.value })}
                />
              </div>

              <div className="grid justify-center gap-6 ">
                <h2 className="m-auto text-xl ">Codigo de la cuota</h2>
                <input
                  type="number"
                  value={pago.idCuota === 0 ? "" : pago.idCuota}
                  className="border border-gray-700 rounded-md text-center h-12 p-3"
                  onChange={(e) => {
                    setPago({ ...pago, idCuota: +e.target.value });
                  }}
                />
              </div>

              <div className="grid gap-2  ">
                <h2 className="m-auto text-xl ">Número de Cuenta</h2>
                <input
                  type="number"
                  className="border border-gray-700 rounded-md text-center m-auto"
                  value={pago.idCuenta === 0 ? "" : pago.idCuenta}
                  onChange={(e) => setPago({ ...pago, idCuenta: +e.target.value })}
                />
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

export default ModalPagos;