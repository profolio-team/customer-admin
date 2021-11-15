import React, { useState } from "react";
import apiUrls from "./config/backendApiUrlConfig";

export default function QueryAPI({ keycloak }) {
  const [response, setResponse] = useState("");

  function authorizationHeader() {
    if (!keycloak) {
      return {};
    }
    return {
      headers: {
        Authorization: "Bearer " + keycloak.token,
      },
    };
  }

  const handleClick = async () => {
    try {
      const response = await fetch(apiUrls.getUsersUrl, authorizationHeader());
      if (response.status === 200) {
        const json = await response.json();
        setResponse(JSON.stringify(json, null, 2));
      } else {
        setResponse(
          JSON.stringify(
            { status: response.status, message: response.statusText },
            null,
            2
          )
        );
      }
    } catch (err) {
      setResponse(err.toString());
      console.log(err);
    }
  };
  return (
    <div className="QueryAPI">
      <button onClick={handleClick}>Send API request</button>
      <pre>{response || ""}</pre>
    </div>
  );
}
