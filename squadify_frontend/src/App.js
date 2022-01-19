import React, { useEffect, useState } from "react";
// import FrontPage from "./Pages/FrontPage";

// redirect code: window.location.href = "https://google.com/contact";

function App() {
  //Variables
  const [code, setCode] = useState(null);
  const [redirectURL, setRedirectURL] = useState("");

  //Checking if code in url params
  useEffect(() => {
    const curURL = new URL(window.location.href);
    setCode(curURL.searchParams.get("code"));
    console.log("useeffect");
  }, []);

  //redirecting to spotify login
  const GetSpotifyURL = async () => {
    await fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.url;
      });
  };

  const sendCode = async () => {
    await fetch("/api/sendCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    }).then((resp) => console.log(resp.json()));
  };

  const GetSpotifyData = async () => {
    await fetch("/api/getSpotifyData")
      .then((response) => response.json())
      .then((data) => {
        console.log(data["userData"]);
      });
  };

  //If there is not code, present login
  if (code == null) {
    return (
      <div>
        <button
          type="button"
          onClick={async () => {
            await GetSpotifyURL();
          }}
        >
          Login
        </button>
      </div>
    );
  }

  //if there is a code, finished
  if (typeof code === "string") {
    sendCode();
    console.log("done");
    return (
      <div>
        <button
          type="button"
          onClick={async () => {
            await GetSpotifyData();
          }}
        >
          Get Spotify Data
        </button>
      </div>
    );
  }
}

export default App;
