import { createContext, useState } from "react";
export const NotificationContext = createContext();
const NotificationBar = (props) => {
  const [visibility, setvisibility] = useState("none");
  const styles = {
    display: visibility,
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    backgroundColor: "#d12e5e",
    zIndex: "99999999999999999",
    color: "white",
    padding: "5px 10px",
    boxShadow:
      "4.7px 24px 10px rgba(0, 0, 0, 0.109), 19px 97px 80px rgba(0, 0, 0, 0.22)",
  };

  const [notificationText, setNotificationText] = useState();

  const callNotification = (text) => {
    setNotificationText(text);
    setvisibility("block");
    setTimeout(() => {
      setvisibility("none");
    }, 4000);
  };

  return (
    <NotificationContext.Provider value={{ fun: callNotification }}>
      <div>
        <div style={styles}>
          <h2 style={{ fontWeight: "200" }}>{notificationText}</h2>
        </div>
        {props.children}
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationBar;
