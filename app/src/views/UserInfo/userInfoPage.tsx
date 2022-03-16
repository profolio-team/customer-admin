import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { Delete, Photo } from "@mui/icons-material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

type Inputs = {
  example: string;
  exampleRequired: string;
  exampleIcon: string;
};

export function UserInfoPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const helper = errors.exampleRequired ? "Error message" : "";
  const src =
    "https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2147483647&v=beta&t=i4Pp6zVfz5VAznPIik_ua4I75sKlu4yAdGKgHC9vpTo";
  let img = src;
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} padding={10}>
          <Box>
            <Typography variant="h2" component="h2">
              User Info
            </Typography>
          </Box>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <>
                    <TextField type={"file"} sx={{ display: "none" }} id="select-image" />
                    <label
                      htmlFor={img ? "none" : "select-image"}
                      onClick={() => {
                        img = src;
                      }}
                    >
                      <IconButton
                        sx={{ height: 160, width: 160 }}
                        component="span"
                        {...bindTrigger(popupState)}
                      >
                        <Avatar sx={{ width: 160, height: 160 }} src={img} />
                      </IconButton>
                    </label>
                    {img && (
                      <Menu {...bindMenu(popupState)}>
                        <label htmlFor="select-image">
                          <MenuItem onClick={popupState.close}>
                            <Photo sx={{ paddingRight: "5px" }} />
                            Change Photo
                          </MenuItem>
                        </label>
                        <div onClick={() => (img = "")}>
                          <MenuItem onClick={popupState.close}>
                            <Delete sx={{ paddingRight: "5px" }} />
                            Delete Photo
                          </MenuItem>
                        </div>
                      </Menu>
                    )}
                  </>
                )}
              </PopupState>
            </Grid>
            <Grid item xs={8}>
              <Stack spacing={"24px"} width={316} paddingLeft={"22.66px"}>
                <TextField
                  label={"First Name"}
                  helperText={helper}
                  placeholder={"Placeholder"}
                  {...register("example")}
                />
                <TextField
                  label={"Last Name"}
                  {...register("exampleRequired", { required: true })}
                  placeholder={"Placeholder"}
                  error={!!errors.exampleRequired}
                  helperText={helper}
                />
              </Stack>
            </Grid>
          </Grid>
          <TextField
            label={"Email"}
            {...register("exampleRequired", { required: true })}
            placeholder={"Placeholder"}
            error={!!errors.exampleRequired}
          />
          <TextField
            multiline
            rows={4}
            label={"About"}
            {...register("exampleRequired", { required: true })}
            placeholder={"Provide short description about yourself"}
            error={!!errors.exampleRequired}
          />
          <TextField
            label={"Phone"}
            {...register("exampleRequired", { required: true })}
            placeholder={"+XXX (XX) XXX-XX-XX"}
            error={!!errors.exampleRequired}
          />
          <TextField
            label={"LinkedIn"}
            {...register("exampleRequired", { required: true })}
            placeholder={"Enter your LinkedIn URL"}
            error={!!errors.exampleRequired}
          />
          <Stack paddingTop={"40px"} spacing={2} direction={"row"}>
            <Button variant={"contained"} type="submit">
              Save Changes
            </Button>
            <Button variant={"outlined"}>Cancel</Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
