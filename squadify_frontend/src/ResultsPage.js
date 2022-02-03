import { React, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function ResultsPage() {
  const [parsedData, setParsedData] = useState("");
  const roomData = useLocation().state.roomData.MemberData;
  let params = useParams();

  useEffect(() => {
    if (parsedData === "") {
      fetch("/api/analyzeRoomData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomData: roomData }),
      })
        .then((response) => response.json())
        .then((resp) => setParsedData(resp));
    }
  }, []);

  useEffect(() => {
    if (!(parsedData === "")) {
      console.log(parsedData);
      for (const [key, value] of Object.entries(parsedData)) {
        if (value[0] === "none") {
          delete parsedData[key]; //WONT UPDATE IMMEDIATELY
        }
      }
    }
  }, [parsedData]);

  const DisplayData = () => {
    return (
      <ul>
        {Object.keys(parsedData).map((genre, i) => (
          <p key={i}>{genre}</p>
        ))}
      </ul>
    );
  };
  return (
    <div>
      <p>Results Pge</p>
      <p>{params.RoomCode}</p>
      {DisplayData()}
    </div>
  );
}

export default ResultsPage;
