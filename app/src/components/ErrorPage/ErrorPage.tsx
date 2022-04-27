import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorPageComponent, ErrorWrapper, ErrorCode, ErrorMessage, SupportMail } from "./style";
import { errors } from "./errorData";
import { useConfig } from "../../hooks/config";

export function ErrorPage({ code }: { code: string }): JSX.Element {
  const navigate = useNavigate();
  const errorsMap = new Map(errors.map((e) => [e.code, { ...e }]));
  const { emails } = useConfig();

  return (
    <ErrorPageComponent>
      <ErrorWrapper>
        <ErrorCode>{`${errorsMap.get(code)?.code || `Ups...`}`}</ErrorCode>
        <ErrorMessage>
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
              <SupportMail href={`mailto:${emails.admin}`} variant="body2">
                {emails.admin}
              </SupportMail>
            </Typography>
            <Typography variant="body2" component="p">
              In case your administrator is unavailable, please contact us for technical support
              <SupportMail href={`mailto:${emails.support}`} variant="body2">
                {emails.support}
              </SupportMail>
            </Typography>
          </Stack>
          {/* Add button `Back to main page' if error's code 500 and more*/}
          {Number(code) >= 500 && (
            <Button onClick={() => navigate("/")} variant={"outlined"}>
              Back to main page
            </Button>
          )}
        </ErrorMessage>
      </ErrorWrapper>
    </ErrorPageComponent>
  );
}
