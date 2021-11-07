import Login from "./screens/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import NotificationBar from "./context/notificationContext";
import Spinner from "./context/spinner";
import Scan from "./screens/Scan";

function App() {
  const user = useContext(AuthContext);

  return (
    <Spinner>
      <NotificationBar>
        <Router>
          <Switch>
            <Route exact path="/">
              {user ? <Dashboard /> : <Login />}
            </Route>
            <Route exact path="/dashboard">
              {user ? <Dashboard /> : <Login />}
            </Route>
            <Route exact path="/scan">
              {user ? <Scan /> : <Login />}
            </Route>
          </Switch>
        </Router>
      </NotificationBar>
    </Spinner>
  );
}

export default App;
