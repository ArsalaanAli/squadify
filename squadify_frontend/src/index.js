import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import reportWebVitals from "./reportWebVitals";
import RoomPage from "./RoomPage";
import ResultsPage from "./ResultsPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Room" element={<RoomPage />}>
          <Route path=":RoomCode" element={<RoomPage />} />
        </Route>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Results" element={<ResultsPage />}>
          <Route path=":RoomCode" element={<ResultsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
