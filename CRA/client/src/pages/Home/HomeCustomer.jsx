import React, { useContext, useEffect, useState } from "react";
import { NavbarDesktop, NavbarMobile } from "../../components/Nav/index";
import PagesContext from "../../context/PagesContext";
import { Navigate } from "react-router-dom";
import "../../index.css";
import SecureLocalStorage from "react-secure-storage";
import axios from "axios";
import url, { basicAuth } from "../../api/api";
import Loading from "../../components/spinner/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faX } from "@fortawesome/free-solid-svg-icons";
import ModalDeposito from "../../components/modal/ModalDeposito";

const HomeCustomer = () => {
  // THE OBJ THAT HAS ALL THE INFO ABOUT THE CONTEXT IS INFO
  const { info } = useContext(PagesContext);
  const { session, account } = info;
  const [loading, setLoading] = useState(false);
  const [enableModal, setEnableModal] = useState(false);

  // DECRYPTING THE USER ACCOUNT INFO
  const cuenta = JSON.parse(SecureLocalStorage.getItem("account"));
  const nameDisplay = `${cuenta?.nombre[0]?.toUpperCase()}${cuenta?.nombre?.slice(
    1,
    cuenta?.nombre?.length
  )}`;

  const [cuentasBank, setCuentasBank] = useState([]);

  const getBankAccounts = async () => {
    const request = await axios.get(url + `cliente/cuentabanco/${cuenta.idCliente}`, {
      headers: { Authorization: "Basic " + btoa(basicAuth) },
    });
    setCuentasBank(request.data);
  };

  useEffect(() => {
    const mostrar = async () => {
      setLoading(true);
      await getBankAccounts();
      setLoading(false);
    };

    mostrar();
  }, [setCuentasBank]);

  const bankAccounts = cuentasBank.map((bank) => {
    return (
      <>
        <div
          className={`hover:scale-105 transition-all bg-white w-11/12 m-auto rounded-bl-lg rounded-br-lg shadow-lg pb-4 grid gap-2`}
        >
          <div className="w-full bg-blue-500 flex m-auto p-2 mb-1 justify-center text-2xl text-gray-50">
            Cuenta de {bank.tipo}
          </div>
          <h1 className="m-auto flex text-xl font-normal"># {bank.idCuenta}</h1>
          <div className="m-auto flex text-xl font-normal text-gray-400">
            <div className="grid justify-center">
              Balance disponible
              <div className="m-auto text-green-500">
                <b>{Number(bank.numero).toLocaleString("es-DO")}</b>{" "}
                <span className="font-light text-normal">DOP</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <ModalDeposito
        active={enableModal}
        setActive={setEnableModal}
        titulo={"Hacer Deposito"}
        cuentas={cuentasBank}
      />
      {session.session ? (
        <div className="bg-white " style={{ height: "100vh", width: "100vw" }}>
          <NavbarDesktop />
          <NavbarMobile />
          <div className="bg-white p-4 w-11/12 m-auto">
            <div
              className={
                "w-full flex  gap-10 justify-between m-auto p-2 mb-6 mt-15  text-2xl text-gray-700"
              }
            >
              Bienvenido {nameDisplay}{" "}
              <button className="btn-agregar shadow-sm" onClick={() => setEnableModal(true)}>
                {" "}
                <span className="btn-info">Depositar a la cuenta</span>
                <FontAwesomeIcon icon={faPlusCircle} className="text-xl text-white" />
              </button>
            </div>
            <div
              className={`bg-slate-100  justify-center grid grid-cols-1 p-3 gap-8 ${
                cuenta?.cuentabancos?.length > 1 && "lg:grid-cols-2"
              } `}
            >
              {loading ? (
                <Loading text={"Las cuentas de banco se estan cargando"} />
              ) : bankAccounts.length < 1 ? (
                <div className="grid m-auto font-semibold text-2xl gap-4 mt-4">
                  <FontAwesomeIcon icon={faX} className="m-auto text-6xl text-red-400" />
                  <h1 className="text-gray-800">No existe ninguna cuenta.</h1>
                </div>
              ) : (
                bankAccounts
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

export default HomeCustomer;
