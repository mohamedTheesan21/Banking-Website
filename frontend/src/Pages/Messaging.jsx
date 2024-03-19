import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { checkToken } from "../Tokens/CheckToken";
import "./CSS/Messaging.css";

function Messaging() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
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

      // newSocket.on("newMessage", (message) => {
      //   setMessages((prevMessages) => [...prevMessages, message]);
      // });

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
          setMessages(data.messages);
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
      <div className="messages overflow-auto  text-white px-5">
        {messages.map((message, index) => (
          <div className={message.sender !== "admin" ? "chat-message-user": "chat-message"} key={index}>
            <span className="message-content pe-5">{message.content}</span>
            <span className="time-stamp">{message.time}</span>
          </div>
        ))}
      </div>
      <div className="send">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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
