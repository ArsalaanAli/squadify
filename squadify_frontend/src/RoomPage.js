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
  const [userInRoom, setUserInRoom] = useState(false);
  const firstUpdate = useRef(true);
  const firstUser = useRef(false);
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
  //get all data
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const GetData = async () => {
      await GetSpotifyData();
      await GetRoomData();
      await GetUserData();
    };
    GetData();
  }, [loggedIn]);
  //get userData

  //useEffect checks if user is in room
  useEffect(() => {
    console.log(userData);
    console.log(roomData);

    if (!(userData === "none" || roomData === "none")) {
      //if user created the room for the first time
      if (roomData["MemberData"] === true) {
        firstUser.current = true;
      } else {
        if (userData.id in roomData["MemberData"]) {
          setUserInRoom(true);
        }
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
        console.log(data);
        setSpotifyData(data);
      });
  };

  const AddUserDataToRoom = () => {
    if (firstUser.current) {
      roomData["MemberData"] = {};
      roomData["MemberId"] = {};
    }
    roomData["MemberData"][userData.id] = spotifyData;
    roomData["MemberId"][userData.id] = userData.display_name;
    sendUserDataToDatabase();
  };

  const sendUserDataToDatabase = async () => {
    console.log(spotifyData);
    await fetch("/api/sendUserDataToDatabase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomCode: params.RoomCode,
        userData: userData,
        spotifyData: spotifyData,
      }),
    }).then((resp) => console.log(resp));
  };

  const JoinRoomButton = () => {
    console.log(userInRoom);
    if (userInRoom) {
      return;
    } else {
      return (
        <button onClick={() => sendUserDataToDatabase()}>Join Room</button>
      );
    }
  };

  return (
    <div>
      <h1>hello{loggedIn.toString()}</h1>
      {JoinRoomButton()}
    </div>
  );
}
