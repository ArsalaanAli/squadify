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
      }).then((response) => setParsedData(response.json()));
    }
  }, []);

  useEffect(() => {
    if (!(parsedData === "")) console.log(parsedData);
  }, [parsedData]);

  return (
    <div>
      <p>Results Page</p>
      <p>{params.RoomCode}</p>
    </div>
  );
}

export default ResultsPage;
