import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
function HomePage() {
  const [roomCode, setRoomCode] = useState("NONE");
  const GetNewRoomCode = async () => {
    await fetch("api/createRoom")
      .then((resp) => resp.json())
      .then((resp) => setRoomCode("Room/" + resp["RoomCode"]));
  };
  useEffect(async () => {
    console.log(roomCode);
    return <Link to={roomCode}></Link>; //FIGURE OUT HOW TO LINK TO ROOMCODE
  }, [roomCode]);

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
      <section className="yellow">
        <h1>Title</h1>
        <p>random text</p>
      </section>
    </div>
  );
}

export default HomePage;
