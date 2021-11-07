import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import AuthComponent from "./context/authContext";

ReactDom.render(
  <AuthComponent>
    <App />
  </AuthComponent>,
  document.querySelector("#root")
);
