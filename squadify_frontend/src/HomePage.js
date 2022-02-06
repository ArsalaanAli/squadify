import React, { useState, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const [roomCode, setRoomCode] = useState("NONE");
  const [loggedIn, setLoggedIn] = useState("asd");

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

  const SendToLogin = (code) => {
    navigate("/Login");
    //navigate("/Login", { state: { roomCode: code } }
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

  const CreateRoomButton = () => {
    console.log(loggedIn);
    if (loggedIn) {
      return (
        <button
          onClick={async () => {
            await GetNewRoomCode();
          }}
        >
          Create Room
        </button>
      );
    } else {
      return (
        <button onClick={() => SendToLogin()}>Login To Create Room</button>
      );
    }
  };

  return (
    <div>
      <div class="spacer layer1">
        <h1 class="title">SQUADIFY</h1>
        <button class="spotifyButton">
          <span class="buttonText">Hello</span>
          <span class="buttonIcon">
            <FaSpotify color="white" />
          </span>
        </button>

        <p class="subtitle">
          Some random subtitle about comparing spotify stats
        </p>

        {/* {CreateRoomButton()}
          <input
            type="text"
            placeholder="Room Code"
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button onClick={() => NavigateToRoom()}>Join Room</button> */}
      </div>
      <div class="spacer layer2"></div>
    </div>
  );
}

export default HomePage;
