import React, { useEffect, useState } from "react";
import "./HomePage.css";
function HomePage() {
  // useEffect(async () => {
  // await fetch("api/initialize").then((resp) => console.log(resp.json()));
  // }, []);

  const GetNewRoomCode = async () => {
    await fetch("api/createRoom")
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));
  };

  return (
    <div>
      <h1 className="title">HomePage</h1>
      <section className="blue">
        <h1>Squadify</h1>
        <button
          onClick={async () => {
            await GetNewRoomCode();
            console.log("hi");
          }}
        >
          Create Room
        </button>
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
