import { useChatContext } from "../context/chatContext";
import React, { useEffect, useState } from "react";

const WelcomeScreen = () => {
  const { roomId, setRoomId, navigate, socket, userId } = useChatContext();
  const [inputRoomId, setInputRoomId] = useState(null);
  const [shouldJoin, setShouldJoin] = useState(false);
  const [joinModel, setJoinModle] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = () => {
    if (!roomId) {
      setRoomId(inputRoomId);
    }

    setShouldJoin(true);
  };

  const generateRoomId = () => {
    const id = Math.floor(Math.random() * (9999 - 1000) + 1000);
    setRoomId(id.toString());
  };

  useEffect(() => {
    if (!shouldJoin || !roomId) return;

    socket.current.send(
      JSON.stringify({ type: "join", roomId, senderId: userId.current })
    );

    navigate("/chat");
  }, [shouldJoin, roomId]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-green-400 via-white to-orange-400">
      {/* Welcome Message */}
      <div className="text-center mb-10 p-4">
        <h1 className="text-3xl font-bold text-gray-800">Welcome 👋</h1>
        <p className="text-gray-600 mt-2">
          Start chatting by joining or creating a room
        </p>
      </div>
      {/* Buttons */}
      {!joinModel && (
        <div className="space-y-4 flex flex-col gap-1">
          {roomId && (
            <div className="w-52 py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold shadow-lg active:scale-95 flex items-center justify-between gap-2">
              {/* Room Text */}
              <span className="text-center font-semibold flex-1 truncate">
                {roomId}
              </span>

              {/* Copy Button */}
              <button
                onClick={() => navigator.clipboard.writeText(roomId)}
                className="bg-white text-blue-600 px-2 py-1 rounded-md text-sm hover:bg-blue-100 transition"
              >
                Copy
              </button>
            </div>
          )}
          <button
            onClick={() => setJoinModle(true)}
            className="w-52 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg active:scale-95"
          >
            Join Chat
          </button>

          <button
            onClick={() => generateRoomId()}
            className="w-52 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-lg active:scale-95"
          >
            Create RoomId
          </button>
        </div>
      )}
      {/* Input Box */}
      {joinModel && (
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[85%]">
          <h3 className="text-center text-lg font-semibold text-gray-800 mb-3">
            Enter Room Code
          </h3>
          <input
            type="text"
            onChange={(e) => setInputRoomId(e.target.value)}
            placeholder="Room Code..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={() => handleJoin()}
            className="w-full mt-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Continue
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            onClick={() => {
              setJoinModle(false);
              setError(null);
            }}
            className="w-full mt-2 text-sm text-gray-500"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
