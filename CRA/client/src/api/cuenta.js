// API URL
import url, { basicAuth } from "./api";
import Swal from "sweetalert2";
import axios from "axios";

// FUNCTION TO DISPLAY ALERTS
const showAlertMessage = (title, info, type) => Swal.fire(title, info, type);

export const addDeposito = async (monto, idCuenta) => {
  try {
    const data = {
      monto: Number(monto),
      idCuenta,
    };

    const request = await axios.post(url + `cliente/cuentabanco/deposito`, data, {
      headers: { Authorization: "Basic " + btoa(basicAuth) },
    });

    showAlertMessage("Exito", "Deposito agregado a la cuenta", "success");
    if (request.status === 200) setTimeout(() => window.location.reload(), 1000);
  } catch (err) {
    showAlertMessage("Error", err.message, "error");
    return false;
  }
};
