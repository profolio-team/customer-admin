import React, { useState } from "react";

import serverApi from "../serverApi";
export default function Registration() {
  const [userInfoData, setUserInfoData] = useState({
    domain: "",
    email: "",
  });

  const [infoMessage, setInfoMessage] = useState("");

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserInfoData({
      ...userInfoData,
      [name]: value,
    });
  }
  const registration = async () => {
    const result = await serverApi.registration(
      userInfoData.domain,
      userInfoData.email
    );
    if (result.error) {
      setInfoMessage(result.error);
    } else {
      setInfoMessage("Registration complite");
    }
    console.log("result", result);
  };
  return (
    <div>
      <h3>Registartion</h3>
      <div>
        <label>
          Email:
          <input
            type="text"
            name="email"
            onChange={handleInputChange}
            value={userInfoData.email}
          />
        </label>
      </div>
      <div>
        <label>
          Domain:
          <input
            type="text"
            name="domain"
            onChange={handleInputChange}
            value={userInfoData.domain}
          />
        </label>
      </div>
      <button onClick={registration}>Registration</button>
      <p>{infoMessage}</p>
    </div>
  );
}
