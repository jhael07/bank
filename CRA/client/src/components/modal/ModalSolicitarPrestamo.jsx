import React, { useState } from "react";
import "./modal.css";

const ModalSolicitarPrestamo = ({ active, setActive, titulo }) => {
  const [prestamoInfo, setPrestamosInfo] = useState({
    monto: 0,
  });

  const interes = prestamoInfo.monto / (Math.random() * 19);
  return (
    <div className={`${active ? "visible" : "hidden"} absolute z-50 `}>
      <div className={` modal border border-gray-400 z-50 shadow-xl relative rounded-lg`}>
        <div className="modal-content">
          <h1 className="text-2xl font-semibold text-green-500 bg-white h-10 p-2 justify-center  flex items-center rounded-md">
            {titulo}
          </h1>
          <br />
          <div className="bg-white p-3 rounded ">
            <form className="grid gap-4">
              <h2 className="m-auto text-xl ">Monto</h2>
              <input type="number" className="border border-gray-700 rounded-md text-center m-auto" />

              <h2 className="m-auto text-xl ">Interes</h2>
              <h3 className="m-auto text-xl text-yellow-400">{interes}</h3>

              <div className="flex gap-6">
                <div className="grid justify-center gap-3">
                  <h2 className="m-auto text-xl ">Fecha de inicio:</h2>
                  <input
                    type="date"
                    className="border border-gray-700 rounded-md text-center"
                  />
                </div>
                <div className="grid justify-center gap-3">
                  <h2 className="m-auto text-xl ">Fecha de Finalización:</h2>
                  <input
                    type="date"
                    className="border border-gray-700 rounded-md text-center"
                  />
                </div>
              </div>
            </form>
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
