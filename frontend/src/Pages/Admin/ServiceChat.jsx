import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceChat.css";

function ServiceChat() {
  const [newMessage, setNewMessage] = useState("");
  const [readMessages, setReadMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  const handleClick = (user) => {
    setReadMessages([]);
    setUnreadMessages([]);
    setSelectedUser(user);
    console.log("clicked", user);

    if (user) {
      console.log("fetching messages for ", user);
      const data = {
        username: user,
      };
      fetch("http://localhost:3001/admin/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          if (response.status === 200) {
            const data = await response.json();
            setCount(data.unreadMessages.length);
            setUnreadMessages(data.unreadMessages);
            setReadMessages(data.readMessages);
          } else if (response.status === 403) {
            const data = await response.json();
            setError(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const data = {
        username: selectedUser,
        content: newMessage,
      };
      fetch("http://localhost:3001/admin/sendmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          if (response.status === 200) {
            const data = await response.json();
            setCount(data.unreadMessages.length);
            setUnreadMessages(data.unreadMessages);
            setReadMessages(data.readMessages);
            setNewMessage("");
          } else if (response.status === 403) {
            const data = await response.json();
            setError(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  return (
    <div className="row w-100 m-0">
      <div className="w-25 chat-left">
        <h1>Chats</h1>
        <div className="user" onClick={() => handleClick("Theesan")}>
          <i class="fa-solid fa-user fa-2x"></i>
          <h3>Theesan</h3>
          {count > 0 ? <div className="unread-count-admin">{count}</div> : <></>}
        </div>
        <div className="user" onClick={() => handleClick("Mohamed")}>
          <i className="fa-solid fa-user fa-2x"></i>
          <h3>Mohamed</h3>
          {count > 0 ? <div className="unread-count-admin">{count}</div> : <></>}
        </div>
      </div>
      <div className="w-75 chat-right">
        <div className="chat">
          {selectedUser && (
            <div className="user header p-1 rounded-0">
              <i className="fa-solid fa-user fa-2x"></i>
              <h3>{selectedUser}</h3>
            </div>
          )}
          <div className="messages overflow-auto  text-white px-5">
            
            {readMessages.map((message, index) => (
              <div
                className={
                  message.sender !== "admin"
                    ? "chat-message"
                    : "chat-message-user"
                }
                key={index}
              >
                <span className="message-content pe-5">{message.content}</span>
                <span className="time-stamp">{message.time}</span>
              </div>
            ))}
            {unreadMessages.length > 0 ? (
              <div>
                <h3>Unread Messages</h3>
                {unreadMessages.map((message, index) => (
                  <div
                    className={
                      message.sender !== "admin"
                        ? "chat-message"
                        : "chat-message-user"
                    }
                    key={index}
                  >
                    <span className="message-content pe-5">{message.content}</span>
                    <span className="time-stamp">{message.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="send">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
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
    </div>
  );
}

export default ServiceChat;
