import React, { useState } from "react";
import "./media-query.css";
import ModalDetallesPrestamo from "../modal/ModalDetallesPrestamo";

const CardPrestamo = ({ titulo, id, capitalInicial, inicio, final, interes }) => {
  // SHOW MODAL
  const [active, setActive] = useState(false);

  // INTERES
  const i = interes / 100 / 12;

  // TIME
  const fechaInicio = Number(inicio.slice(0, 4));
  const fechaFinal = Number(final.slice(0, 4));
  const n = Math.abs((fechaInicio - fechaFinal) * 12);

  // CUOTA FORMULA
  const cuota = (capitalInicial * i) / (1 - (1 + i) ** -n);

  return (
    <>
      <div
        className="hover:scale-105 hover:cursor-pointer  transition-all active:bg-slate-200  bg-white w-11/12 m-auto rounded-bl-lg rounded-br-lg shadow-lg pb-4 grid gap-2"
        onClick={() => setActive(true)}
      >
        <div className="titulo-card">
          <div className="w-3/4 justify-between m-auto flex">
            {titulo} <span> Plazo: {n} meses</span>
          </div>
        </div>
        <h3 className="m-auto flex text-sm font-normal">Codigo del Prestamo</h3>
        <h1 className="m-auto flex text-xl font-normal"> #{id}</h1>
        <div className="m-auto flex text-xl font-normal text-gray-400  w-3/4">
          <div className="grid justify-center w-full">
            <div className="m-auto text-green-500">
              Capital: $ {Number(capitalInicial).toLocaleString("es-DO")}
            </div>
            {inicio && (
              <div className="begin-end">
                Fecha de inicio: <span className="text-green-500">{inicio.slice(0, 10)}</span>
              </div>
            )}
            {final && (
              <div className="begin-end">
                Fecha de expiración:{" "}
                <span className="text-green-500">{final.slice(0, 10)}</span>
              </div>
            )}
            <div className="w-3/4 text-gray-600 m-auto flex justify-between mt-3">
              Interes: <span className="text-green-500">{interes}%</span>
            </div>

            <div className="w-3/4 text-gray-600 m-auto flex justify-between mt-3">
              Cuotas:{" "}
              <span className="text-green-500">
                $ {Number(cuota.toFixed(2)).toLocaleString("es-DO")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <ModalDetallesPrestamo
        active={active}
        setActive={setActive}
        id={id}
        cuota={cuota}
        interes={interes}
        montoOriginal={capitalInicial / n}
      />
    </>
  );
};

export default CardPrestamo;
