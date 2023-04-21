// API URL
import url, { basicAuth } from "./api";
import Swal from "sweetalert2";
import axios from "axios";

// FUNCTION TO DISPLAY ALERTS
const showAlertMessage = (title, info, type) => Swal.fire(title, info, type);

export const pagar = async (idPrestamo, idCuota, tipo, idCliente, idCuenta) => {
  try {
    const data = {
      tipo: tipo,
      idCuota,
      idPrestamo,
      idCliente,
      idCuenta,
    };

    const request = await axios.post(url + `pagos/${idPrestamo}`, data, {
      headers: { Authorization: "Basic " + btoa(basicAuth) },
    });

    console.log(request);

    showAlertMessage("Exito", "Pago procesado exitosamente", "success");
    if (request.status === 200) setTimeout(() => window.location.reload(), 2000);
  } catch (err) {
    console.log(err);
    showAlertMessage("Error", err.message, "error");
    return false;
  }
};
