import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../context/notificationContext";
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

  const { fun } = useContext(NotificationContext);

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
          <a
            target="_blank"
            href={"http://localhost:9000/viewcard/" + props.cardNumber}
            style={{ color: "black" }}
          >
            <ion-icon name="open-outline"></ion-icon>
          </a>
        </div>

        <img className="forQr" src={imageData} alt="QR code" />

        <div className="shareLocation">
          <a
            href={
              `whatsapp://send?text=` +
              "http://localhost:9000/viewcard/" +
              props.cardNumber
            }
            data-action="share/whatsapp/share"
            target="_blank"
          >
            <ion-icon name="logo-whatsapp"></ion-icon>
          </a>

          <ion-icon
            name="link-outline"
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:9000/viewcard/${props.cardNumber}`
              );
              fun("Link Copied.");
            }}
          ></ion-icon>
          <a
            href={
              "https://www.facebook.com/sharer/sharer.php?u=http://localhost:9000/viewcard/" +
              props.cardNumber
            }
            target="_blank"
          >
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
        </div>
        <div className="editCard">Edit Card</div>
        <div className="deleteCard">Delete Card</div>
      </div>
    </div>
  );
};
export default ShareCard;
