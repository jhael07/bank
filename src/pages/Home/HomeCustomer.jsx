import React, { useContext } from "react";
import { NavbarDesktop, NavbarMobile } from "../../components/Nav/index";
import PagesContext from "../../context/PagesContext";
import { Navigate } from "react-router-dom";

const HomeCustomer = () => {
  // THE OBJ THAT HAS ALL THE INFO ABOUT THE CONTEXT IS INFO
  const { info } = useContext(PagesContext);
  const { session } = info;

  return (
    <>
      {session.session ? (
        <div className="bg-white">
          <NavbarDesktop />
          <NavbarMobile />
          <div className="bg-white p-4 ">
            <div className="w-11/12 bg-blue-500 flex m-auto p-2 tex">klk</div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio quasi pariatur
              repellendus aut, facilis ab temporibus, rerum molestiae cumque fugit similique
              nisi accusantium tempore dolore tenetur neque iure, qui magni?
            </p>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default HomeCustomer;
