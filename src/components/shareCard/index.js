import { useEffect, useState } from "react";
import "./index.scss";
var QRCode = require("qrcode");

const ShareCard = (props) => {
  const [imageData, setImageData] = useState();
  const giveQRData = () => {
    QRCode.toDataURL(props.cardNumber, function (err, url) {
      setImageData(url);
    });
  };
  useEffect(giveQRData, [props.cardNumber]);
  return (
    <div className="shareCard" style={{ display: props.visibility }}>
      <div className="shareCardScaffold">
        <div
          className="backbtn"
          onClick={() => {
            props.setVisibility("none");
          }}
        >
          <ion-icon name="arrow-back-circle"></ion-icon>
          <span>back</span>
        </div>
        <div className="shareCardHeading">
          <h1>Share Card</h1>
          <ion-icon name="open-outline"></ion-icon>
        </div>

        <img className="forQr" src={imageData} alt="QR code" />

        <div className="shareLocation">
          <ion-icon name="logo-whatsapp"></ion-icon>
          <ion-icon name="link-outline"></ion-icon>
          <ion-icon name="logo-facebook"></ion-icon>
        </div>
        <div className="editCard">Edit Card</div>
        <div className="deleteCard">Delete Card</div>
      </div>
    </div>
  );
};
export default ShareCard;
