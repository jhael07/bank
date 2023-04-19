import React, { useContext, useState } from "react";
import "./modal.css";
import PagesContext from "../../context/PagesContext";
import { addPrestamo, getPrestamoInfo } from "../../api/prestamos";
import Prestamos from "../../pages/Prestamos/Prestamos";
import secureLocalStorage from "react-secure-storage";

const ModalSolicitarPrestamo = ({ active, setActive, titulo }) => {
  const { info } = useContext(PagesContext);
  const { alert } = info;

  const fecha = new Date();
  const [prestamoInfo, setPrestamosInfo] = useState({
    monto: 0,
    interes: 0,
    tiempo: 0,
    fechaInicio: fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate(),
  });

  const tiempo = [
    [1, 7],
    [2, 16.8],
    [3, 21.4],
    [4, 22],
    [5, 23.5],
  ];

  const handleChange = (value, key) => {
    if (key === "fechaInicio") {
      return setPrestamosInfo({
        ...prestamoInfo,
        [key]: value,
      });
    }

    setPrestamosInfo({
      ...prestamoInfo,
      [key]: +value,
    });
  };

  const agregar = () => {
    // make sure all inputs all fill out
    if (prestamoInfo.monto < 1) return alert("Error", "Por favor llenar el monto", "error");
    if (prestamoInfo.tiempo === 0) return alert("Error", "Por favor elegir el plazo", "error");
    if (isNaN(prestamoInfo.tiempo))
      return alert("Error", "Por favor elegir un plazo valido", "error");

    // GET THE CLIENT ID
    const clientInfo = JSON.parse(secureLocalStorage.getItem("account"));
    const { idCliente } = clientInfo;

    addPrestamo(idCliente, prestamoInfo.monto, prestamoInfo.interes, prestamoInfo.tiempo);
  };
  console.log(prestamoInfo);

  return (
    <div className={`${active ? "visible" : "hidden"} absolute z-50 `}>
      <div className={` modal border border-gray-400 z-50 shadow-xl relative rounded-lg`}>
        <div className="modal-content">
          <h1 className="text-2xl font-semibold text-green-500 bg-gray-50 h-10 p-2 justify-center  flex items-center rounded-md">
            {titulo}
          </h1>
          <br />
          <div className=" p-3 rounded ">
            <div className="grid gap-4">
              <h2 className="m-auto text-xl ">Monto</h2>
              <input
                type="number"
                lang={navigator.language}
                className="border border-gray-700 rounded-md text-center m-auto"
                value={+prestamoInfo.monto === 0 ? "" : prestamoInfo.monto}
                onChange={(e) => handleChange(e.target.value, "monto")}
              />

              <h2 className="m-auto text-xl ">Interes</h2>
              <h3 className="m-auto text-xl text-yellow-400">{prestamoInfo.interes}%</h3>

              <div className="flex justify-center">
                <div className="grid justify-center gap-6">
                  <h2 className="m-auto text-xl ">Plazo:</h2>
                  <select
                    value={prestamoInfo.tiempo[0]}
                    className="border border-gray-700 rounded-md text-center p-3"
                    onChange={(e) => {
                      const [year, interes] = e.target.value.split(",");
                      setPrestamosInfo({ ...prestamoInfo, tiempo: +year, interes: +interes });
                    }}
                  >
                    <option>Elige el tiempo </option>
                    {tiempo.map((plazo) => (
                      <option value={plazo}>
                        {plazo[0]} años - {plazo[1]}%
                      </option>
                    ))}
                  </select>

                  <button className="btn-agregar text-lg  justify-center" onClick={agregar}>
                    Solicitar
                  </button>
                </div>
              </div>
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

export default ModalSolicitarPrestamo;
