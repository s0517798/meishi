import { useState, useEffect } from "react";
import "./index.scss";
import mappedData from "../../config/cardItem";

const FullCard = (props) => {
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    props.cardValue && setProfileData(props.cardValue);
  }, props.overlay); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      onClick={props.onClick}
      style={{ display: props.overlay }}
      className="fullCard"
    >
      <div className="fullCardScff">
        <div
          className="backbtn"
          onClick={() => {
            props.setOverlay("none");
          }}
        >
          <ion-icon name="arrow-back-circle"></ion-icon>
          <span>back</span>
        </div>
        <div
          className="profileImage"
          style={
            profileData && {
              backgroundImage: `url(${profileData.profile})`,
            }
          }
        ></div>
        <div
          className="cardMatter"
          style={
            profileData && {
              backgroundColor: `${profileData.theme}`,
            }
          }
        >
          <div className="identification">
            <div
              style={
                profileData && {
                  color: `${profileData.theme}`,
                }
              }
            >
              <h1>{profileData && profileData.name}</h1>
              <h2>{profileData && profileData.title}</h2>
              <h3>{profileData && profileData.company}</h3>
            </div>
            <div
              className="logoImage"
              style={{
                backgroundImage: `url(${profileData && profileData.logo})`,
              }}
            ></div>
          </div>
          <p>{profileData && profileData.headline}</p>
          <div className="links">
            {profileData &&
              JSON.parse(profileData.details).map((ele) => {
                return (
                  <a
                    key={Object.values(ele)[1]}
                    target="_blank"
                    href={
                      mappedData.find(
                        (element) => element.name === Object.keys(ele)[0]
                      ).href + Object.values(ele)[0]
                    }
                    style={
                      profileData && {
                        color: `${profileData.theme}`,
                      }
                    }
                  >
                    {
                      mappedData.find(
                        (element) => element.name === Object.keys(ele)[0]
                      ).icon
                    }
                    <h1>{Object.values(ele)[0]}</h1>
                  </a>
                );
              })}
          </div>
          <div
            className="bottomSticker"
            style={
              profileData && {
                backgroundColor: `${profileData.theme}`,
              }
            }
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FullCard;
