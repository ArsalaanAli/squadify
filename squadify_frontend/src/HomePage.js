import React, { useState, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const [roomCode, setRoomCode] = useState("NONE");
  const [loggedIn, setLoggedIn] = useState(false);

  let navigate = useNavigate();

  const GetNewRoomCode = async () => {
    if (roomCode === "NONE") {
      await fetch("api/createRoom")
        .then((resp) => resp.json())
        .then((resp) => navigate("Room/" + resp["RoomCode"]));
    }
  };

  const sendCode = async (code) => {
    await fetch("/api/sendCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    });
  };

  const checkLoggedIn = () => {
    fetch("/api/checkLoggedIn")
      .then((resp) => resp.json())
      .then((resp) => resp["state"])
      .then((resp) => setLoggedIn(resp));
  };

  const GetSpotifyURL = async () => {
    await fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.url;
      });
  };

  useEffect(() => {
    const spotifyCode = new URL(window.location.href).searchParams.get("code");
    if (spotifyCode === null) {
      checkLoggedIn();
    } else {
      sendCode(spotifyCode);
      navigate("/");
    }
  }, [loggedIn]);

  const NavigateToRoom = () => {
    if (roomCode === "Test" || roomCode.length === 6) {
      navigate("Room/" + roomCode);
    }
  };

  const HomePageForm = () => {
    console.log(loggedIn);
    if (loggedIn) {
      return (
        <div>
          <button
            className="createButton"
            onClick={async () => {
              await GetNewRoomCode();
            }}
          >
            <span className="createButtonText">Create Room</span>
          </button>
          <br />
          <input placeholder="Enter Your Room Code"></input>
        </div>
      );
    } else {
      return (
        <button
          type="button"
          className="spotifyButton"
          onClick={() => GetSpotifyURL()}
        >
          <span className="buttonIcon">
            <FaSpotify size="2em" />
          </span>
          <span className="buttonText">Login with Spotify</span>
        </button>
      );
    }
  };

  return (
    <div>
      <div className="spacer layer1">
        <h1 className="title">SQUADIFY</h1>

        <p className="subtitle">
          Compare your Spotify stats with your squad to learn about your
          friends' music tastes
        </p>
        {HomePageForm()}
      </div>
      <div className="spacer layer2"></div>
    </div>
  );
}

export default HomePage;
