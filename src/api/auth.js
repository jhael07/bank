// API URL
import url from "./api";
import Swal from "sweetalert2";

// FUNCTION TO DISPLAY ALERTS
const showAlertMessage = (title, info, type) => Swal.fire(title, info, type);

export const login = async (info) => {
  try {
    const login = await fetch(url + "cliente/login", {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cedula: info.username,
        password: info.password,
      }),
    });

    const result = await login.json();
    if (result.isError) {
      throw new Error("el usuario o la contraseña no es correcto.");
    } else {
      return true;
    }
  } catch (err) {
    showAlertMessage("Error", err.message, "error");
    return false;
  }
};
