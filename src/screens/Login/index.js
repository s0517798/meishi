import { firebase } from "../../config/firebase";
import "./index.scss";
import { NotificationContext } from "../../context/notificationContext";
import { useContext } from "react";

function Login() {
  const { fun } = useContext(NotificationContext);

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const login = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => fun(err.message));
  };

  return (
    <>
      <div className="backgroundImage"></div>
      <div className="loginPanel">
        <div className="btn" onClick={login}>
          <ion-icon name="logo-google"></ion-icon>
          <h2 className="logotxt">Hop In</h2>
        </div>
      </div>
    </>
  );
}

export default Login;
