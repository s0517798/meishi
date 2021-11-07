import Tilt from "react-parallax-tilt";
import "./index.scss";

const Card = (props) => {
  return (
    <div className="parentRelative">
      <div className="cardMargin" onClick={props.onClick}>
        <Tilt
          gyroscope={true}
          glareEnable={true}
          glareMaxOpacity={0.6}
          glareColor="white"
          glarePosition="all"
        >
          <div data-tilt className="cardDB">
            <div
              className="cardImage"
              style={{
                backgroundImage: `url(${props.profileImage})`,
              }}
            ></div>
            <div
              className="cardOverlay"
              style={{ backgroundColor: `${props.theme}` }}
            >
              <h4>{props.name}</h4>
              <h5 className="position">{props.position}</h5>
              <h5 className="company">{props.company}</h5>
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${props.logo})`,
                }}
              ></div>
              <h3 className="headline">{props.headline}</h3>
              {<ion-icon name="share-social-outline"></ion-icon>}
            </div>
          </div>
        </Tilt>
      </div>
      <div
        className="forClick"
        onClick={() => {
          props.setShareCardNumber(props.ukey);
          props.setShareCardVisibility("flex");
        }}
      ></div>
    </div>
  );
};

export default Card;
