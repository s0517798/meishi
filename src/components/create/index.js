import { useContext, useRef, useState } from "react";
import "./index.scss";
import cardItem from "../../config/cardItem";
import addImage from "../../assest/addImage.webp";
import addLogo from "../../assest/addLogo.png";
import axios from "axios";
import uuid from "uuid/dist/v4";
import { NotificationContext } from "../../context/notificationContext";
import { SpinnerContext } from "../../context/spinner";
import { AuthContext } from "../../context/authContext";

const Create = (props) => {
  const notification = useContext(NotificationContext);
  const { visibility } = useContext(SpinnerContext);
  const user = useContext(AuthContext);

  const [bgImage, setBgImage] = useState(addImage);
  const [logoImage, setLogoImage] = useState(addLogo);
  const [itemSelected, setItemSelected] = useState([]);
  const [themeColor, setThemeColor] = useState("#b7003c");
  const [profileImageUpload, setprofileImageUpload] = useState();
  const [logoImageUpload, setlogoImageUpload] = useState();
  const [details, setdetails] = useState([]);

  const [counter, setCounter] = useState(0);

  const filebtn = useRef();
  const logoBtn = useRef();

  //refrences---------
  const nameText = useRef();
  const titleText = useRef();
  const departmentText = useRef();
  const companyText = useRef();
  const headline = useRef();
  //refrences---------

  const postData = async () => {
    if (nameText.current.value === "" || nameText.current.value == null) {
      notification.fun("Please provide a name for business card.");
    } else if (bgImage === addImage) {
      notification.fun("Please provide an image for business card.");
    } else {
      visibility("flex");
      const form = new FormData();
      form.set("email", user.email);
      form.set("image", profileImageUpload);
      form.set("logo", logoImageUpload);
      form.set("theme", themeColor);
      form.set("name", nameText.current.value);
      form.set("title", titleText.current.value);
      form.set("department", departmentText.current.value);
      form.set("company", companyText.current.value);
      form.set("headline", headline.current.value);
      form.set("details", JSON.stringify(details));

      const response = await axios.post(
        "https://meishi-card.herokuapp.com/create",
        form,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      visibility("none");
      if (response.data.status === "OK") {
        notification.fun("New card added successfully.");
        props.setOverlay("none"); //back btn functionality.
        console.log(props.setNumberCardAdded);
        props.setNumberCardAdded((prev) => (prev += 1));
      } else {
        notification.fun(response.data.status);
      }
    }
  };

  filebtn.current &&
    filebtn.current.addEventListener("change", () => {
      const file = filebtn.current.files[0];
      setprofileImageUpload(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          const result = reader.result;
          setBgImage(result);
        };
        reader.readAsDataURL(file);
      }
    });
  logoBtn.current &&
    logoBtn.current.addEventListener("change", () => {
      const file = logoBtn.current.files[0];
      setlogoImageUpload(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          const result = reader.result;
          setLogoImage(result);
        };
        reader.readAsDataURL(file);
      }
    });

  return (
    <div style={{ display: props.overlay }} className="createNewCard">
      <div className="newCardScff">
        <div className="sticker"></div>
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
          className="addImageIcon"
          onClick={() => {
            filebtn.current.click();
          }}
        >
          <ion-icon name="add-circle-outline"></ion-icon>
        </div>
        <input
          className="fileInputButton"
          ref={filebtn}
          type="file"
          accept=".jpg,.jpeg,.jfif,.pjpeg,.pjp,.png,.svg,.gif"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></input>

        <div className="formArea">
          <div className="colorSelect">
            <div
              onClick={() => {
                setThemeColor("#b7003c");
              }}
              style={{
                backgroundColor: "#b7003c",
                border: themeColor === "#b7003c" ? "5px solid gray" : "none",
              }}
            ></div>
            <div
              onClick={() => {
                setThemeColor("#061F3F");
              }}
              style={{
                backgroundColor: "#061F3F",
                border: themeColor === "#061F3F" ? "5px solid gray" : "none",
              }}
            ></div>
            <div
              onClick={() => {
                setThemeColor("#294726");
              }}
              style={{
                backgroundColor: "#294726",
                border: themeColor === "#294726" ? "5px solid gray" : "none",
              }}
            ></div>
            <div
              onClick={() => {
                setThemeColor("#000000");
              }}
              style={{
                backgroundColor: "#000000",
                border: themeColor === "#000000" ? "5px solid gray" : "none",
              }}
            ></div>
          </div>
          <input type="text" placeholder="Name" ref={nameText}></input>
          <input type="text" placeholder="Title" ref={titleText}></input>
          <input
            type="text"
            placeholder="Department"
            ref={departmentText}
          ></input>
          <input type="text" placeholder="Company" ref={companyText}></input>
          <textarea
            type="text"
            placeholder="Headline"
            maxLength="100"
            ref={headline}
            onChange={() => {
              setCounter(headline.current.value.length);
            }}
          ></textarea>
          <div className="counter">
            <span>{counter}</span>
            <span>/</span>
            <span>100</span>
          </div>
          <div className="logoUpload">
            <h2>Add badge or logo.</h2>
            <input
              type="file"
              accept=".jpg,.jpeg,.jfif,.pjpeg,.pjp,.png,.svg,.gif"
              ref={logoBtn}
              className="logoInputBtn"
            />
            <div
              style={{ backgroundImage: `url(${logoImage})` }}
              onClick={() => {
                logoBtn.current.click();
              }}
            ></div>
          </div>
          <div className="itemSelected">
            {itemSelected.map((ele) => {
              return (
                <div key={ele.key}>
                  {ele.icon}
                  <input
                    type="text"
                    placeholder={ele.placeholder}
                    onChange={(e) => {
                      setdetails((prev) =>
                        prev.map((element) => {
                          if (element.key === ele.key) {
                            let temp = element;
                            temp[ele.name] = e.target.value;
                            return temp;
                          } else return element;
                        })
                      );
                    }}
                  ></input>
                  <ion-icon
                    name="trash-outline"
                    onClick={() => {
                      setItemSelected((prev) =>
                        prev.filter((element) => element.key !== ele.key)
                      );
                      setdetails((prev) =>
                        prev.filter((element) => element.key !== ele.key)
                      );
                    }}
                  ></ion-icon>
                </div>
              );
            })}
          </div>
          <div className="itemPanel">
            {cardItem.map((ele) => {
              return (
                <div
                  key={ele.key}
                  onClick={() => {
                    let ukey = uuid();
                    setItemSelected((prev) => {
                      return [
                        ...prev,
                        {
                          icon: ele.icon,
                          name: ele.name,
                          placeholder: ele.placeholder,
                          key: ukey,
                        },
                      ];
                    });
                    setdetails((prev) => {
                      return [...prev, { [ele.name]: "", key: ukey }];
                    });
                  }}
                >
                  {ele.icon}
                  <span>{ele.name}</span>
                </div>
              );
            })}
            <button onClick={postData}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
