// API URL
import url, { basicAuth } from "./api";
import Swal from "sweetalert2";

// FUNCTION TO DISPLAY ALERTS
const showAlertMessage = (title, info, type) => Swal.fire(title, info, type);

// GETTING THE PRESTAMOS INFORMATION
export const getPrestamoInfo = async (id) => {
  console.log(id);
  try {
    const request = await fetch(url + `prestamo/${id}`, {
      headers: {
        Authorization: "Basic " + btoa(basicAuth),
      },
    });

    const result = await request.json();
    console.log(result);
    return result;
  } catch (err) {
    showAlertMessage("Error", "No hay conexion a internet", "error");
    return false;
  }
};
