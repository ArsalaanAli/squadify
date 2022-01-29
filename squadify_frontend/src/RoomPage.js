import { React, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function RoomPage() {
  let params = useParams();
  const [memberData, setMemberData] = useState("");
  const navigate = useNavigate();
  const locationData = useLocation();
  const SendToLogin = (code) => {
    navigate("/Login");
    //navigate("/Login", { state: { roomCode: code } }
  };

  const LoadMemberData = () => {
    console.log("loading data");
  };

  useEffect(() => {
    if (memberData === "") {
      fetch("/api/getMembers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ RoomCode: params.RoomCode }),
      }).then((response) =>
        response.json().then((data) => {
          console.log(data["memberData"]);
          setMemberData(data["memberData"]);
        })
      );
    }
  }, []);

  //render conditions
  const memberDataDisplayed =
    memberData === "" ? (
      <h2>loading data...</h2>
    ) : (
      <h2>{JSON.stringify(memberData)}</h2>
    );

  const addMemberButton =
    locationData.state.SpotifyCode === null ? (
      <button onClick={() => SendToLogin()}>Login</button>
    ) : (
      <button onClick={() => LoadMemberData()}>Add Your Data</button>
    );

  return (
    <div>
      <h1>Room: {params.RoomCode}</h1>
      {/* <h2>loading data...</h2> */}
      {memberDataDisplayed}
      {addMemberButton}
    </div>
  );
}
