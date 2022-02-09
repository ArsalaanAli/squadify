import { React, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RoomPage() {
  //Router Variables
  let params = useParams();
  //State Variables
  const [loggedIn, setLoggedIn] = useState(false);
  const [roomData, setRoomData] = useState("none");
  const [userData, setUserData] = useState("none");
  const [spotifyData, setSpotifyData] = useState("none");
  const firstUpdate = useRef(true);
  //First useEffect checks logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      await fetch("/api/checkLoggedIn")
        .then((resp) => resp.json())
        .then((resp) => setLoggedIn(resp["state"]));
    };
    checkLoggedIn();
  });
  //useEffect after login
  //get roomData
  useEffect(async () => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    await GetSpotifyData();
    await GetRoomData();
    await GetUserData();
  }, [loggedIn]);
  //get userData

  useEffect(() => {
    console.log(userData);
    console.log(roomData);
    if (!(userData == "none" || roomData == "none")) {
      if (roomData["MemberData"] === true) {
        roomData["MemberData"] = {};
        roomData["MemberData"][userData.id] = spotifyData;
        console.log(roomData);
      }
    }
  }, [userData]);

  //Recives room data
  const GetRoomData = async () => {
    await fetch("/api/getRoomData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ RoomCode: params.RoomCode }),
    }).then((response) =>
      response.json().then((data) => {
        console.log(data);
        setRoomData(data);
      })
    );
  };

  const GetUserData = async () => {
    await fetch("/api/getUserData")
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setUserData(resp);
      });
  };

  const GetSpotifyData = async () => {
    await fetch("/api/getSpotifyData")
      .then((response) => response.json())
      .then((data) => {
        console.log(data["spotifyData"]);
        setSpotifyData(data["spotifyData"]);
      });
  };

  return (
    <div>
      <h1>hello{loggedIn.toString()}</h1>
    </div>
  );
}
