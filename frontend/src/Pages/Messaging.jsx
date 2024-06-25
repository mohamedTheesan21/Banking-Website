import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { checkToken } from "../Tokens/CheckToken";
import Navbar from "../Components/Navbar/Navbar";
import "./CSS/Messaging.css";

function Messaging() {
  const [socket, setSocket] = useState(null);
  const [readMessages, setReadMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkToken("token");
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      // Establish socket connection with token
      const newSocket = io("http://localhost:3001", {
        transports: ["websocket"],
        query: { token: `Bearer ${token}` },
      });

      setSocket(newSocket);

      return () => {
        newSocket.off("newMessage");
        newSocket.close();
      };
    }
  }, [navigate]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3001/messages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setReadMessages(data.readMessages);
          setUnreadMessages(data.unreadMessages);
        } else if (response.status === 403) {
          const data = await response.json();
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && socket) {
      console.log("newMessage", newMessage);
      socket.emit("newMessage", {
        content: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="Chat">
      <Navbar />
      <div className="messages overflow-auto  text-white px-5">
        {readMessages.map((message, index) => (
          <div
            className={
              message.sender !== "admin" ? "chat-message-user" : "chat-message"
            }
            key={index}
          >
            <span className="message-content pe-5">{message.content}</span>
            <span className="time-stamp">{message.time}</span>
          </div>
        ))}
        {unreadMessages.length>0 ?<div className=" text-center " style={{backgroundColor:"#454646"}}>
          <h3>Unread Messages</h3>
          {unreadMessages.map((message, index) => (
            <div
              className={
                message.sender !== "admin"
                  ? "chat-message-user"
                  : "chat-message"
              }
              key={index}
            >
              <span className="message-content pe-5">{message.content}</span>
              <span className="time-stamp">{message.time}</span>
            </div>
          ))}
        </div>:<></>}
      </div>
      <div className="send">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown= {(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }}
          }
          placeholder="Type your message here..."
        />
        {newMessage ? (
          <button className="btn btn-send" onClick={handleSendMessage}>
            <i className="fa-sharp fa-solid fa-paper-plane"></i>
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Messaging;
