import React from "react";
import { useParams } from "react-router-dom";
export default function RoomPage() {
  let params = useParams();
  return <h1>Room: {params.RoomCode}</h1>;
}
