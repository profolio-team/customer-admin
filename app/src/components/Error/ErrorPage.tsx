import Typography from "@mui/material/Typography";
import { Link, Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CustomErrors {
  code: string;
  message: string;
  text: string;
}

export function ErrorPage({ code }: { code: string }): JSX.Element {
  const navigate = useNavigate();
  const SUPPORT_EMAIL = "fixiki@profolioteam.com";
  const ADMINISTRATOR_EMAIL = "m.jones@companyname.com";

  const errors: CustomErrors[] = [
    {
      code: "404",
      message: "Page not found",
      text: "Sorry. The page you are looking for has been removed or moved to somewhere else.",
    },
    {
      code: "403",
      message: "Access denied",
      text: "Sorry. You don’t have permission to access this page.",
    },
    {
      code: "500",
      message: "Unexpected error",
      text: "Sorry. We are facing an internal server error and fixing it already. Please try again later.",
    },
    {
      code: "503",
      message: "Service unavailable",
      text: "Sorry. Service is getting a tune-up. Please try again later.",
    },
  ];

  const errorsMap = new Map(errors.map((e) => [e.code, { ...e }]));

  return (
    <Box
      sx={{
        height: "100vh",
        position: "absolute",
        top: 0,
        zIndex: "-1",
        width: "100%",
        background:
          "linear-gradient(145deg, rgba(73, 102, 204, 1) 25%, rgba(18, 182, 182, 1) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            width: 400,
            height: 400,
            mr: "60px",
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
            justifyContent: "center",
            border: "4px solid rgb(255, 255, 255, 0.15)",
            boxShadow: "inset 0 5px 10px -5px black",
          }}
        >
          <Typography
            variant="body2"
            component="p"
            sx={{
              fontSize: "78px",
            }}
          >
            {code}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 400,
            height: 400,
            boxSizing: "border-box",
          }}
        >
          <Stack direction={"column"} gap="2rem">
            <Typography variant="h2" component="h2">
              {`${code} : ${errorsMap.get(code)?.message || `Ups...`}`}
            </Typography>
            <Typography variant="body2" component="p">
              {`${errorsMap.get(code)?.text || `Sorry, somthing wrong!`}`}
            </Typography>
            <Typography variant="body2" component="p">
              For technical support, please contact your local administrator
              <Link
                href={`mailto:${ADMINISTRATOR_EMAIL}`}
                variant="body2"
                sx={{
                  display: "block",
                  color: "#fff",
                  textDecoration: "underline",
                }}
              >
                {ADMINISTRATOR_EMAIL}
              </Link>
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{
                mb: "30px",
              }}
            >
              In case your administrator is unavailable, please contact us for technical support
              <Link
                href={`mailto:${SUPPORT_EMAIL}`}
                variant="body2"
                sx={{
                  display: "block",
                  color: "#fff",
                  textDecoration: "underline",
                }}
              >
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
    </Box>
  );
}
