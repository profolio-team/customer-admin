import Typography from "@mui/material/Typography";
import { Link, Box } from "@mui/material";

export function NotFoundPage(): JSX.Element {
  return (
    <Box
      sx={{
        height: "90vh",
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
            404
          </Typography>
        </Box>
        <Box
          sx={{
            width: 400,
            height: 400,
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: "40px",
            }}
          >
            404: Page not found
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: "40px",
            }}
          >
            Sorry. The page you are looking for has been removed or moved to somewhere else.
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              mb: "40px",
            }}
          >
            For technical support, please contact your local administrator
            <Link
              href={`mailto:test@example.com`}
              variant="body2"
              sx={{
                display: "block",
                color: "#fff",
                textDecoration: "underline",
              }}
            >
              {'m.jones@companyname.com"'}
            </Link>
          </Typography>
          <Typography variant="body2" component="p">
            In case your administrator is unavailable, please contact us for technical support
            <Link
              href={`mailto:fixiki@profolioteam.com`}
              variant="body2"
              sx={{
                display: "block",
                color: "#fff",
                textDecoration: "underline",
              }}
            >
              {'fixiki@profolioteam.com"'}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
