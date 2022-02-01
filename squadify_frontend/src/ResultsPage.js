import { React, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function ResultsPage() {
  const roomData = useLocation().state.roomData.MemberData;
  console.log(roomData);

  useEffect(() => {
    fetch("/api/analyzeRoomData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomData: roomData }),
    }).then((response) => response.json([]));
  });

  return (
    <div>
      <p>Results Page</p>
      <p>asd</p>
    </div>
  );
}

export default ResultsPage;
