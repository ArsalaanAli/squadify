import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RoomPage() {
  let params = useParams();
  const [memberData, setMemberData] = useState("");
  useEffect(() => {
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
  }, []);
  if (memberData === "") {
    return (
      <div>
        <h1>Room: {params.RoomCode}</h1>
        <h2>loading data...</h2>
      </div>
    );
  }
  return (
    <div>
      <h1>Room: {params.RoomCode}</h1>
      {Object.keys(memberData).map((key) => (
        <h2>
          {key} listens to {memberData[key]}
        </h2>
      ))}
    </div>
  );
}
