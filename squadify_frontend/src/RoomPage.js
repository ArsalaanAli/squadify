import { React, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function RoomPage() {
  let params = useParams();
  const [roomData, setRoomData] = useState("");
  const [spotifyData, setSpotifyData] = useState("");
  const [userData, setUserData] = useState(""); //[email, username]
  const [loggedIn, setLoggedIn] = useState(null);
  const [userDataInRoom, setUserDataInRoom] = useState(false);
  const navigate = useNavigate();

  const checkLoggedIn = async () => {
    await fetch("/api/checkLoggedIn")
      .then((resp) => resp.json())
      .then((resp) => setLoggedIn(resp["state"]));
  };

  const checkUserDataInRoom = async () => {
    await fetch("/api/getUserData")
      .then((resp) => resp.json())
      .then((resp) => setUserData(resp["userData"]));
    if (userData["email"] in roomData["MemberEmails"]) {
      setUserDataInRoom(true);
    } else {
      setUserDataInRoom(false);
    }
  };

  const AddUserDataToRoom = async () => {
    const oldRoomData = roomData;
    oldRoomData["MemberEmails"][userData["email"]] = true;
    oldRoomData["MemberData"][userData["display_name"]] = spotifyData;
    setRoomData(oldRoomData);
    setUserDataInRoom(true);
  };

  const GetSpotifyData = async () => {
    await fetch("/api/getSpotifyData")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyData(data["spotifyData"]);
      });
  };

  const SendToLogin = (code) => {
    navigate("/Login");
    //navigate("/Login", { state: { roomCode: code } }
  };

  useEffect(() => {
    if (roomData === "") {
      fetch("/api/getRoomData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ RoomCode: params.RoomCode }),
      }).then((response) =>
        response.json().then((data) => {
          setRoomData(data["roomData"]);
        })
      );
    } else {
      checkUserDataInRoom();
    }
    checkLoggedIn();
  }, [roomData]);

  useEffect(() => {
    if (!(spotifyData === "")) AddUserDataToRoom();
  }, [spotifyData]);

  //render conditions
  const roomDataDisplayed = () => {
    if (roomData === "") {
      return <h2>loading data...</h2>;
    }
    return (
      <h2>
        {Object.keys(roomData.MemberData).map((key, i) => (
          <p key={i}>{key}</p>
        ))}
      </h2>
    );
  };
  const addMemberButton = (userDataInRoom) => {
    if (userDataInRoom) {
      return <button>Your Data Is Already Here</button>;
    }
    return (
      <button
        onClick={async () => {
          await GetSpotifyData();
        }}
      >
        Add Your Data
      </button>
    );
  };
  return (
    <div>
      <h1>Room: {params.RoomCode}</h1>
      {/* <p>{JSON.stringify(spotifyData)}</p> */}
      {roomDataDisplayed(roomData)}
      {addMemberButton(userDataInRoom)}
    </div>
  );
}
