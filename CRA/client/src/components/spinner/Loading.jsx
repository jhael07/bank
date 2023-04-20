import React from "react";
import "./loader.css";

const Loading = ({ text }) => {
  return (
    <div className="loader-bg">
      <span class="loader"></span>
      <br />
      <p className="text-loader">{text}</p>
    </div>
  );
};

export default Loading;
