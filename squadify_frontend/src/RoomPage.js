import { React, useEffect, useState } from "react";
import { useParams, useNavigate, Redirect } from "react-router-dom";

export default function RoomPage() {
  let params = useParams();
  const [memberData, setMemberData] = useState("");
  const navigate = useNavigate();
  const AddNewMember = (code) => {
    navigate("/Login", { state: { roomCode: code } });
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
  if (memberData === "") {
    return (
      <div>
        <h1>Room: {params.RoomCode}</h1>
        <h2>loading data...</h2>
        <button onClick={() => AddNewMember(params.RoomCode)}>
          Add Member
        </button>
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
      <button onClick={() => AddNewMember(params.RoomCode)}>Add Member</button>
    </div>
  );
}
