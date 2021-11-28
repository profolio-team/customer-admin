import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import serverApi from "../serverApi";

export default function Registration() {
  let navigate = useNavigate();
  const [userInfoData, setUserInfoData] = useState({
    email: ``,
    domain: ``,
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
      setTimeout(() => {
        navigate(
          `/confirm?email=${userInfoData.email}&domain=${userInfoData.domain}`
        );
      }, 1500);
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
          .profolio.com
        </label>
      </div>
      <button onClick={registration}>Registration</button>
      <p>{infoMessage}</p>
    </div>
  );
}
