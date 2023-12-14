import React, { useState, useRef, useEffect } from "react";
import {
  faMessage,
  faTimes,
  faVideo,
  faArrowLeft,
  faPaperPlane,
  faCheckDouble,
  faPhone,
  faPhoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Container,
  ListGroup,
  Navbar,
  Modal,
  FormControl,
} from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";

export default function ChatPat({ who }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [chosen, setChosen] = useState(false);
  const [myMessage, setMyMessage] = useState("");
  const [chats, setChats] = useState([]);

  ////////////////////////////video
  const [me, setMe] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/patientChat");
      if (response.status === 200) {
        console.log(response.data.messages);
        setChats(response.data.messages);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.response.data.message);
    }
  };

  const buttonStyle = {
    position: "fixed",
    bottom: "5rem",
    right: "1rem",
    fontSize: "1.1rem",
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    overflow: "hidden",
    transition: "width 0.3s ease-in-out", // Smooth transition for width change
    width: isHovered ? "13.3rem" : "3rem", // Change width on hover
  };

  const containerStyle = {
    position: "fixed",
    bottom: "5rem",
    right: "1rem",
    fontSize: "1.1rem",
    backgroundColor: "transparent",
    borderRadius: "0.25rem",
    color: "white",
    overflow: "hidden",
    transition: "0.3s ease-in-out", // Smooth transition for width change
    width: "20rem",
    padding: "0rem",
    maxHeight: "30rem",
  };

  const chatContainerStyle = {
    position: "fixed",
    bottom: "5rem",
    right: "1rem",
    fontSize: "1.1rem",
    backgroundColor: "transparent",
    border: "1px solid #f0f0f0",
    borderRadius: "0.25rem",
    color: "white",
    overflow: "hidden",
    transition: "0.3s ease-in-out", // Smooth transition for width change
    width: "20rem",
    padding: "0rem",
    maxHeight: "30rem",
    height: "30rem",
  };

  const buttonContentStyle = {
    display: "flex",
    alignItems: "center",
    position: "relative",
    transition: "0.3s ease-in-out", // Smooth transition for positioning
    left: isHovered ? "-0.3rem" : "0", // Move content to the left on hover
  };

  const myMsg = {
    backgroundColor: "#E0F8F8",
    borderRadius: "1rem",
    color: "black",
    display: "inline-block",
    padding: "5px 10px",
    marginBottom: "0.7rem",
    width: "fit-content",
    alignSelf: "flex-end",
  };

  const otherMsg = {
    backgroundColor: "#f0f0f0",
    borderRadius: "1rem",
    color: "black",
    display: "inline-block",
    padding: "5px 10px",
    marginBottom: "0.7rem",
    width: "fit-content",
  };

  const inputDiv = {
    marginTop: "auto", // Pushes the input to the bottom
    border: "1px solid #f0f0f0",
    alignSelf: "flex-end", // Aligns the input to the bottom of the container
    display: "flex", // Flex layout
    alignItems: "center", // Vertically align items
    width: "100%",
  };

  const buttonTextPosition = isHovered ? "0" : "-100%";
  const buttonTextOpacity = isHovered ? 1 : 0;

  const sendMessage = async () => {
    if (myMessage) {
      try {
        const response = await axios.post("/sendPatientChatMessage", {
          sender: "Patient",
          content: myMessage,
        });
        if (response.status === 200) {
          setChats(response.data.messages);
          setMyMessage("");
        }
      } catch (error) {
        console.log(error.message);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      {!isOpen && (
        <Button
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsOpen(true)} //trigger openning chat
        >
          <div style={buttonContentStyle}>
            <FontAwesomeIcon
              icon={faMessage}
              style={{ color: "white", marginRight: "5px" }}
            />
            <span
              style={{
                transition: "0.3s ease-in-out", // Smooth transition for text
                transform: `translateX(${buttonTextPosition})`, // Translate text on X-axis
                opacity: buttonTextOpacity,
                whiteSpace: "nowrap",
              }}
            >
              {"Chat with a Pharmacist"}
            </span>
          </div>
        </Button>
      )}

      {isOpen && (
        <div>
          {" "}
          <Container
            fluid
            className="d-flex flex-column bg-white"
            style={chatContainerStyle}
          >
            <Navbar
              className="d-flex justify-content-between p-1"
              style={{ backgroundColor: "#05afb9", width: "100%" }}
            >
              <div>
                {" "}
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{
                    marginRight: "1rem",
                    marginLeft: "0.2rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setChosen(false);
                    setIsOpen(true);
                  }}
                />
                {"Chat with a Pharmacist"}
              </div>
              <div>
                <Button
                  variant="link"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  style={{ color: "white", alignSelf: "flex-end" }}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ cursor: "pointer" }}
                  />
                </Button>
              </div>
            </Navbar>

            <div
              style={{ width: "100%", padding: "10px", overflowY: "auto" }}
              className="d-flex flex-column"
            >
              {/* <change */}
              {chats.map((item, index) => (
                <div
                  key={index}
                  className={
                    item.sender === "Patient" ? "text-end" : "text-start"
                  }
                  style={
                    item.sender === "Patient" ? { ...myMsg } : { ...otherMsg }
                  }
                >
                  <div>{item.content}</div>
                  <div style={{ fontSize: "0.6rem", textAlign: "end" }}>
                    {/* {item[1].split("-")[2]}
                    {"/"}
                    {item[1].split("-")[1]} {item[2]} */}
                    {item.sender === "Patient" && (
                      <FontAwesomeIcon
                        icon={faCheckDouble}
                        style={{ marginLeft: "0.3rem", color: "#adb5bd " }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={inputDiv} className="d-flex align-items-center">
              <input
                type="text"
                placeholder="Type your message"
                style={{
                  flex: "1",
                  marginRight: "1rem",
                  padding: "5px",
                  border: "1px solid transparent",
                }}
                value={myMessage}
                onChange={(e) => setMyMessage(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{
                  color: "#05afb9",
                  marginRight: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => sendMessage()}
              />
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
