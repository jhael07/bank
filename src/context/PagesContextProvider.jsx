import React from "react";
import { PagesContext } from "./PagesContext";

const PagesContextProvider = (props) => {
    return <PagesContext.Provider>{props.children}</PagesContext.Provider>;
};

export default PagesContextProvider;
