import { useChatContext } from "../context/chatContext";
import React, { useState } from "react";

const ChatScreen = () => {
  const { roomId, messages, navigate, socket, userId } = useChatContext();
  const [inputMessage, setInputMessage] = useState("");

  if (!roomId) {
    navigate("/");
  }

  const handelSendMessage = () => {
    if (!inputMessage) {
      alert("Please enter your message first!!!");
      return;
    }

    const payload = JSON.stringify({
      type: "chat",
      roomId: roomId,
      senderId: userId.current,
      message: inputMessage,
    });

    socket.current.send(payload);
    setInputMessage("");
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-100">
      {/* Header */}
      <div className="h-14 pt-10 pb-5 bg-blue-600 text-white flex items-center justify-center font-semibold">
        Room: {roomId || "Chat"}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === userId.current
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2  shadow text-sm max-w-[70%]
          ${
            msg.senderId === userId.current
              ? "bg-blue-600 text-white rounded-md rounded-br-none"
              : "bg-white text-black rounded-md rounded-tl-none"
          }
        `}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t flex items-center gap-2 mb-4">
        <input
          onChange={(e) => setInputMessage(e.target.value)}
          value={inputMessage}
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handelSendMessage()}
          className="bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
