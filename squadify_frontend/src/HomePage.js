import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { useNavigate, useLocation } from "react-router-dom";
function HomePage() {
  const [roomCode, setRoomCode] = useState("NONE");
  const [loggedIn, setLoggedIn] = useState(null);

  let navigate = useNavigate();
  let location = useLocation();

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
    }).then((resp) => console.log(resp.json()));
  };

  const checkLoggedIn = async () => {
    await fetch("/api/checkLoggedIn")
      .then((resp) => resp.json())
      .then((resp) => setLoggedIn(resp["state"]));
  };

  const SendToLogin = (code) => {
    navigate("/Login");
    //navigate("/Login", { state: { roomCode: code } }
  };

  useEffect(() => {
    console.log("hello");
    const spotifyCode = new URL(window.location.href).searchParams.get("code");
    if (spotifyCode === null) {
      checkLoggedIn();
    } else {
      sendCode(spotifyCode);
      navigate("/");
    }
  }, [location]);

  const NavigateToRoom = () => {
    if (roomCode === "Test" || roomCode.length === 6) {
      navigate("Room/" + roomCode);
    }
  };

  const CreateRoomButton = (loggedIn) => {
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
      <h1 className="title">HomePage</h1>
      <section className="blue">
        <h1>Squadify</h1>
        {CreateRoomButton(loggedIn)}
        <input
          type="text"
          placeholder="Room Code"
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button onClick={() => NavigateToRoom()}>Join Room</button>
      </section>
      <section className="red">
        <h1>Title</h1>
        <p>random text</p>
      </section>
    </div>
  );
}

export default HomePage;
