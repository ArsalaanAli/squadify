import { React, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function RoomPage() {
  let params = useParams();
  const [memberData, setMemberData] = useState("");
  const [loggedIn, setLoggedIn] = useState(null);
  const navigate = useNavigate();

  const checkLoggedIn = async () => {
    await fetch("/api/checkLoggedIn")
      .then((resp) => resp.json())
      .then((resp) => setLoggedIn(resp["state"]));
  };

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
    checkLoggedIn();
  }, []);

  //render conditions
  const memberDataDisplayed = (memberData) => {
    if (memberData === "") {
      return <h2>loading data...</h2>;
    }
    return <h2>{JSON.stringify(memberData)}</h2>;
  };
  const addMemberButton = (loggedIn) => {
    if (loggedIn) {
      return <button onClick={() => LoadMemberData()}>Add Your Data</button>;
    }
    return <button onClick={() => SendToLogin()}>Login</button>;
  };
  return (
    <div>
      <h1>Room: {params.RoomCode}</h1>
      {memberDataDisplayed(memberData)}
      {addMemberButton(loggedIn)}
    </div>
  );
}
