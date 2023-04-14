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

  // FUNCTION TO HANDLE THE CHANGES ON THE INPUTS
  const handleChangeOnForm = (setter, defaultValue, key, value) => {
    setter({ ...defaultValue, [key]: value });
  };

  // SESSION FOR THE USER
  const [session, setSession] = useState(false);

  // USER ACCOUNT
  const account = localStorage.getItem("account");

  const info = {
    clientes: { cliente, SetCliente, allClientes, setAllClientes },
    alert: showAlertMessage,
    form: handleChangeOnForm,
    session: { session, setSession },
    account,
  };

  return <PagesContext.Provider value={{ info }}>{props.children}</PagesContext.Provider>;
};

export default PagesContextProvider;
