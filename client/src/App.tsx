import React, { useEffect } from "react";
import "./App.css";
import { Player } from "@shared/types";

function App() {
  const player: Player = { id: "23", name: "233" };
  console.log(player);
  useEffect(() => {
    (async () => {
      const data = await fetch("http://localhost:3001/api/room/allRooms");
      console.log("data");
      console.log(data);
    })();
  });

  return <div className="App">yoyo</div>;
}

export default App;
