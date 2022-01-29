import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const [roomCode, setRoomCode] = useState("NONE");
  let navigate = useNavigate();
  const GetNewRoomCode = async () => {
    if (roomCode === "NONE") {
      await fetch("api/createRoom")
        .then((resp) => resp.json())
        .then((resp) => setRoomCode(resp["RoomCode"]));
    }
  };

  useEffect(() => {
    const SpotifyCode = new URL(window.location.href).searchParams.get("code");

    console.log(SpotifyCode);
  }, []);

  const NavigateToRoom = () => {
    if (roomCode === "Test" || roomCode.length === 6) {
      navigate("Room/" + roomCode);
    }
  };

  return (
    <div>
      <h1 className="title">HomePage</h1>
      <section className="blue">
        <h1>Squadify</h1>
        <button
          onClick={async () => {
            await GetNewRoomCode();
          }}
        >
          Create Room
        </button>
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
