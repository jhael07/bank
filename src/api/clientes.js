// API URL
const url = "http://localhost:8080/api/v1/";

// ALERT LIBRARY
import Swal from "sweetalert2";

// FUNCTION TO DISPLAY ALERTS
const showAlertMessage = (title, info, type) => Swal.fire(title, info, type);

// CREATE NEW CLIENT
export const addCliente = async (cedula, nombre, password, apellido, direccion, telefono) => {
  try {
    const request = await fetch(url + "cliente/new", {
      method: "POST",
      headers: {
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
  } catch (err) {
    showAlertMessage("Error", err.message, "error");
  }
};

// GET ALL CLIENTS FROM THE DB
const getAllClientes = async () => {};
