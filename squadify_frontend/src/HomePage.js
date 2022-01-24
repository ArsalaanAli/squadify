import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
function HomePage() {
  const [roomCode, setRoomCode] = useState("NONE");
  let navigate = useNavigate();
  const GetNewRoomCode = async () => {
    if (roomCode === "NONE") {
      await fetch("api/createRoom")
        .then((resp) => resp.json())
        .then((resp) => setRoomCode("Room/" + resp["RoomCode"]));
    }
  };
  useEffect(() => {
    if (roomCode !== "NONE") {
      navigate(roomCode);
    }
  }, [roomCode, navigate]);

  return (
    <div>
      <h1 className="title">HomePage</h1>
      <section className="blue">
        <h1>Squadify</h1>
        <button
          onClick={async () => {
            await GetNewRoomCode();
          }}
        ></button>
        <button>Join Room</button>
      </section>
      <section className="red">
        <h1>Title</h1>
        <p>random text</p>
      </section>
    </div>
  );
}

export default HomePage;
