import React, { useContext, useState } from "react";
import "./css/Login.css";
import logo from "../../assets/img/Login/login__icon.png";
import { Link } from "react-router-dom";
import { addCliente } from "../../api/clientes";
import PagesContext from "../../context/PagesContext";

const Register = () => {
  // GETTING THE INFO FROM THE CONTEXT
  const { info } = useContext(PagesContext);

  // SETTING THE CLIENT CONTEXT STATE
  const { clientes, alert: showAlertMessage, form: handleChange } = info;
  const [infoCliente, setInfoCliente] = useState(clientes.cliente);

  // FUNCTION TO CHECK IF ALL INPUTS ARE FILL OUT
  const validation = async (e) => {
    e.preventDefault();
    const { cedula, password, nombre, apellido, direccion, telefono } = infoCliente;

    if (
      !cedula.length ||
      !password.length ||
      !nombre.length ||
      !apellido.length ||
      !direccion.length ||
      !telefono.length
    ) {
      //prettier-ignore
      showAlertMessage("Campos vacios","Por favor asegurarse de llenar todos los campos", "error");
      return;
    }

    const success = await addCliente(
      infoCliente.cedula,
      infoCliente.nombre,
      infoCliente.password,
      infoCliente.apellido,
      infoCliente.direccion,
      infoCliente.telefono
    );

    if (success) {
      // SUCCESS MESSAGE
      showAlertMessage(
        "Usuario creado exitosamente",
        "El cliente fue agregado existosamente, inicie sessión con la cedúla y la contraseña",
        "success"
      );

      // AFTER SUCCESS, REMOVE TEXT IN ALL INPUTS
      setInfoCliente(clientes.cliente);
    }
  };

  return (
    <div className="login__container">
      <div className="login ">
        <div className="m-auto register__content">
          <h1 className="text-center text-xl mt-1 text-white">Register</h1>
          <img src={logo} alt="logo icono" className="logo__img mb-7" />
          <form>
            <div className="grid grid-cols-2 text-center mt-7">
              <input
                type="text"
                className="register__input"
                placeholder="Nombre"
                value={infoCliente?.nombre}
                onChange={(e) =>
                  handleChange(setInfoCliente, infoCliente, "nombre", e.target.value)
                }
              />
              <input
                type="text"
                className="register__input"
                placeholder="Apellido"
                value={infoCliente?.apellido}
                onChange={(e) =>
                  handleChange(setInfoCliente, infoCliente, "apellido", e.target.value)
                }
              />
              <input
                type="number"
                className="register__input "
                placeholder="Cedula"
                value={infoCliente?.cedula}
                onChange={(e) =>
                  handleChange(setInfoCliente, infoCliente, "cedula", e.target.value)
                }
              />
              <input
                type="password"
                className="register__password"
                placeholder="Password"
                value={infoCliente?.password}
                onChange={(e) =>
                  handleChange(setInfoCliente, infoCliente, "password", e.target.value)
                }
              />
              <input
                type="number"
                className="register__input "
                placeholder="Telefono"
                value={infoCliente?.telefono}
                onChange={(e) =>
                  handleChange(setInfoCliente, infoCliente, "telefono", e.target.value)
                }
              />
              <input
                type="text"
                className="register__input"
                placeholder="Dirección"
                value={infoCliente?.direccion}
                onChange={(e) =>
                  handleChange(setInfoCliente, infoCliente, "direccion", e.target.value)
                }
              />
            </div>

            <button onClick={(e) => validation(e)} className="start__btn">
              Submit
            </button>

            <Link to="/" className="extra-option">
              Sign in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
