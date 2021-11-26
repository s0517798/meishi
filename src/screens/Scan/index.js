import Navbar from "../../components/navbar";
import QrReader from "react-qr-reader";
import { useContext, useState } from "react";
import "./index.scss";
import FullCard from "../../components/fullCard";
import http from "axios";
import { NotificationContext } from "../../context/notificationContext";
import { AuthContext } from "../../context/authContext";

const Scan = () => {
  const { fun } = useContext(NotificationContext);
  const user = useContext(AuthContext);

  const [overlayScanFullCard, setOverlayScanFullCard] = useState("none");
  const [cardValueScan, setCardValueScan] = useState();

  const getCardDetail = async (cardNo) => {
    let response = await http.get(
      `https://meishi-card.herokuapp.com/card/${cardNo}`
    );
    setCardValueScan(response.data.cardDetail);
    setOverlayScanFullCard("flex");

    const form = new FormData();
    form.set("email", user.email);
    form.set("card", cardNo);
    let response2 = await http.post(
      `https://meishi-card.herokuapp.com/savecard`,
      form
    );
    console.log(response2);
    if (response2.data.status !== "OK") {
      fun(response2.data.error);
    } else {
      fun("New card added successfully");
    }
  };
  const handleScan = (data) => {
    if (data) {
      getCardDetail(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="scanScaffold">
      <Navbar selectedTab={2} />
      {cardValueScan && (
        <FullCard
          overlay={overlayScanFullCard}
          setOverlay={setOverlayScanFullCard}
          cardValue={cardValueScan}
        />
      )}
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100vh" }}
      />
    </div>
  );
};

export default Scan;
