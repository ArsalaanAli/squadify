import { React, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ComposeResults from "./ComposeResults";

function ResultsPage() {
  const [parsedData, setParsedData] = useState("");
  const [showResults, setShowResults] = useState(false);
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
      for (const [key, value] of Object.entries(parsedData)) {
        if (value[0] === "none") {
          delete parsedData[key]; //WONT UPDATE IMMEDIATELY
        }
      }
    }
  }, [parsedData]);

  const DisplayData = () => {
    if (showResults) {
      return <div>{ComposeResults(parsedData)}</div>;
    }
    return (
      <button
        onClick={() => {
          setShowResults(true);
        }}
      >
        Show Results
      </button>
    );
  };
  return (
    <div>
      <p>Results Page</p>
      <p>{params.RoomCode}</p>

      {DisplayData()}
    </div>
  );
}

export default ResultsPage;
