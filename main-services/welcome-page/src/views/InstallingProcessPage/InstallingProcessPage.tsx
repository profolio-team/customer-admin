import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../../component";
import styles from "./InstallingProcessPage.module.css";
import apiUrls from "../../config/backendApiUrlConfig";

export function InstallingProcessPage(): JSX.Element {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("...");
  const info = JSON.parse(Buffer.from(searchParams.get("info") || "{}", "base64").toString("ascii"));
  const email = info.email;
  const domain = info.domain;
  const registrationCode = info.registrationCode;
  const checkStatus = async () => {
    const req = await fetch(apiUrls.customerGetOneUrl, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await req.json();
    setStatus(result.deployedStatus);
    if (result.deployedService) {
      window.location.href = result.domainUrl;
    }
  };

  useEffect(() => {
    (async () => {
      const url = apiUrls.customerConfirmUrl;
      const req = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email,
          registrationCode,
          domain,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await req.json();
      if (result.error) {
        setStatus(result.error);
      } else {
        setStatus("Start installing");
        setInterval(checkStatus, 2000);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.infoContainer}>
        <h2>Status of installing</h2>
        <p>email: {email}</p>
        <p>domain: {domain}</p>
        <hr />
        <p>{status}</p>
      </div>
    </>
  );
}
