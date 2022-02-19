import React, { useContext, useState } from "react";
import { Button } from "../../components";
import apiUrls from "../../config/backendApiUrlConfig";
import { AuthContext } from "../../store";

export function RequestTool() {
  const [response, setResponse] = useState("");
  const { auth } = useContext(AuthContext);

  function authorizationHeader() {
    if (!auth.keycloak) {
      return {};
    }
    return {
      headers: {
        Authorization: "Bearer " + auth.keycloak.token,
      },
    };
  }

  const sendRequest = async (url: string) => {
    try {
      const response = await fetch(url, authorizationHeader());
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
    } catch (err: any) {
      setResponse(err.toString());
      console.log(err);
    }
  };

  const handleClickCustomerGetAllUrl = async () => {
    await sendRequest(apiUrls.customerGetAllUrl);
  };

  const handleClickCustomerDeleteOneUrl = async () => {
    await sendRequest(apiUrls.customerDeleteOneUrl);
  };
  const handleClickInitTestData = async () => {
    await sendRequest(apiUrls.initTestDataUrl);
  };

  return (
    <div className="QueryAPI">
      <h2>Requests Tool (For tests api) </h2>
      <div>
        <Button onClick={handleClickCustomerGetAllUrl}>Get all customer</Button>
        <Button onClick={handleClickInitTestData}>Init test data</Button>
        <Button onClick={handleClickCustomerDeleteOneUrl}>
          Delete one customer
        </Button>
      </div>
      <hr />
      <pre>{response || ""}</pre>
    </div>
  );
}
