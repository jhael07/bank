import React, { useState } from "react";
import PagesContext from "./PagesContext";
import Swal from "sweetalert2";

const PagesContextProvider = (props) => {
  const [cliente, SetCliente] = useState({
    cedula: "",
    password: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
  });

  const [allClientes, setAllClientes] = useState([]);

  // FUNCTION TO DISPLAY ALERTS
  const showAlertMessage = (title, info, type) => Swal.fire(title, info, type);

  const info = {
    clientes: { cliente, SetCliente, allClientes, setAllClientes },
    alert: showAlertMessage,
  };

  return <PagesContext.Provider value={{ info }}>{props.children}</PagesContext.Provider>;
};

export default PagesContextProvider;
