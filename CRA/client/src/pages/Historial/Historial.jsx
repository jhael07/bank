import React, { useContext, useEffect, useState } from "react";
import { NavbarDesktop, NavbarMobile } from "../../components/Nav/index";
import PagesContext from "../../context/PagesContext";
import SecureLocalStorage from "react-secure-storage";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faX } from "@fortawesome/free-solid-svg-icons";
import ModalHacerInversion from "../../components/modal/ModalHacerInversion";
import Loading from "../../components/spinner/Loading";
import { historial } from "../../api/pagos";

const Historial = () => {
  // THE OBJ THAT HAS ALL THE INFO ABOUT THE CONTEXT IS INFO
  const { info } = useContext(PagesContext);

  // Loading
  const [loading, setLoading] = useState(false);

  // CLIENT ID
  const clientInfo = JSON.parse(SecureLocalStorage.getItem("account"));
  const session = JSON.parse(SecureLocalStorage.getItem("account"));

  // STATE TO STORE THE PRESTAMOS INFO FOR EVERY USER
  const [HistorialInfo, setHistorialInfo] = useState([]);

  // MODAL STATES
  const [enableModal, setEnableModal] = useState(false);
  useEffect(() => {
    const mostrar = async () => {
      setLoading(true);
      setHistorialInfo(await historial(clientInfo.idCliente));
      setLoading(false);
    };

    mostrar();
  }, [setHistorialInfo]);
  return (
    <>
      {/* MODAL WILL DISPLAY AS SOON AS ONE OF THE BUTTONS IS CLICK */}
      <ModalHacerInversion
        active={enableModal}
        setActive={setEnableModal}
        titulo={"Solicitar prestamo"}
      />

      {session ? (
        <div className="bg-white" style={{ height: "100vh", width: "100vw" }}>
          <NavbarDesktop />
          <NavbarMobile />
          <div className="bg-white p-4 w-11/12 m-auto">
            <div
              className={
                "w-full flex  gap-10 justify-between m-auto p-2 mb-6 mt-15  text-2xl text-gray-700"
              }
            >
              Historial
            </div>

            <div className={`bg-slate-100  justify-center grid grid-cols-1 p-3 gap-8 `}>
              {loading ? (
                <Loading text={"El historial se esta cargando"} />
              ) : (
                <p>{HistorialInfo}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Historial;
