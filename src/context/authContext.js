import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
const AuthContext = createContext();

const AuthComponent = ({ children }) => {
  const [user, setUser] = useState();
  const logout = () => {
    auth.signOut();
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
export { AuthContext };
export default AuthComponent;
