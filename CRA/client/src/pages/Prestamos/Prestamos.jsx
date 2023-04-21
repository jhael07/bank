import React, { useContext, useEffect, useState } from "react";
import { NavbarDesktop, NavbarMobile } from "../../components/Nav/index";
import PagesContext from "../../context/PagesContext";
import SecureLocalStorage from "react-secure-storage";
import CardPrestamo from "../../components/cards/CardPrestamo";
import { getPrestamoInfo } from "../../api/prestamos";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faMoneyBill,
  faPlusCircle,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import ModalSolicitarPrestamo from "../../components/modal/ModalSolicitarPrestamo";
import Loading from "../../components/spinner/Loading";
import ModalPagos from "../../components/modal/ModalPagos";

const Prestamos = () => {
  // THE OBJ THAT HAS ALL THE INFO ABOUT THE CONTEXT IS INFO
  const { info } = useContext(PagesContext);
  const { setSession, alert: showMessage } = info;

  // Loading
  const [loading, setLoading] = useState(false);

  // CLIENT ID
  const clientInfo = JSON.parse(SecureLocalStorage.getItem("account"));
  const session = JSON.parse(SecureLocalStorage.getItem("account"));

  // STATE TO STORE THE PRESTAMOS INFO FOR EVERY USER
  const [prestamosInfo, setPrestamosInfo] = useState([]);

  // USEEFFECT FOR GETTING ALL THE PRESTAMOS INFO
  useEffect(() => {
    if (!localStorage.getItem("infoPrestamos")) {
      showMessage(
        "Información",
        "Si haces click en los prestamos podras ver más detalles",
        "question"
      );

      localStorage.setItem("infoPrestamos", true);
    }
    const prestamos = async () => {
      try {
        setLoading(true);
        const { idCliente } = clientInfo;
        const prestamos = await getPrestamoInfo(idCliente);
        setPrestamosInfo(prestamos);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    prestamos();
  }, []);

  // MODAL STATES
  const [enableModal, setEnableModal] = useState(false);
  const [enableModalPagos, setEnableModalPagos] = useState(false);
  const [view, setView] = useState(true);

  const prestamosAccount = prestamosInfo?.map((bank) => {
    return (
      <CardPrestamo
        titulo={`Prestamo`}
        id={bank.idPrestamo}
        capitalInicial={`${bank.monto}`}
        inicio={bank.fechaBeg}
        final={bank.fechaEnd}
        interes={bank.insteres}
        garante={bank.garantium}
      />
    );
  });

  return (
    <>
      {/* MODAL WILL DISPLAY AS SOON AS ONE OF THE BUTTONS IS CLICK */}
      <ModalSolicitarPrestamo
        active={enableModal}
        setActive={setEnableModal}
        titulo={"Solicitar prestamo"}
      />{" "}
      <ModalPagos
        active={enableModalPagos}
        setActive={setEnableModalPagos}
        titulo={"Procesar Pago"}
      />
      {session ? (
        <div className="bg-white" style={{ height: "100vh", width: "100vw" }}>
          <NavbarDesktop />
          <NavbarMobile />
          <div
            className={`${
              view ? "visible" : "hidden"
            } top-0 w-11/12 m-auto bg-yellow-400 p-3 sm:text-sm md:text-lg lg:text-base text-sm rounded-xl gap-5 relative flex justify-center items-center`}
          >
            {" "}
            <FontAwesomeIcon icon={faExclamationCircle} /> Al hacer click en las tarjetas de
            prestamos se puede ver la tabla de amortización.
            <button
              className="text-red-600 absolute right-4  text-3xl  h-12  w-8 flex items-center justify-center p-3 rounded-full"
              style={{ borderRadius: "100%" }}
              onClick={() => setView(false)}
            >
              &times;
            </button>
          </div>
          <div className="bg-white p-4 m-auto">
            <div
              className={
                "w-full flex m-auto p-2 mb-6 mt-15 justify-center text-2xl text-gray-700"
              }
            >
              <div className="flex gap-3 items-center justify-between w-full px-7 m-auto">
                Prestamos{" "}
                <div className="flex gap-7">
                  <button
                    className="btn-agregar shadow-sm"
                    onClick={() => setEnableModal(true)}
                  >
                    <span className="btn-info">solicitar prestamo</span>
                    <FontAwesomeIcon icon={faPlusCircle} className="text-xl text-white" />
                  </button>
                  <button
                    className="btn-pagar shadow-sm"
                    onClick={() => setEnableModalPagos(true)}
                  >
                    <span className="btn-info">Pagar</span>
                    <FontAwesomeIcon icon={faMoneyBill} className="text-xl text-white" />
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`bg-slate-100  justify-center grid grid-cols-1 p-3 gap-8 ${
                prestamosInfo?.length > 1 && "lg:grid-cols-2"
              } `}
            >
              {loading ? (
                <Loading text={"Los prestamos se estan cargando."} />
              ) : prestamosInfo.length < 1 ? (
                <div className="grid m-auto font-semibold text-2xl gap-4 mt-4">
                  <FontAwesomeIcon icon={faX} className="m-auto text-6xl text-red-400" />
                  <h1 className="text-gray-800">No hay prestamos todavia.</h1>
                </div>
              ) : (
                prestamosAccount
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

export default Prestamos;
