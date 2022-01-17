import React, { useEffect, useState } from "react";
// import FrontPage from "./Pages/FrontPage";

// redirect code: window.location.href = "https://google.com/contact";

function App() {
  const [code, setCode] = useState("nul");
  const [redirectURL, setRedirectURL] = useState("");
  useEffect(() => {
    const curURL = new URL(window.location.href);
    setCode(curURL.searchParams.get("code"));
  });
  const GetSpotifyURL = () => {
    fetch("/api").then((resp) => console.log(resp.json()));
  };
  if (code == null) {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            GetSpotifyURL();
            console.log(redirectURL);
            // window.location.href = redirectURL;
          }}
        >
          Login
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button type="button">Finished</button>
      </div>
    );
  }
}

export default App;
