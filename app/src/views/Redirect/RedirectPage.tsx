import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fromBase64 } from "../../utils/converters";

export function RedirectPage(): JSX.Element {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const toParam = params.get("to");

  useEffect(() => {
    if (toParam) {
      const urlTo = fromBase64(toParam);
      const url = new URL(urlTo);

      const urlParts = url.origin.split(".");

      const isRedirectToLocalhost = urlParts.length === 2 && urlParts[1] === "localhost:41010";

      const isRedirectToProd =
        urlParts.length === 3 && urlParts[1] === "profolio" && urlParts[2] === "dev";

      setTimeout(() => {
        if (isRedirectToProd || isRedirectToLocalhost) {
          location.href = urlTo;
        } else {
          console.log(urlTo);
        }
      });
    }
  }, [toParam]);

  return (
    <div
      style={{
        backgroundColor: "white",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
        padding: "20px",
        zIndex: 9999999,
      }}
    >
      <Typography variant="body1" component="p">
        Redirecting...
      </Typography>
    </div>
  );
}
