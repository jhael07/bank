import React from "react";
import "../Login/Login.css";
import logo from "../../../assets/img/Login/login__icon.png";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="login__container">
            <div className="login ">
                <div className="m-auto">
                    <h1 className="text-center text-xl mt-1 text-white">
                        Register
                    </h1>
                    <img
                        src={logo}
                        alt="logo icono"
                        className="logo__img mb-7"
                    />

                    <form>
                        <div className="grid grid-cols-2 text-center ">
                            <input
                                type="text"
                                className="w-3/4 m-auto mb-4 rounded-md p-1 text-center "
                                placeholder="Username"
                            />{" "}
                            <input
                                type="password"
                                className="w-3/4 m-auto mb-4  rounded-md p-1 text-center"
                                placeholder="Password"
                            />
                            <input
                                type="text"
                                className="w-3/4 m-auto mb-4 rounded-md p-1 text-center "
                                placeholder="Nombre"
                            />{" "}
                            <input
                                type="number"
                                className="w-3/4 m-auto mb-4 rounded-md p-1 text-center "
                                placeholder="Apellido"
                            />{" "}
                            <input
                                type="text"
                                className="w-3/4 m-auto mb-4 rounded-md p-1 text-center "
                                placeholder="Cedula"
                            />{" "}
                            <input
                                type="number"
                                className="w-3/4 m-auto mb-4 rounded-md p-1 text-center "
                                placeholder="Telefono"
                            />
                        </div>
                        <input
                            type="text"
                            className="w-3/4 m-auto mb-9 rounded-md p-1 text-center mt-2 flex "
                            placeholder="Dirección"
                        />{" "}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                            className="bg-green-400 w-2/4 m-auto p-1 rounded mt-2 flex justify-center"
                        >
                            Submit
                        </button>
                        <Link
                            to="/"
                            className="mt-3 text-sm font-normal w-2/4 m-auto text-white flex justify-center"
                        >
                            Sign in
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
