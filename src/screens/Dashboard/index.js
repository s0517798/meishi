import { useContext, useEffect, useState } from "react";
import Card from "../../components/cards";
import Navbar from "../../components/navbar";
import "./index.scss";
import { AuthContext } from "../../context/authContext";
import Create from "../../components/create";
import ViewAll from "../../components/viewAll";
import { SpinnerContext } from "../../context/spinner";
import { NotificationContext } from "../../context/notificationContext";
import profileImage from "../../assest/profileImage.jpg";
import profileImage2 from "../../assest/profileImage2.jpg";
import profileImage3 from "../../assest/profileImage3.jpg";

import http from "axios";
import FullCard from "../../components/fullCard";
import ShareCard from "../../components/shareCard";
import { timeOfDay } from "../../config/time";

const Dashboard = () => {
  const [overlay, setOverlay] = useState("none");
  const [overlayAllCards, setOverlayAllCards] = useState("none");
  const [overlayFullCard, setOverlayFullCard] = useState("none");
  const [cardValue, setCardvalue] = useState();
  const [createdCards, setCreatedCards] = useState([]); //holds the keys
  const [createdCardData, setCreatedCardData] = useState([]); //holds the details of cards for iterator
  const [sharedCards, setSharedCards] = useState([]);
  const [sharedCardData, setSharedCardData] = useState([]);
  const [capturedCards, setCapturedCards] = useState([]);
  const [capturedCardData, setCapturedCardData] = useState([]);

  const [numberOfCardAdded, setNumberofCardAdded] = useState(-1);
  const [shareCardVisibility, setShareCardVisibility] = useState("none");
  const [shareCardNumber, setShareCardNumber] = useState(-1);

  //to be used for name and profile picture
  const user = useContext(AuthContext);

  const { visibility } = useContext(SpinnerContext);
  const { fun } = useContext(NotificationContext);

  const fillCreated = () => {
    setCreatedCardData([]);
    createdCards.forEach(async (element) => {
      let response = await http.get(
        `https://meishi-card.herokuapp.com/card/${element}`
      );
      if (!response.data.error) {
        setCreatedCardData((prev) => [...prev, response.data.cardDetail]);
      }
    });
    fillShared();
  };

  const fillShared = () => {
    setSharedCardData([]);
    sharedCards.forEach(async (element) => {
      let response = await http.get(
        `https://meishi-card.herokuapp.com/card/${element}`
      );
      if (!response.data.error) {
        setSharedCardData((prev) => [...prev, response.data.cardDetail]);
      }
    });
  };

  useEffect(() => {
    const postData = async () => {
      visibility("flex");
      const form = new FormData();
      form.set("email", user.email);
      const response = await http.post(
        "https://meishi-card.herokuapp.com/newuser",
        form
      );

      if (!response.data.error) {
        setCreatedCards(response.data.created);
        setSharedCards(response.data.shared);
        setCapturedCards(response.data.saved);
        visibility("none");
        setNumberofCardAdded(0);
      } else fun(response.data.error);
    };
    postData();
  }, [user, overlay]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(fillCreated, [user, numberOfCardAdded]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="scaffold">
      <Navbar selectedTab={1} />
      <Create
        overlay={overlay}
        setOverlay={setOverlay}
        setNumberCardAdded={setNumberofCardAdded}
      />
      <FullCard
        overlay={overlayFullCard}
        setOverlay={setOverlayFullCard}
        cardValue={cardValue}
      />
      <ShareCard
        visibility={shareCardVisibility}
        setVisibility={setShareCardVisibility}
        cardNumber={shareCardNumber}
      />
      <ViewAll overlay={overlayAllCards} setOverlay={setOverlayAllCards} />
      <div className="header">
        <div className="userInfo">
          <div
            referrerPolicy="no-referrer"
            style={{
              backgroundImage: `url(${user.photoURL})`,
            }}
            className="profilePicture"
          ></div>
          <h2>
            {`${timeOfDay()}`} {user.displayName}!
          </h2>
          <h3>
            {`${timeOfDay()}`}
            <br />
            {user.displayName}!
          </h3>
        </div>
        <div className="meishiLogo">
          <div
            className="logOutBtn"
            onClick={() => {
              // logout();
              indexedDB.deleteDatabase("firebaseLocalStorageDb");
              window.location.reload();
            }}
          >
            <ion-icon name="log-out-outline"></ion-icon>
            <span>Log out</span>
          </div>
        </div>
      </div>
      <h3 className="heading">Your cards</h3>
      <div className="sliderHolder">
        <div className="myCardSlider">
          {createdCards.length === 0 ? (
            <Card
              profileImage={profileImage}
              theme="#b7003c"
              name="No card created"
              position=""
              company=""
              logo=""
              headline="Click on create new to create a business card."
            />
          ) : (
            createdCardData.map((ele) => (
              <Card
                onClick={() => {
                  setCardvalue(ele);
                  setOverlayFullCard("flex");
                }}
                key={ele.cardno}
                ukey={ele.cardno}
                profileImage={ele.profile}
                theme={ele.theme}
                name={ele.name}
                position={ele.title}
                company={ele.company}
                logo={ele.logo}
                headline={ele.headline}
                setShareCardVisibility={setShareCardVisibility}
                setShareCardNumber={setShareCardNumber}
              />
            ))
          )}
        </div>
      </div>
      <div
        className="cardBtn"
        onClick={() => {
          setOverlay("flex");
        }}
      >
        <ion-icon name="file-tray-full"></ion-icon>
        Create new
      </div>
      <h3 className="heading" style={{ marginTop: "0px" }}>
        Shared cards
      </h3>
      <div className="sliderHolder">
        <div className="myCardSlider">
          {sharedCards.length === 0 ? (
            <Card
              profileImage={profileImage2}
              theme="#b7003c"
              name="No card shared"
              position=""
              company=""
              logo=""
              headline="Scan qr code on meishi to save a business card."
            />
          ) : (
            sharedCardData.map((ele) => (
              <Card
                onClick={() => {
                  setCardvalue(ele);
                  setOverlayFullCard("flex");
                }}
                key={ele.cardno}
                ukey={ele.cardno}
                profileImage={ele.profile}
                theme={ele.theme}
                name={ele.name}
                position={ele.position}
                company={ele.company}
                logo={ele.logo}
                headline={ele.headline}
                setShareCardVisibility={setShareCardVisibility}
                setShareCardNumber={setShareCardNumber}
              />
            ))
          )}
        </div>
      </div>
      <div
        className="cardBtn"
        onClick={() => {
          setOverlayAllCards("flex");
        }}
      >
        <ion-icon name="folder-open"></ion-icon>
        View all
      </div>
      <h3 className="heading" style={{ marginTop: "0px" }}>
        Saved cards
      </h3>
      <div className="sliderHolder">
        <div className="myCardSlider">
          {capturedCards.length === 0 ? (
            <Card
              profileImage={profileImage3}
              theme="#b7003c"
              name="No card saved"
              position=""
              company=""
              logo=""
              headline="Click on capture new to save a business card."
            />
          ) : (
            <Card
              profileImage={profileImage3}
              theme="#b7003c"
              name="No casdfsdfrd saved"
              position=""
              company="sdfsdf"
              logo=""
              headline="Click on capture new to save a business card."
            />
          )}
        </div>
      </div>
      <div className="cardBtn">
        <ion-icon name="image"></ion-icon>
        Capture new
      </div>
    </div>
  );
};

export default Dashboard;
