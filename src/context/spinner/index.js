import { createContext, useState } from "react";
import "./index.scss";
const SpinnerContext = createContext();
const Spinner = (props) => {
  const [visibility, setVisibility] = useState("none");
  return (
    <SpinnerContext.Provider value={{ visibility: setVisibility }}>
      <div className={"spinScaffold"} style={{ display: visibility }}>
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
      {props.children}
    </SpinnerContext.Provider>
  );
};

export { SpinnerContext };
export default Spinner;
