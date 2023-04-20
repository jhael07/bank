import React, { useContext, useEffect, useState } from "react";
import { NavbarDesktop, NavbarMobile } from "../../components/Nav/index";
import PagesContext from "../../context/PagesContext";
import SecureLocalStorage from "react-secure-storage";
import CardPrestamo from "../../components/cards/CardPrestamo";
import { getPrestamoInfo } from "../../api/prestamos";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import ModalSolicitarPrestamo from "../../components/modal/ModalSolicitarPrestamo";
import Loading from "../../components/spinner/Loading";

const Inversiones = () => {
  // THE OBJ THAT HAS ALL THE INFO ABOUT THE CONTEXT IS INFO
  const { info } = useContext(PagesContext);
  const { setSession } = info;

  // Loading
  const [loading, setLoading] = useState(false);

  // CLIENT ID
  const clientInfo = JSON.parse(SecureLocalStorage.getItem("account"));
  const session = JSON.parse(SecureLocalStorage.getItem("account"));

  // STATE TO STORE THE PRESTAMOS INFO FOR EVERY USER
  const [prestamosInfo, setPrestamosInfo] = useState([]);

  // USEEFFECT FOR GETTING ALL THE PRESTAMOS INFO
  useEffect(() => {
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

  console.log(prestamosInfo);

  // MODAL STATES
  const [enableModal, setEnableModal] = useState(false);

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
      />

      {session ? (
        <div className="bg-white" style={{ height: "100vh", width: "100vw" }}>
          <NavbarDesktop />
          <NavbarMobile />
          <div className="bg-white p-4 m-auto">
            <div
              className={
                "w-full flex m-auto p-2 mb-6 mt-15 justify-center text-2xl text-gray-700"
              }
            >
              <div className="flex gap-3 items-center justify-between w-full px-7 m-auto">
                Inversiones
                <div className="flex gap-7">
                  <button
                    className="btn-agregar shadow-sm"
                    onClick={() => setEnableModal(true)}
                  >
                    <span className="btn-info">Hacer Inversión</span>
                    <FontAwesomeIcon icon={faPlusCircle} className="text-xl text-white" />
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

export default Inversiones;
