// API URL
import url, { basicAuth } from "./api";
import Swal from "sweetalert2";
import axios from "axios";

// FUNCTION TO DISPLAY ALERTS
const showAlertMessage = (title, info, type) => Swal.fire(title, info, type);

// GETTING THE PRESTAMOS INFORMATION
export const getInversionesInfo = async (id) => {
  try {
    const request = await fetch(url + `inversion/${id}`, {
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

// GETTING THE INVERSION INFORMATION
export const addInversion = async (id, monto, interes, tiempo) => {
  try {
    const date = new Date();
    const data = {
      monto: Number(monto),
      insteres: parseFloat(interes),

      fechaBeg: `${date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}`,
      fechaEnd: `${
        date.getFullYear() + tiempo + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      }`,
    };

    const request = await axios.post(url + `inversion/new/${id}`, data, {
      headers: { Authorization: "Basic " + btoa(basicAuth) },
    });

    showAlertMessage("Exito", "Inversion generada existosamente", "success");
    if (request.status === 200) setTimeout(() => window.location.reload(), 3000);
  } catch (err) {
    showAlertMessage("Error", err.message, "error");
    return false;
  }
};
