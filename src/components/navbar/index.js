import { Link } from "react-router-dom";
import "./index.scss";

const Navbar = (props) => {
 

  return (
    <div className="navBar">
      <Link to="/dashboard" className="link">
        <div
          className={props.selectedTab === 1 ? "clickedIcon" : null}
          
        >
          <ion-icon name="albums-outline"></ion-icon>
          <h4>Cards</h4>
        </div>
      </Link>
      <Link to="/scan" className="link">
        <div
          className={props.selectedTab === 2 ? "clickedIcon" : null}
        >
          <ion-icon name="camera-outline"></ion-icon>
          <h4>Scan</h4>
        </div>
      </Link>
      <div
        className={props.selectedTab === 3 ? "clickedIcon" : null}
      >
        <ion-icon name="people-outline"></ion-icon>
        <h4>Contacts</h4>
      </div>
    </div>
  );
};
export default Navbar;
