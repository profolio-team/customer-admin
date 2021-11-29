import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import serverApi from "../serverApi";

export default function Status() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [infoMessage, setInfoMessage] = useState(
    "Setup your envirement is starting..."
  );

  const [isReady, setReadyStatus] = useState(false);

  const [confirmInfoData, setConfirmInfoData] = useState({
    registrationCode: searchParams.get("registrationCode") || "",
    domain: searchParams.get("domain") || "",
    email: searchParams.get("email") || "",
  });

  console.log("isReady", isReady);

  if (!isReady) {
    setTimeout(async () => {
      const customerInfo = await serverApi.getCustomerInfo(
        confirmInfoData.email
      );
      console.log(customerInfo);
      if (customerInfo.deployedStatus !== infoMessage) {
        setInfoMessage(customerInfo.deployedStatus);
      } else {
        setInfoMessage(infoMessage + ".");
      }

      setReadyStatus(!!customerInfo.deployedService);
    }, 2000);
  }
  const redirectToDomain = () => {
    window.location.replace(`https://${confirmInfoData.domain}.profolio.com`);
  };
  return (
    <div>
      <h2>Status of creating {confirmInfoData.domain}.profolio.com</h2>
      <p>
        Admin email: <b>{confirmInfoData.email}</b>
      </p>
      <hr />
      <p>{isReady ? "" : infoMessage}</p>
      <p>{isReady ? `Your domain is ready. Try it!` : ""}</p>
      <h4>{isReady ? `https://${confirmInfoData.domain}.profolio.com` : ""}</h4>
      <p>
        {isReady
          ? `Now, you have ability to login into your portfolio service, invite your colleague and making wonderful things`
          : ""}
      </p>
      {isReady ? <button onClick={redirectToDomain}>Go</button> : ""}
    </div>
  );
}
