import React, { useEffect, useState } from "react";
// import FrontPage from "./Pages/FrontPage";

// redirect code: window.location.href = "https://google.com/contact";

function LoginPage(props) {
  //Variables
  const [code, setCode] = useState(null);
  const [userData, setUserData] = useState(null);

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
  else if (typeof code === "string" && userData === null) {
    sendCode();
    console.log("done");
    return (
      <div>
        <button type="button">Get Spotify Data</button>
      </div>
    );
  } else {
    const rows = [];
    for (var i = 0; i < userData["items"].length; i++) {
      console.log(i);
      rows.push(userData["items"][i].name);
      console.log(userData["items"][i].name);
    }
    console.log(userData["items"][0].name); //USER DATA IS UNDEFINED OBJECTS?
    return (
      <div>
        <h2>your top artists</h2>
        {userData["items"].map((artist, index) => (
          <p>
            {index + 1} {artist.name}
          </p>
        ))}
      </div>
    );
  }
}

export default LoginPage;
