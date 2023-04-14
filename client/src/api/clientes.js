import url, { basicAuth } from "./api";
import Swal from "sweetalert2";

// FUNCTION TO DISPLAY ALERTS
const showAlertMessage = (title, info, type) => Swal.fire(title, info, type);

// CREATE NEW CLIENT
export const addCliente = async (cedula, nombre, password, apellido, direccion, telefono) => {
  try {
    const request = await fetch(url + "cliente/new", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(basicAuth),
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cedula: `${cedula}`,
        nombre: `${nombre}`,
        password: `${password}`,
        apellido: `${apellido}`,
        direccion: `${direccion}`,
        telefono: `${telefono}`,
      }),
      Cache: "default",
    });

    const result = await request.json();

    if (result.isError)
      throw new Error("La cedula ingresada ya está registrada con otro usuario");
    else {
      showAlertMessage(
        "Usuario agregado!!",
        `Usuario ${nombre} ${apellido} agregado existosamente`,
        "success"
      );
    }

    return true;
  } catch (err) {
    showAlertMessage("Error", err.message, "error");
    return false;
  }
};

// GET ALL CLIENTS FROM THE DB
export const getAllClientes = async () => {
  try {
    const request = await fetch(url + "cliente", {
      headers: {
        Authorization: "Basic " + btoa(basicAuth),
      },
    });

    const result = await request.json();

    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};
