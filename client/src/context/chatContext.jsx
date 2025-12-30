import { createContext, useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const userId = useRef(crypto.randomUUID());
  const [roomId, setRoomId] = useState(null);
  const navigate = useNavigate();
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:3000");
    socket.current.onopen = () => console.log("Connection established");

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data.toString());
      setMessages((prev) => [...prev, data]);
    };

    // Handle the close event
    socket.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    // Handle errors
    socket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Clean up the connection when the component unmounts
    return () => {
      socket.current.close();
    };
  }, []);

  const value = {
    socket,
    messages,
    setMessages,
    roomId,
    setRoomId,
    navigate,
    userId,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
