// API URL
import url, { basicAuth } from "./api";
import Swal from "sweetalert2";
import axios from "axios";

// FUNCTION TO DISPLAY ALERTS
const showAlertMessage = (title, info, type) => Swal.fire(title, info, type);

// GETTING THE PRESTAMOS INFORMATION
export const getPrestamoInfo = async (id) => {
  try {
    const request = await fetch(url + `prestamo/${id}`, {
      headers: {
        Authorization: "Basic " + btoa(basicAuth),
      },
    });

    const result = await request.json();

    return result;
  } catch (err) {
    showAlertMessage("Error", "No hay conexion a internet", "error");
    return false;
  }
};
// GETTING THE PRESTAMOS INFORMATION
export const addPrestamo = async (id, monto, interes, tiempo) => {
  console.log(id, monto, interes, tiempo);
  try {
    const date = new Date();
    const data = {
      monto: Number(monto),
      insteres: Number(interes),
      fechaEnd: `${
        date.getFullYear() + tiempo + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      }`,
      fechaBeg: `${date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}`,
    };

    const request = await axios.post(url + `prestamo/new/${id}`, data, {
      headers: { Authorization: "Basic " + btoa(basicAuth) },
    });

    showAlertMessage("Exito", "Prestamo agregado existosamente", "success");
    if (request.status === 200) window.location.reload();
  } catch (err) {
    showAlertMessage("Error", err.message, "error");
    return false;
  }
};
