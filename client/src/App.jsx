import WelcomeScreen from "./components/WelcomeScreen";
import ChatScreen from "./components/ChatScreen";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import React from "react";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
