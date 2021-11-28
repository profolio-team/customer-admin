import React, { useState } from "react";
import serverApi from "../serverApi";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Confirm() {
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const [confirmInfoData, setConfirmInfoData] = useState({
    registrationCode: searchParams.get("registrationCode") || "",
    domain: searchParams.get("domain") || "",
    email: searchParams.get("email") || "",
  });

  const [infoMessage, setInfoMessage] = useState("");

  function handleInputChange(event) {
    const { name, value } = event.target;
    setConfirmInfoData({
      ...confirmInfoData,
      [name]: value,
    });
  }

  const confirmData = async () => {
    const result = await serverApi.confirm(
      confirmInfoData.email,
      confirmInfoData.registrationCode
    );
    if (result.error) {
      setInfoMessage(result.error);
    } else {
      setInfoMessage("Confirm complete complite");
      setTimeout(() => {
        navigate(
          `/status?email=${confirmInfoData.email}&domain=${confirmInfoData.domain}`
        );
      }, 1500);
    }
    console.log("result", result);
  };
  return (
    <div>
      <h3>Confirm your email</h3>
      <p>We sent code on your email. See your email box</p>
      <div>
        <label>
          Email:
          <input
            type="text"
            disabled
            name="email"
            readOnly
            value={confirmInfoData.email}
          />
        </label>
      </div>
      <div>
        <label>
          Domain:
          <input
            type="text"
            disabled
            name="domain"
            readOnly
            value={confirmInfoData.domain}
          />
          .profolio.com
        </label>
      </div>
      <div>
        <label>
          Code:
          <input
            type="text"
            name="registrationCode"
            onChange={handleInputChange}
            value={confirmInfoData.registrationCode}
          />
        </label>
      </div>
      <button onClick={confirmData}>Confirm</button>
      <p>{infoMessage}</p>
    </div>
  );
}
