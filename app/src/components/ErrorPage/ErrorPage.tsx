import Typography from "@mui/material/Typography";
import { Link, Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorPageComponent } from "./style";
import { ADMINISTRATOR_EMAIL, SUPPORT_EMAIL, errors } from "../../hooks/config";

export function ErrorPage({ code }: { code: string }): JSX.Element {
  const navigate = useNavigate();
  const errorsMap = new Map(errors.map((e) => [e.code, { ...e }]));

  return (
    <ErrorPageComponent>
      <Box className="wrapper">
        <Box className="error_code">
          <Typography
            variant="body2"
            component="p"
            sx={{
              fontSize: "78px",
            }}
          >
            {`${errorsMap.get(code)?.code || `Ups...`}`}
          </Typography>
        </Box>
        <Box className="error_message">
          <Stack direction={"column"} gap="2rem">
            <Typography variant="h2" component="h2">
              {errorsMap.get(code)?.code
                ? `${errorsMap.get(code)?.code || "Ups..."} : ${errorsMap.get(code)?.message}`
                : "Ups..."}
            </Typography>
            <Typography variant="body2" component="p">
              {`${errorsMap.get(code)?.text || `Sorry, somthing wrong!`}`}
            </Typography>
            <Typography variant="body2" component="p">
              For technical support, please contact your local administrator
              <Link href={`mailto:${ADMINISTRATOR_EMAIL}`} variant="body2" className="support_mail">
                {ADMINISTRATOR_EMAIL}
              </Link>
            </Typography>
            <Typography variant="body2" component="p">
              In case your administrator is unavailable, please contact us for technical support
              <Link href={`mailto:${SUPPORT_EMAIL}`} variant="body2" className="support_mail">
                {SUPPORT_EMAIL}
              </Link>
            </Typography>
          </Stack>
          {500 <= Number(code) && (
            <Button onClick={() => navigate("/")} variant={"outlined"}>
              Back to main page
            </Button>
          )}
        </Box>
      </Box>
    </ErrorPageComponent>
  );
}
