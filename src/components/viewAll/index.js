import Card from "../cards";
import "./index.scss";

const ViewAll = (props) => {
  return (
    <div className="viewAllCards" style={{ display: props.overlay }}>
      <div className="allCardScaffold">
        <div
          className="backbtn"
          onClick={() => {
            props.setOverlay("none");
          }}
        >
          <ion-icon name="arrow-back-circle"></ion-icon>
          <span>back</span>
        </div>
        <span className="dateCard">
          <ion-icon name="calendar-outline"></ion-icon>12 december 2020
        </span>
        <Card />
        <Card />
        <Card />
        <span className="dateCard">
          <ion-icon name="calendar-outline"></ion-icon>16 december 2020
        </span>
        <Card />
        <Card />
        <Card />
        <Card />
        <span className="dateCard">
          <ion-icon name="calendar-outline"></ion-icon>12 december 2020
        </span>
        <Card />
      </div>
    </div>
  );
};
export default ViewAll;
