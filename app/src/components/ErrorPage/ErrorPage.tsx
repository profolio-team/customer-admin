import Typography from "@mui/material/Typography";
import { Link, Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorPageWrapper } from "./style";
import { errors } from "./errorData";
import { useConfig } from "../../hooks/config";

export function ErrorPage({ code }: { code: string }): JSX.Element {
  const navigate = useNavigate();
  const errorsMap = new Map(errors.map((e) => [e.code, { ...e }]));
  const { emails } = useConfig();

  return (
    <ErrorPageWrapper>
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
              <Link href={`mailto:${emails.admin}`} variant="body2" className="support_mail">
                {emails.admin}
              </Link>
            </Typography>
            <Typography variant="body2" component="p">
              In case your administrator is unavailable, please contact us for technical support
              <Link href={`mailto:${emails.support}`} variant="body2" className="support_mail">
                {emails.support}
              </Link>
            </Typography>
          </Stack>
          {/* Add button `Back to main page' if error's code 500 and more*/}
          {Number(code) >= 500 && (
            <Button onClick={() => navigate("/")} variant={"outlined"}>
              Back to main page
            </Button>
          )}
        </Box>
      </Box>
    </ErrorPageWrapper>
  );
}
