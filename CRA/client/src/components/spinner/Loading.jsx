import React from "react";
import "./loader.css";

const Loading = ({ text }) => {
  return (
    <div className="loader-bg">
      <span class="loader"></span>
      <br />
      <p>{text}</p>
    </div>
  );
};

export default Loading;
