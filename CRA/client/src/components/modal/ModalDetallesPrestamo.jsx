import React, { useEffect, useState } from "react";
import "./modal.css";
import secureLocalStorage from "react-secure-storage";
import { getPrestamoInfo } from "../../api/prestamos";

const ModalDetallesPrestamo = ({ active, setActive, id, cuota }) => {
  const clientInfo = JSON.parse(secureLocalStorage.getItem("account"));
  const [cuotasPrestamo, setCuotasPrestamos] = useState([]);

  useEffect(() => {
    const info = async () => {
      const { idCliente } = clientInfo;
      const prestamos = await getPrestamoInfo(idCliente);

      const { cuotaprestamos } = prestamos.find((prestamo) => prestamo.idPrestamo === id);
      setCuotasPrestamos(cuotaprestamos);
    };

    info();
  }, [id]);

  return (
    <div
      className={`${
        active ? "visible" : "hidden"
      } modalDetalles h-80 w-11/12 flex justify-center shadow-xl
    rounded-lg fixed z-40`}
      id="tableID"
    >
      <button
        className="bg-red-600 hover:bg-red-700 z-50 fixed right-3 p-0 text-2xl top-2 h-12 text-white w-12 flex items-center justify-center  rounded-full"
        style={{ borderRadius: "100%" }}
        onClick={() => setActive(false)}
      >
        &times;
      </button>
      <div className="flex justify-between p-3 ">
        <div className="grid justify-center  w-fit relative">
          <h1 className="py-5 m-auto text-2xl text-white">Detalles de los pagos</h1>

          <table>
            <tr className="bg-white border">
              <th className="border border-gray-200 p-2">ID de Cuota</th>
              <th className="border border-gray-200 p-2">Monto a Pagar</th>
              <th className="border border-gray-200 p-2">fecha de Pago</th>
              <th className="border border-gray-200 p-2">Pago Realizado</th>
            </tr>

            <tbody>
              {cuotasPrestamo.map((prestamo) => {
                return (
                  <>
                    <tr>
                      <td className="text-center w-32 bg-gray-200 border border-gray-200">
                        {prestamo.idCuota}
                      </td>{" "}
                      <td className="text-center w-72 bg-gray-200 border border-gray-200">
                        ${Number(cuota.toFixed(2)).toLocaleString("es-DO")}
                      </td>
                      <td className="text-center p-2 w-72 bg-gray-200 border border-gray-200">
                        {prestamo.fechaPlanificado.slice(0, 10)}
                      </td>
                      <td
                        className={`text-center p-2 w-72 bg-gray-200 border border-gray-200 ${
                          prestamo.tipo === "" ? "bg-yellow-50" : "bg-green-500 text-white"
                        }`}
                      >
                        {prestamo.tipo === "" ? "PENDIENTE" : prestamo.tipo}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModalDetallesPrestamo;
