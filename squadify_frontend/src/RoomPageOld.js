import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RoomPage() {
  let params = useParams();
  const [roomData, setRoomData] = useState("none");
  const [spotifyData, setSpotifyData] = useState("");
  const [userData, setUserData] = useState("");
  const [loggedIn, setLoggedIn] = useState(null);
  const [userDataInRoom, setUserDataInRoom] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!(userData === "") && roomData != "none") {
      if (userData["id"] in roomData["MemberId"]) {
        setUserDataInRoom(true);
      } else {
        setUserDataInRoom(false);
      }
    }
  }, [userData]);

  const checkLoggedIn = async () => {
    await fetch("/api/checkLoggedIn")
      .then((resp) => resp.json())
      .then((resp) => setLoggedIn(resp["state"]));
  };

  const checkUserDataInRoom = async () => {
    if (
      roomData["MemberId"] != true &&
      userData["id"] in roomData["MemberId"]
    ) {
      setUserDataInRoom(true);
    } else {
      setUserDataInRoom(false);
    }
  };

  const SendUserDataToDatabase = async () => {
    console.log(params.roomCode);
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

  const AddUserDataToRoom = async () => {
    const oldRoomData = roomData;
    oldRoomData["MemberId"][userData["id"]] = true;
    oldRoomData["MemberData"][userData["display_name"]] = spotifyData;
    setRoomData(oldRoomData);
    setUserDataInRoom(true);
    SendUserDataToDatabase();
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
    if (roomData === "none") {
      fetch("/api/getRoomData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ RoomCode: params.RoomCode }),
      }).then((response) =>
        response.json().then((data) => {
          console.log(data["roomData"]);
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
    console.log(roomData);
    if (roomData === "") {
      return <h2>loading data...</h2>;
    } else {
      return (
        <h2>
          {/* {Object.keys(roomData.MemberData).map((key, i) => (
            <p key={i}>{key}</p>
          ))} */}
          no
        </h2>
      );
    }
  };
  const addMemberButton = (userDataInRoom) => {
    if (userDataInRoom) {
      return (
        <button
          onClick={() => {
            navigate("/Results/" + params.RoomCode, {
              state: { roomData: roomData },
            });
          }}
        >
          View Squadify Results
        </button>
      );
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
